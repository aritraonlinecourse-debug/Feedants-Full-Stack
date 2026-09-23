const mongoose = require('mongoose');

function validateSubmission(
  req,
  res,
  next
) {
  const {
    competitionId,
    userId,
    submissionUrl,
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

  if (!submissionUrl) {
    return res.status(400).json({
      success: false,
      message: 'Submission URL is required',
    });
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(
      submissionUrl
    );
  } catch {
    return res.status(400).json({
      success: false,
      message: 'Invalid submission URL',
    });
  }

  if (
    parsedUrl.protocol !== 'http:' &&
    parsedUrl.protocol !== 'https:'
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Submission URL must use HTTP or HTTPS',
    });
  }

  next();
}

module.exports = validateSubmission;