

import { apiRequest } from './api';

export async function saveCompetition(
  userId,
  competitionId
) {
  return apiRequest(
    `/users/${userId}/saved-competitions/${competitionId}`,
    {
      method: 'POST',
    }
  );
}

export async function removeSavedCompetition(
  userId,
  competitionId
) {
  return apiRequest(
    `/users/${userId}/saved-competitions/${competitionId}`,
    {
      method: 'DELETE',
    }
  );
}

export async function getSavedCompetitionStatus(
  userId,
  competitionId
) {
  return apiRequest(
    `/users/${userId}/saved-competitions/${competitionId}`
  );
}