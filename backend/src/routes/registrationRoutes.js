const express = require('express');

const {
  register,
  getRegistration,
  cancel,
} = require('../controllers/registrationController');

const validateObjectId =
  require('../middleware/validateObjectId');

const validateRegistration =
  require('../validators/registrationValidator');

const router = express.Router();

router.post(
  '/',
  validateRegistration,
  register
);

router.get(
  '/:competitionId/:userId',
  validateObjectId('competitionId'),
  validateObjectId('userId'),
  getRegistration
);

router.delete(
  '/',
  validateRegistration,
  cancel
);

module.exports = router;