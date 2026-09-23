const express = require('express');

const {
  getParticipants,
} = require('../controllers/competitionParticipantController');

const validateObjectId =
  require('../middleware/validateObjectId');

const router = express.Router();

router.get(
  '/:competitionId',
  validateObjectId('competitionId'),
  getParticipants
);

module.exports = router;