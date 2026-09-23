// backend/src/routes/userRoutes.js

const express = require('express');

const {
  getUserDashboard,
  updateUser,
  saveUserCompetition,
  removeUserCompetition,
  getSavedCompetitionStatus,
} = require('../controllers/userController');

const router =
  express.Router();

router.get(
  '/:userId/dashboard',
  getUserDashboard
);

router.put(
  '/:userId',
  updateUser
);

router.post(
  '/:userId/saved-competitions/:competitionId',
  saveUserCompetition
);

router.delete(
  '/:userId/saved-competitions/:competitionId',
  removeUserCompetition
);

router.get(
  '/:userId/saved-competitions/:competitionId',
  getSavedCompetitionStatus
);

module.exports = router;