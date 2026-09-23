

const User = require('../models/User');
const Competition = require('../models/Competition');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function getUserById(userId) {
  return User.findById(userId).lean();
}

async function ensureUserExists(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw createError('User not found', 404);
  }

  return user;
}

async function updateUserDetails(userId, details) {
  const user = await ensureUserExists(userId);

  const name =
    typeof details.name === 'string'
      ? details.name.trim()
      : user.name;

  const email =
    typeof details.email === 'string'
      ? details.email.trim().toLowerCase()
      : user.email;

  const phone =
    typeof details.phone === 'string'
      ? details.phone.trim()
      : user.phone;

  const location =
    typeof details.location === 'string'
      ? details.location.trim()
      : user.location;

  const goodAt =
    Array.isArray(details.goodAt)
      ? details.goodAt
          .filter((item) => typeof item === 'string')
          .map((item) => item.trim())
          .filter(Boolean)
      : user.goodAt;

  if (!name) {
    throw createError('Name is required', 400);
  }

  if (!email) {
    throw createError('Email is required', 400);
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw createError(
      'Please enter a valid email address',
      400
    );
  }

  if (phone) {
    const phonePattern =
      /^[0-9+\-\s()]{7,20}$/;

    if (!phonePattern.test(phone)) {
      throw createError(
        'Please enter a valid phone number',
        400
      );
    }
  }

  const existingUser = await User.findOne({
    email,
    _id: {
      $ne: userId,
    },
  });

  if (existingUser) {
    throw createError(
      'Email is already in use',
      409
    );
  }

  user.name = name;
  user.email = email;
  user.phone = phone;
  user.location = location;
  user.goodAt = goodAt;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    profileImage: user.profileImage,
    goodAt: user.goodAt,
  };
}

async function saveCompetition(userId, competitionId) {
  await ensureUserExists(userId);

  if (!competitionId) {
    throw createError(
      'Competition ID is required',
      400
    );
  }

  const competition = await Competition.findById(
    competitionId
  ).select('_id');

  if (!competition) {
    throw createError(
      'Competition not found',
      404
    );
  }

  const user = await User.findById(userId).select(
    'savedCompetitions'
  );

  const alreadySaved =
    user.savedCompetitions.some(
      (id) =>
        id.toString() === competitionId.toString()
    );

  if (alreadySaved) {
    throw createError(
      'Competition already saved',
      409
    );
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        savedCompetitions: competitionId,
      },
    },
    {
      new: true,
    }
  );

  return {
    competitionId: competitionId.toString(),
    saved: true,
  };
}

async function removeSavedCompetition(
  userId,
  competitionId
) {
  await ensureUserExists(userId);

  if (!competitionId) {
    throw createError(
      'Competition ID is required',
      400
    );
  }

  const updatedUser =
    await User.findOneAndUpdate(
      {
        _id: userId,
        savedCompetitions: competitionId,
      },
      {
        $pull: {
          savedCompetitions: competitionId,
        },
      },
      {
        new: true,
      }
    );

  if (!updatedUser) {
    throw createError(
      'Competition is not saved',
      404
    );
  }

  return {
    competitionId: competitionId.toString(),
    saved: false,
  };
}

async function isCompetitionSaved(
  userId,
  competitionId
) {
  if (!competitionId) {
    return false;
  }

  const user = await User.findOne({
    _id: userId,
    savedCompetitions: competitionId,
  }).select('_id');

  return Boolean(user);
}

module.exports = {
  getUserById,
  ensureUserExists,
  updateUserDetails,
  saveCompetition,
  removeSavedCompetition,
  isCompetitionSaved,
};