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

interface UserData {
  email: string;
  username: string;
  image: string;
}

interface PromptData {
  prompt: string;
  tag: string;
}

class DatabaseSeeder {
  private async clearDatabase(): Promise<void> {
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Prompt.deleteMany({});
    console.log('✅ Database cleared successfully');
  }

  private async seedUsers(): Promise<mongoose.Types.ObjectId[]> {
    console.log('👥 Seeding users...');
    const users = await User.insertMany(usersData as UserData[]);
    console.log(`✅ Created ${users.length} users`);
    return users.map(user => user._id);
  }

  private async seedPrompts(userIds: mongoose.Types.ObjectId[]): Promise<void> {
    console.log('💭 Seeding prompts...');
    
    const promptsWithCreators = promptsData.map((promptData: PromptData) => ({
      ...promptData,
      creator: userIds[Math.floor(Math.random() * userIds.length)]
    }));

    const prompts = await Prompt.insertMany(promptsWithCreators);
    console.log(`✅ Created ${prompts.length} prompts`);
  }

  async run(): Promise<void> {
    try {
      console.log('🌱 Starting database seeding...');
      await connectToDB();
      
      await this.clearDatabase();
      const userIds = await this.seedUsers();
      await this.seedPrompts(userIds);
      
      console.log('🎉 Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    } finally {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  const seeder = new DatabaseSeeder();
  seeder.run()
    .then(() => {
      console.log('✨ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}

export default DatabaseSeeder;
