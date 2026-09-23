function getCompetitionState(competition) {
  const now = new Date();

  const registrationStart =
    new Date(
      competition.registrationStart
    );

  const registrationDeadline =
    new Date(
      competition.registrationDeadline
    );

  const submissionStart =
    new Date(
      competition.submissionStart
    );

  const submissionDeadline =
    new Date(
      competition.submissionDeadline
    );

  const resultDate =
    new Date(
      competition.resultDate
    );

  if (now < registrationStart) {
    return 'UPCOMING';
  }

  if (
    now >= registrationStart &&
    now < registrationDeadline
  ) {
    return 'REGISTRATION_OPEN';
  }

  if (
    now >= registrationDeadline &&
    now < submissionStart
  ) {
    return 'REGISTRATION_CLOSED';
  }

  if (
    now >= submissionStart &&
    now < submissionDeadline
  ) {
    return 'SUBMISSION_OPEN';
  }

  if (
    now >= submissionDeadline &&
    now < resultDate
  ) {
    return 'SUBMISSION_CLOSED';
  }

  if (now >= resultDate) {
    return 'RESULT_DECLARED';
  }

  return 'UPCOMING';
}

module.exports = {
  getCompetitionState,
};