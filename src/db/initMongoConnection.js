import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    
    if (!mongoUrl) {
      throw new Error('MONGODB_URL environment variable is not set');
    }

    await mongoose.connect(mongoUrl);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error while setting up mongo connection', error);
    throw error;
  }
};