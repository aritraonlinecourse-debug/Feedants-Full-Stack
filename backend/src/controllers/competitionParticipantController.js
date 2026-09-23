const {
  getCompetitionParticipants,
} = require('../services/competitionParticipantService');

async function getParticipants(
  req,
  res,
  next
) {
  try {
    const participants =
      await getCompetitionParticipants(
        req.params.competitionId
      );

    res.status(200).json({
      success: true,
      data: participants,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getParticipants,
};