const mongoose = require('mongoose');
const User = require('../models/User');

require('dotenv').config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOneAndUpdate(
      { email: 'test@feedants.com' },
      {
        name: 'Test User',
        email: 'test@feedants.com',
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log('Test user created/found:');
    console.log(user._id.toString());

    await mongoose.disconnect();
  } catch (error) {
    console.error('Failed to seed user:', error.message);
    process.exit(1);
  }
}

seedUser();