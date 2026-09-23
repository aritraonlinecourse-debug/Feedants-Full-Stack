const express = require('express');

const {
  submit,
  getSubmission,
} = require('../controllers/submissionController');

const validateObjectId = require('../middleware/validateObjectId');
const validateSubmission = require('../validators/submissionValidator');

const router = express.Router();

router.post(
  '/',
  validateSubmission,
  submit
);

router.get(
  '/:competitionId/:userId',
  validateObjectId('competitionId'),
  validateObjectId('userId'),
  getSubmission
);

module.exports = router;