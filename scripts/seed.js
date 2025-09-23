const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Import models (need to handle ES modules in CommonJS)
const connectToDB = require('../utils/database').connectToDB || 
  (() => import('../utils/database').then(m => m.connectToDB));

// Simple seeder for quick execution
async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    if (typeof connectToDB === 'function') {
      await connectToDB();
    } else {
      const { connectToDB: connect } = await import('../utils/database.js');
      await connect();
    }

    // Import models
    const User = (await import('../models/user.model.js')).default;
    const Prompt = (await import('../models/prompt.model.js')).default;

    // Import seed data
    const usersData = require('../seeds/users.json');
    const promptsData = require('../seeds/prompts.json');

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Prompt.deleteMany({});
    console.log('✅ Database cleared');

    console.log('👥 Creating users...');
    const users = await User.insertMany(usersData);
    console.log(`✅ Created ${users.length} users`);

    console.log('💭 Creating prompts...');
    const userIds = users.map(user => user._id);
    const promptsWithCreators = promptsData.map(promptData => ({
      ...promptData,
      creator: userIds[Math.floor(Math.random() * userIds.length)]
    }));

    const prompts = await Prompt.insertMany(promptsWithCreators);
    console.log(`✅ Created ${prompts.length} prompts`);

    console.log('🎉 Database seeding completed successfully!');
    
    // Get final stats
    const userCount = await User.countDocuments();
    const promptCount = await Prompt.countDocuments();
    console.log(`📊 Final count - Users: ${userCount}, Prompts: ${promptCount}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log('✨ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}

module.exports = { seed };
