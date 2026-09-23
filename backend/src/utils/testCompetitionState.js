const {
  getCompetitionState,
} = require('./competitionState');

const now = new Date();

const competition = {
  registrationStart:
    new Date(
      now.getTime() - 60 * 60 * 1000
    ),

  registrationDeadline:
    new Date(
      now.getTime() + 60 * 60 * 1000
    ),

  submissionStart:
    new Date(
      now.getTime() + 2 * 60 * 60 * 1000
    ),

  submissionDeadline:
    new Date(
      now.getTime() + 24 * 60 * 60 * 1000
    ),

  resultDate:
    new Date(
      now.getTime() + 48 * 60 * 60 * 1000
    ),
};

console.log(
  'Competition state:',
  getCompetitionState(
    competition
  )
);