const mongoose = require('mongoose');
const Competition = require('../models/Competition');

require('dotenv').config();

async function setSubmissionTest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const now = new Date();

    const submissionStart = new Date(now.getTime() - 60 * 60 * 1000);
    const submissionDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const resultDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    await Competition.findByIdAndUpdate(
      '6ab26a3d5842c3f2a32a8f54',
      {
        registrationDeadline: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        submissionStart,
        submissionDeadline,
        resultDate,
      }
    );

    console.log('Competition changed to submission test state.');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

setSubmissionTest();