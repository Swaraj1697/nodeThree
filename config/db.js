const { default: mongoose } = require("mongoose")

const dbURL = 'mongodb+srv://swarajagnels9399:JlgtNUtzrGcLDdtB@cluster0.dvr8chu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log('MongoDB connected...');

    }
    catch (err) {
        console.log('MongoDB connection error:', err);


    }
}

module.exports = connectDB;