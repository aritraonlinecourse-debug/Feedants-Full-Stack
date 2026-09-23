import { apiRequest } from './api';

export async function getCompetition(
  competitionId
) {
  return apiRequest(
    `/competitions/${competitionId}`
  );
}

export async function getCompetitions() {
  return apiRequest(
    '/competitions'
  );
}

export async function getCompetitionParticipants(
  competitionId
) {
  return apiRequest(
    `/competition-participants/${competitionId}`
  );
}