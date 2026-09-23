import { apiRequest } from './api';

export async function createSubmission(
  competitionId,
  userId,
  submissionUrl
) {
  return apiRequest('/submissions', {
    method: 'POST',
    body: JSON.stringify({
      competitionId,
      userId,
      submissionUrl,
    }),
  });
}

export async function getSubmission(
  competitionId,
  userId
) {
  return apiRequest(
    `/submissions/${competitionId}/${userId}`
  );
}