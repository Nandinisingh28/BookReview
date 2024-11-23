const mongoose = require('mongoose');

const connectDB = async () => {
    try{

        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: 'book-reviews'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}

module.exports = connectDB;