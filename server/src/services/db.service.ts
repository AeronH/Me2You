import mongoose from 'mongoose';

function connectToMongoDB() {
    const mongoString = process.env.DB_CONNECTION_STRING as string;

    mongoose.set('strictQuery', false);
    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(`Error connection to Database: ${error}`);
    })

    database.once('connected', () => {
        console.log('Successfully connected to Database');
    })

    return database;
}

export default { connectToMongoDB }