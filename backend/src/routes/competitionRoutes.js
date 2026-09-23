const express = require('express');

const {
  getCompetition,
  getCompetitions,
} = require('../controllers/competitionController');

const validateObjectId =
  require('../middleware/validateObjectId');

const router = express.Router();

router.get(
  '/',
  getCompetitions
);

router.get(
  '/:id',
  validateObjectId('id'),
  getCompetition
);

module.exports = router;