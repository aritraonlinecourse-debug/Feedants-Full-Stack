const mongoose = require('mongoose');
const Competition = require('../models/Competition');

require('dotenv').config();

async function setRegistrationTest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const now = new Date();

    await Competition.findByIdAndUpdate(
      '6ab26a3d5842c3f2a32a8f54',
      {
        registrationDeadline: new Date(
          now.getTime() + 60 * 60 * 1000
        ),
        submissionStart: new Date(
          now.getTime() + 2 * 60 * 60 * 1000
        ),
        submissionDeadline: new Date(
          now.getTime() + 26 * 60 * 60 * 1000
        ),
        resultDate: new Date(
          now.getTime() + 48 * 60 * 60 * 1000
        ),
      }
    );

    console.log(
      'Competition changed to registration test state.'
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

setRegistrationTest();