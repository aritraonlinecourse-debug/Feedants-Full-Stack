// frontend/src/hooks/useUserDashboard.js

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getUserDashboard,
} from '../services/userService';

export function useUserDashboard(
  userId
) {
  const [
    dashboard,
    setDashboard,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const loadDashboard =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getUserDashboard(
            userId
          );

        setDashboard(
          response.data
        );
      } catch (err) {
        setError(
          err.message ||
            'Failed to load dashboard'
        );
      } finally {
        setLoading(false);
      }
    }, [userId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    savedCompetitions:
      dashboard?.savedCompetitions || [],
    loading,
    error,
    reload: loadDashboard,
  };
}