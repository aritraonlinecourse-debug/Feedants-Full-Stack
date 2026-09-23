

require('dotenv').config();

const mongoose = require('mongoose');
const Competition = require('../models/Competition');

const danceCompetition = {
  _id: new mongoose.Types.ObjectId(
    '6ab26a3d5842c3f2a32a8f54'
  ),

  title: 'Feedants Classical Dance',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win'],

  prizePool: 1500,
  entryFee: 99,
  maxParticipants: 20,
  participantCount: 0,

  registrationStart: new Date(
    '2026-09-25T00:00:00+05:30'
  ),

  registrationDeadline: new Date(
    '2026-10-10T23:50:00+05:30'
  ),

  submissionStart: new Date(
    '2026-10-06T04:00:00+05:30'
  ),

  submissionDeadline: new Date(
    '2026-10-30T23:55:00+05:30'
  ),

  resultDate: new Date(
    '2026-11-01T23:50:00+05:30'
  ),

  judge: {
    name: 'Manju Dubey',
    profession: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    image: '',
    introVideo: '',
  },

  description:
    'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent.',

  judgingParameters: [
    'Technique and execution',
    'Expression and presentation',
    'Creativity and choreography',
    'Overall performance',
  ],

  rules: [
    'Participant must register before the deadline.',
    'Submission must follow the competition requirements.',
    'Only eligible submissions will be judged.',
  ],

  eligibility: [
    'Open to eligible participants.',
    'Participant must complete registration.',
    'Submission must be made within the competition period.',
  ],

  rewards: [
    {
      position: '1st Winner',
      amount: 550,
    },
    {
      position: '2nd Winner',
      amount: 300,
    },
    {
      position: '3rd Winner',
      amount: 240,
    },
    {
      position: '4th Winner',
      amount: 200,
    },
    {
      position: '5th Winner',
      amount: 130,
    },
    {
      position: '6th Winner',
      amount: 80,
    },
  ],

  previousWinners: [
    {
      name: 'Riya Shah',
      position: '1st Winner',
      image: '',
    },
    {
      name: 'Aarav Mehta',
      position: '1st Winner',
      image: '',
    },
    {
      name: 'Neha Verma',
      position: '2nd Winner',
      image: '',
    },
  ],
};

const musicCompetition = {
  _id: new mongoose.Types.ObjectId(
    '6ab26a3d5842c3f2a32a8f55'
  ),

  title: 'Feedants Music Competition',
  category: 'Music',
  tags: ['Music', 'Singing', 'Multi-Win'],

  prizePool: 3000,
  entryFee: 149,
  maxParticipants: 50,
  participantCount: 0,

  registrationStart: new Date(
    '2026-09-20T00:00:00+05:30'
  ),

  registrationDeadline: new Date(
    '2026-09-30T23:50:00+05:30'
  ),

  submissionStart: new Date(
    '2026-09-25T04:00:00+05:30'
  ),

  submissionDeadline: new Date(
    '2026-10-10T23:55:00+05:30'
  ),

  resultDate: new Date(
    '2026-10-12T23:50:00+05:30'
  ),

  judge: {
    name: 'Arjun Malhotra',
    profession: 'Professional Singer and Music Director',
    experience: '15+ Years of Experience',
    image: '',
    introVideo: '',
  },

  description:
    'This is an online music competition open to participants who want to showcase their singing and musical performance skills. Participate from anywhere and present your best performance.',

  judgingParameters: [
    'Vocal quality and control',
    'Musical expression',
    'Rhythm and timing',
    'Overall performance',
  ],

  rules: [
    'Participant must register before the deadline.',
    'Submission must follow the competition requirements.',
    'Only eligible submissions will be judged.',
  ],

  eligibility: [
    'Open to eligible participants.',
    'Participant must complete registration.',
    'Submission must be made within the competition period.',
  ],

  rewards: [
    {
      position: '1st Winner',
      amount: 1200,
    },
    {
      position: '2nd Winner',
      amount: 600,
    },
    {
      position: '3rd Winner',
      amount: 450,
    },
    {
      position: '4th Winner',
      amount: 300,
    },
    {
      position: '5th Winner',
      amount: 250,
    },
    {
      position: '6th Winner',
      amount: 200,
    },
  ],

  previousWinners: [
    {
      name: 'Kabir Sen',
      position: '1st Winner',
      image: '',
    },
    {
      name: 'Ananya Roy',
      position: '2nd Winner',
      image: '',
    },
    {
      name: 'Vihaan Kapoor',
      position: '3rd Winner',
      image: '',
    },
  ],
};

async function seedCompetitions() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    await Competition.deleteMany({});

    const createdCompetitions =
      await Competition.insertMany([
        danceCompetition,
        musicCompetition,
      ]);

    console.log('Competitions created:');

    createdCompetitions.forEach(
      (competition) => {
        console.log(
          `${competition.title}: ${competition._id.toString()}`
        );
      }
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      'Seed failed:',
      error
    );

    process.exit(1);
  }
}

seedCompetitions();