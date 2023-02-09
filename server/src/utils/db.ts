import mongoose from 'mongoose';

export function connectToMongoDB() {
    const mongoString = process.env.DB_CONNECTION_STRING;

    mongoose.set('strictQuery', false);
    if (mongoString) mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(`Error connection to Database: ${error}`);
    })

    database.once('connected', () => {
        console.log('Successfully connected to Database');
    })

    return database;
}