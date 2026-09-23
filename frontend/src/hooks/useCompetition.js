import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getCompetition,
} from '../services/competitionService';

export function useCompetition(
  competitionId
) {
  const [
    competition,
    setCompetition,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const loadCompetition =
    useCallback(async (
      showLoader = false
    ) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        setError(null);

        const response =
          await getCompetition(
            competitionId
          );

        setCompetition(
          response.data
        );
      } catch (err) {
        setError(
          err.message ||
            'Failed to load competition'
        );
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    }, [competitionId]);

  useEffect(() => {
    loadCompetition(true);

    const interval =
      setInterval(() => {
        loadCompetition(false);
      }, 30000);

    return () =>
      clearInterval(interval);
  }, [
    loadCompetition,
  ]);

  return {
    competition,
    loading,
    error,
    reload: () =>
      loadCompetition(false),
  };
}