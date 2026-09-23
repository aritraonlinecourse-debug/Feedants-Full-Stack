import {
  useEffect,
  useState,
} from 'react';

import {
  getRegistration,
  registerForCompetition,
  cancelRegistration,
} from '../services/registrationService';

export function useRegistration(
  competitionId,
  userId
) {
  const [
    registration,
    setRegistration,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  async function loadRegistration() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getRegistration(
          competitionId,
          userId
        );

      setRegistration(
        response.data
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    try {
      setActionLoading(true);
      setError(null);

      const response =
        await registerForCompetition(
          competitionId,
          userId
        );

      setRegistration(
        response.data
      );

      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function cancel() {
    try {
      setActionLoading(true);
      setError(null);

      const response =
        await cancelRegistration(
          competitionId,
          userId
        );

      setRegistration(
        response.data
      );

      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    loadRegistration();
  }, [
    competitionId,
    userId,
  ]);

  return {
    registration,
    loading,
    actionLoading,
    error,
    register,
    cancel,
    reload: loadRegistration,
  };
}