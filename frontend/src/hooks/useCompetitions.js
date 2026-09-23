

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getCompetitions,
} from '../services/competitionService';

export function useCompetitions() {
  const [
    competitions,
    setCompetitions,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const loadCompetitions =
    useCallback(async (
      showLoader = false
    ) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        setError(null);

        const response =
          await getCompetitions();

        setCompetitions(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (err) {
        setError(
          err.message ||
            'Failed to load competitions'
        );
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    }, []);

  useEffect(() => {
    loadCompetitions(true);

    const interval =
      setInterval(() => {
        loadCompetitions(false);
      }, 30000);

    return () =>
      clearInterval(interval);
  }, [loadCompetitions]);

  return {
    competitions,
    loading,
    error,
    reload: () =>
      loadCompetitions(false),
  };
}