const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('MongoDB URL:', process.env.MONGODB_URL ? 'Set (hidden for security)' : 'Not set');
    
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL not found in environment variables');
    }

    // Set connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share_prompt",
      ...options
    });

    console.log('✅ Connected to MongoDB successfully!');
    console.log('Database name:', mongoose.connection.db.databaseName);
    console.log('Connection state:', mongoose.connection.readyState);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.log('💡 This might be a network connectivity issue or incorrect connection string');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
  }
}

testConnection();
