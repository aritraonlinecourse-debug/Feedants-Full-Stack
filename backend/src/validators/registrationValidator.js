const mongoose = require('mongoose');

function validateRegistration(
  req,
  res,
  next
) {
  const {
    competitionId,
    userId,
  } = req.body;

  if (!competitionId) {
    return res.status(400).json({
      success: false,
      message: 'Competition ID is required',
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
  }

  if (
    !mongoose.Types.ObjectId.isValid(
      competitionId
    )
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid competition ID',
    });
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID',
    });
  }

  next();
}

module.exports = validateRegistration;