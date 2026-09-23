

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getSavedCompetitionStatus,
  saveCompetition,
  removeSavedCompetition,
} from '../services/savedCompetitionService';

export function useSavedCompetition(
  userId,
  competitionId
) {
  const [
    saved,
    setSaved,
  ] = useState(false);

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

  const loadSavedStatus =
    useCallback(async () => {
      if (!userId || !competitionId) {
        setSaved(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await getSavedCompetitionStatus(
            userId,
            competitionId
          );

        setSaved(
          Boolean(
            response.data?.saved
          )
        );
      } catch (err) {
        setError(
          err.message ||
            'Failed to check saved competition'
        );
      } finally {
        setLoading(false);
      }
    }, [
      userId,
      competitionId,
    ]);

  useEffect(() => {
    loadSavedStatus();
  }, [loadSavedStatus]);

  const save =
    useCallback(async () => {
      if (!userId || !competitionId) {
        throw new Error(
          'Competition ID is required'
        );
      }

      try {
        setActionLoading(true);
        setError(null);

        await saveCompetition(
          userId,
          competitionId
        );

        setSaved(true);
      } catch (err) {
        setError(
          err.message ||
            'Failed to save competition'
        );

        throw err;
      } finally {
        setActionLoading(false);
      }
    }, [
      userId,
      competitionId,
    ]);

  const remove =
    useCallback(async () => {
      if (!userId || !competitionId) {
        throw new Error(
          'Competition ID is required'
        );
      }

      try {
        setActionLoading(true);
        setError(null);

        await removeSavedCompetition(
          userId,
          competitionId
        );

        setSaved(false);
      } catch (err) {
        setError(
          err.message ||
            'Failed to remove saved competition'
        );

        throw err;
      } finally {
        setActionLoading(false);
      }
    }, [
      userId,
      competitionId,
    ]);

  const toggle =
    useCallback(async () => {
      if (saved) {
        await remove();
      } else {
        await save();
      }
    }, [
      saved,
      save,
      remove,
    ]);

  return {
    saved,
    loading,
    actionLoading,
    error,
    save,
    remove,
    toggle,
    reload: loadSavedStatus,
  };
}