const Submission =
  require('../models/Submission');

const Registration =
  require('../models/Registration');

const Competition =
  require('../models/Competition');

const {
  ensureUserExists,
} = require('./userService');

const {
  getCompetitionState,
} = require('../utils/competitionState');

function createError(
  message,
  statusCode
) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateSubmissionUrl(
  submissionUrl
) {
  if (
    typeof submissionUrl !==
      'string' ||
    !submissionUrl.trim()
  ) {
    throw createError(
      'Submission URL is required',
      400
    );
  }

  const url =
    submissionUrl.trim();

  try {
    const parsedUrl =
      new URL(url);

    if (
      parsedUrl.protocol !==
        'http:' &&
      parsedUrl.protocol !==
        'https:'
    ) {
      throw new Error();
    }
  } catch {
    throw createError(
      'Please provide a valid HTTP or HTTPS URL',
      400
    );
  }

  return url;
}

async function createSubmission(
  competitionId,
  userId,
  submissionUrl
) {
  await ensureUserExists(userId);

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

  const currentState =
    getCompetitionState(
      competition
    );

  if (
    currentState !==
    'SUBMISSION_OPEN'
  ) {
    throw createError(
      'Submission is not currently open',
      400
    );
  }

  const registration =
    await Registration.findOne({
      competition: competitionId,
      user: userId,
      status: 'REGISTERED',
    });

  if (!registration) {
    throw createError(
      'User must be registered before submitting',
      403
    );
  }

  const validatedUrl =
    validateSubmissionUrl(
      submissionUrl
    );

  try {
    const submission =
      await Submission.create({
        competition: competitionId,
        user: userId,
        submissionUrl:
          validatedUrl,
        status: 'SUBMITTED',
      });

    return submission;
  } catch (error) {
    if (error.code === 11000) {
      throw createError(
        'Submission already exists',
        409
      );
    }

    throw error;
  }
}

async function getUserSubmission(
  competitionId,
  userId
) {
  return Submission.findOne({
    competition: competitionId,
    user: userId,
  }).lean();
}

module.exports = {
  createSubmission,
  getUserSubmission,
};