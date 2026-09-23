import { apiRequest } from './api';

export async function registerForCompetition(competitionId, userId) {
  return apiRequest('/registrations', {
    method: 'POST',
    body: JSON.stringify({
      competitionId,
      userId,
    }),
  });
}

export async function getRegistration(competitionId, userId) {
  return apiRequest(
    `/registrations/${competitionId}/${userId}`
  );
}

export async function cancelRegistration(competitionId, userId) {
  return apiRequest('/registrations', {
    method: 'DELETE',
    body: JSON.stringify({
      competitionId,
      userId,
    }),
  });
}