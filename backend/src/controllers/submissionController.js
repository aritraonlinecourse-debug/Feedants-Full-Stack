const {
  createSubmission,
  getUserSubmission,
} = require('../services/submissionService');

async function submit(req, res, next) {
  try {
    const {
      competitionId,
      userId,
      submissionUrl,
    } = req.body;

    const submission = await createSubmission(
      competitionId,
      userId,
      submissionUrl
    );

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: submission,
    });
  } catch (error) {
    next(error);
  }
}

async function getSubmission(req, res, next) {
  try {
    const {
      competitionId,
      userId,
    } = req.params;

    const submission = await getUserSubmission(
      competitionId,
      userId
    );

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submit,
  getSubmission,
};