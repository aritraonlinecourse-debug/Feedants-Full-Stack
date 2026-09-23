import {
  useEffect,
  useState,
} from 'react';

import {
  createSubmission,
  getSubmission,
} from '../services/submissionService';

export function useSubmission(
  competitionId,
  userId
) {
  const [
    submission,
    setSubmission,
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

  async function loadSubmission() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getSubmission(
          competitionId,
          userId
        );

      setSubmission(
        response.data
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submit(
    submissionUrl
  ) {
    const url =
      submissionUrl.trim();

    if (!url) {
      throw new Error(
        'Please enter a submission URL'
      );
    }

    try {
      const parsedUrl =
        new URL(url);

      if (
        parsedUrl.protocol !==
          'http:' &&
        parsedUrl.protocol !==
          'https:'
      ) {
        throw new Error(
          'Please enter a valid HTTP or HTTPS URL'
        );
      }
    } catch (error) {
      if (
        error.message.includes(
          'HTTP or HTTPS'
        )
      ) {
        throw error;
      }

      throw new Error(
        'Please enter a valid URL'
      );
    }

    try {
      setActionLoading(true);
      setError(null);

      const response =
        await createSubmission(
          competitionId,
          userId,
          url
        );

      setSubmission(
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
    loadSubmission();
  }, [
    competitionId,
    userId,
  ]);

  return {
    submission,
    loading,
    actionLoading,
    error,
    submit,
    reload: loadSubmission,
  };
}