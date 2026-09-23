const Competition = require('../models/Competition');

const {
  getCompetitionState,
} = require('../utils/competitionState');

function addComputedFields(
  competition
) {
  const remainingSpots = Math.max(
    competition.maxParticipants -
      competition.participantCount,
    0
  );

  return {
    ...competition,

    currentState:
      getCompetitionState(
        competition
      ),

    remainingSpots,
  };
}

async function getCompetitionById(
  competitionId
) {
  const competition =
    await Competition.findById(
      competitionId
    ).lean();

  if (!competition) {
    const error = new Error(
      'Competition not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return addComputedFields(
    competition
  );
}

async function getAllCompetitions() {
  const competitions =
    await Competition.find({})
      .sort({
        registrationDeadline: 1,
      })
      .lean();

  return competitions.map(
    addComputedFields
  );
}

module.exports = {
  getCompetitionById,
  getAllCompetitions,
};