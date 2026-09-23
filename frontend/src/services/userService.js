// frontend/src/services/userService.js

import { apiRequest } from './api';

export async function getUserDashboard(
  userId
) {
  return apiRequest(
    `/users/${userId}/dashboard`
  );
}

export async function updateUserDetails(
  userId,
  details
) {
  return apiRequest(
    `/users/${userId}`,
    {
      method: 'PUT',
      body: JSON.stringify(details),
    }
  );
}