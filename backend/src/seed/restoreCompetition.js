const mongoose = require('mongoose');
const Competition = require('../models/Competition');

require('dotenv').config();

const COMPETITION_ID =
  '6ab26a3d5842c3f2a32a8f54';

async function restoreCompetition() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    await Competition.findByIdAndUpdate(
      COMPETITION_ID,
      {
        registrationStart:
          new Date('2026-09-25T00:00:00Z'),

        registrationDeadline:
          new Date('2026-10-10T18:20:00Z'),

        submissionStart:
          new Date('2026-10-05T22:30:00Z'),

        submissionDeadline:
          new Date('2026-10-30T18:25:00Z'),

        resultDate:
          new Date('2026-11-01T18:20:00Z'),
      }
    );

    console.log(
      'Competition dates restored successfully.'
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      'Failed to restore competition:',
      error.message
    );

    process.exit(1);
  }
}

restoreCompetition();