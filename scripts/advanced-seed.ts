import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { connectToDB } from '../utils/database';
import User from '../models/user.model';
import Prompt from '../models/prompt.model';
import usersData from '../seeds/users.json';
import promptsData from '../seeds/prompts.json';

// Load environment variables
config({ path: path.join(__dirname, '../.env') });

interface SeedOptions {
  clearDatabase?: boolean;
  userCount?: number;
  promptCount?: number;
  verbose?: boolean;
}

class AdvancedSeeder {
  private options: SeedOptions;

  constructor(options: SeedOptions = {}) {
    this.options = {
      clearDatabase: true,
      userCount: usersData.length,
      promptCount: promptsData.length,
      verbose: true,
      ...options
    };
  }

  private log(message: string): void {
    if (this.options.verbose) {
      console.log(message);
    }
  }

  private async clearDatabase(): Promise<void> {
    if (!this.options.clearDatabase) return;
    
    this.log('🗑️  Clearing existing data...');
    const userCount = await User.countDocuments();
    const promptCount = await Prompt.countDocuments();
    
    await User.deleteMany({});
    await Prompt.deleteMany({});
    
    this.log(`✅ Cleared ${userCount} users and ${promptCount} prompts`);
  }

  private async seedUsers(): Promise<mongoose.Types.ObjectId[]> {
    this.log('👥 Seeding users...');
    
    const usersToSeed = usersData.slice(0, this.options.userCount);
    const users = await User.insertMany(usersToSeed);
    
    this.log(`✅ Created ${users.length} users`);
    return users.map(user => user._id);
  }

  private async seedPrompts(userIds: mongoose.Types.ObjectId[]): Promise<void> {
    this.log('💭 Seeding prompts...');
    
    const promptsToSeed = promptsData.slice(0, this.options.promptCount);
    const promptsWithCreators = promptsToSeed.map((promptData) => ({
      ...promptData,
      creator: userIds[Math.floor(Math.random() * userIds.length)]
    }));

    const prompts = await Prompt.insertMany(promptsWithCreators);
    this.log(`✅ Created ${prompts.length} prompts`);
  }

  private async getStats(): Promise<void> {
    const userCount = await User.countDocuments();
    const promptCount = await Prompt.countDocuments();
    
    this.log('📊 Database Statistics:');
    this.log(`   Users: ${userCount}`);
    this.log(`   Prompts: ${promptCount}`);
  }

  async run(): Promise<void> {
    try {
      this.log('🌱 Starting advanced database seeding...');
      
      // Check for MongoDB URL
      if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL environment variable is not set. Please check your .env file.');
      }
      
      this.log('🔗 Connecting to database...');
      await connectToDB();
      
      // Wait a moment for connection to be established
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if connection is ready
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Database connection is not ready');
      }
      
      this.log('✅ Database connected successfully');
      
      await this.clearDatabase();
      const userIds = await this.seedUsers();
      await this.seedPrompts(userIds);
      await this.getStats();
      
      this.log('🎉 Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    } finally {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        this.log('🔌 Database connection closed');
      }
    }
  }

  // Method to seed only users
  async seedUsersOnly(): Promise<void> {
    try {
      this.log('👥 Seeding users only...');
      await connectToDB();
      
      if (this.options.clearDatabase) {
        await User.deleteMany({});
        this.log('🗑️  Cleared existing users');
      }
      
      await this.seedUsers();
      this.log('✅ Users seeding completed!');
    } catch (error) {
      console.error('❌ Error seeding users:', error);
      throw error;
    } finally {
      await mongoose.connection.close();
    }
  }

  // Method to seed only prompts (requires existing users)
  async seedPromptsOnly(): Promise<void> {
    try {
      this.log('💭 Seeding prompts only...');
      await connectToDB();
      
      const users = await User.find({}).select('_id');
      if (users.length === 0) {
        throw new Error('No users found. Please seed users first.');
      }
      
      if (this.options.clearDatabase) {
        await Prompt.deleteMany({});
        this.log('🗑️  Cleared existing prompts');
      }
      
      const userIds = users.map(user => user._id);
      await this.seedPrompts(userIds);
      this.log('✅ Prompts seeding completed!');
    } catch (error) {
      console.error('❌ Error seeding prompts:', error);
      throw error;
    } finally {
      await mongoose.connection.close();
    }
  }
}

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0];

if (require.main === module) {
  const seeder = new AdvancedSeeder({
    clearDatabase: !args.includes('--no-clear'),
    verbose: !args.includes('--quiet'),
    userCount: parseInt(args.find(arg => arg.startsWith('--users='))?.split('=')[1] || '0') || usersData.length,
    promptCount: parseInt(args.find(arg => arg.startsWith('--prompts='))?.split('=')[1] || '0') || promptsData.length
  });

  let operation: Promise<void>;

  switch (command) {
    case 'users':
      operation = seeder.seedUsersOnly();
      break;
    case 'prompts':
      operation = seeder.seedPromptsOnly();
      break;
    case 'all':
    default:
      operation = seeder.run();
      break;
  }

  operation
    .then(() => {
      console.log('✨ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}

export default AdvancedSeeder;
