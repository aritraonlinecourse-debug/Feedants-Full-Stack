const {
  registerUser,
  getUserRegistration,
  cancelRegistration,
} = require('../services/registrationService');

async function register(req, res, next) {
  try {
    const { competitionId, userId } = req.body;

    const registration = await registerUser(competitionId, userId);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

async function getRegistration(req, res, next) {
  try {
    const { competitionId, userId } = req.params;

    const registration = await getUserRegistration(
      competitionId,
      userId
    );

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

async function cancel(req, res, next) {
  try {
    const { competitionId, userId } = req.body;

    const registration = await cancelRegistration(
      competitionId,
      userId
    );

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  getRegistration,
  cancel,
};