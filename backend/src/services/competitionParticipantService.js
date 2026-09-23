const Registration =
  require('../models/Registration');

async function getCompetitionParticipants(
  competitionId
) {
  return Registration.find({
    competition: competitionId,
    status: 'REGISTERED',
  })
    .populate(
      'user',
      'name email'
    )
    .sort({
      registeredAt: 1,
    })
    .lean();
}

module.exports = {
  getCompetitionParticipants,
};