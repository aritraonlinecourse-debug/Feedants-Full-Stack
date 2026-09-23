const Registration = require('../models/Registration');
const Competition = require('../models/Competition');

const {
  ensureUserExists,
} = require('./userService');

const {
  getCompetitionState,
} = require('../utils/competitionState');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function getCompetitionOrThrow(
  competitionId
) {
  const competition =
    await Competition.findById(
      competitionId
    );

  if (!competition) {
    throw createError(
      'Competition not found',
      404
    );
  }

  return competition;
}

function ensureRegistrationOpen(
  competition
) {
  const currentState =
    getCompetitionState(
      competition
    );

  if (
    currentState !==
    'REGISTRATION_OPEN'
  ) {
    throw createError(
      'Registration is not currently open',
      400
    );
  }

  return currentState;
}

async function registerUser(
  competitionId,
  userId
) {
  await ensureUserExists(userId);

  const competition =
    await getCompetitionOrThrow(
      competitionId
    );

  ensureRegistrationOpen(
    competition
  );

  const now = new Date();

  const existingRegistration =
    await Registration.findOne({
      competition: competitionId,
      user: userId,
    });

  if (
    existingRegistration &&
    existingRegistration.status ===
      'REGISTERED'
  ) {
    throw createError(
      'User is already registered',
      409
    );
  }

  let registration;

  if (existingRegistration) {
    registration =
      await Registration.findOneAndUpdate(
        {
          _id: existingRegistration._id,
          status: 'CANCELLED',
        },
        {
          $set: {
            status: 'REGISTERED',
            registeredAt: now,
          },
        },
        {
          new: true,
        }
      );

    if (!registration) {
      throw createError(
        'Registration state changed. Please try again.',
        409
      );
    }
  } else {
    try {
      registration =
        await Registration.create({
          competition: competitionId,
          user: userId,
          status: 'REGISTERED',
          registeredAt: now,
        });
    } catch (error) {
      if (error.code === 11000) {
        throw createError(
          'User is already registered',
          409
        );
      }

      throw error;
    }
  }

  const updatedCompetition =
    await Competition.findOneAndUpdate(
      {
        _id: competitionId,

        registrationStart: {
          $lte: now,
        },

        registrationDeadline: {
          $gt: now,
        },

        $expr: {
          $lt: [
            '$participantCount',
            '$maxParticipants',
          ],
        },
      },
      {
        $inc: {
          participantCount: 1,
        },
      },
      {
        new: true,
      }
    );

  if (!updatedCompetition) {
    await Registration.findOneAndUpdate(
      {
        _id: registration._id,
        status: 'REGISTERED',
      },
      {
        $set: {
          status: 'CANCELLED',
        },
      }
    );

    const latestCompetition =
      await Competition.findById(
        competitionId
      );

    if (!latestCompetition) {
      throw createError(
        'Competition not found',
        404
      );
    }

    const latestState =
      getCompetitionState(
        latestCompetition
      );

    if (
      latestState !==
      'REGISTRATION_OPEN'
    ) {
      throw createError(
        'Registration is not currently open',
        400
      );
    }

    throw createError(
      'Competition is full',
      400
    );
  }

  return registration;
}

async function getUserRegistration(
  competitionId,
  userId
) {
  return Registration.findOne({
    competition: competitionId,
    user: userId,
  }).lean();
}

async function cancelRegistration(
  competitionId,
  userId
) {
  const competition =
    await getCompetitionOrThrow(
      competitionId
    );

  ensureRegistrationOpen(
    competition
  );

  const registration =
    await Registration.findOneAndUpdate(
      {
        competition: competitionId,
        user: userId,
        status: 'REGISTERED',
      },
      {
        $set: {
          status: 'CANCELLED',
        },
      },
      {
        new: true,
      }
    );

  if (!registration) {
    const existingRegistration =
      await Registration.findOne({
        competition: competitionId,
        user: userId,
      });

    if (
      existingRegistration &&
      existingRegistration.status ===
        'CANCELLED'
    ) {
      throw createError(
        'Registration is already cancelled',
        400
      );
    }

    throw createError(
      'Registration not found',
      404
    );
  }

  const updatedCompetition =
    await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        participantCount: {
          $gt: 0,
        },
      },
      {
        $inc: {
          participantCount: -1,
        },
      },
      {
        new: true,
      }
    );

  if (!updatedCompetition) {
    await Registration.findOneAndUpdate(
      {
        _id: registration._id,
        status: 'CANCELLED',
      },
      {
        $set: {
          status: 'REGISTERED',
        },
      }
    );

    throw createError(
      'Unable to update competition participant count',
      409
    );
  }

  return registration;
}

module.exports = {
  registerUser,
  getUserRegistration,
  cancelRegistration,
};