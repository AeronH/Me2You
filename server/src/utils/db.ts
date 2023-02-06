import mongoose from 'mongoose';

export function connectToMongoDB() {
    const mongoString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/Me2YouDB';

    mongoose.set('strictQuery', false);
    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(`Error connection to Database: ${error}`);
    })

    database.once('connected', () => {
        console.log('Successfully connected to Database');
    })
}