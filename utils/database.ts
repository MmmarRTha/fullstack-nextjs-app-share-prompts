import mongoose from 'mongoose';

let isConnected: boolean = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if(isConnected) return console.log('Already connected to DB');

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            maxPoolSize: 10,
            minPoolSize: 5,
        });

        isConnected = true;
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
        throw error; // Re-throw to handle in calling code
    }
}