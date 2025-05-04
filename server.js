const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flames', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for storing pairs
const pairSchema = new mongoose.Schema({
    name1: String,
    name2: String,
    result: String,
    timestamp: { type: Date, default: Date.now }
});

const Pair = mongoose.model('Pair', pairSchema);

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Store new pair and send notification
app.post('/api/pairs', async (req, res) => {
    try {
        const { name1, name2, result } = req.body;
        
        // Save to database
        const newPair = new Pair({ name1, name2, result });
        await newPair.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: 'New FLAMES Calculation',
            text: `New pair calculated:\nName 1: ${name1}\nName 2: ${name2}\nResult: ${result}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Pair saved and notification sent' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all pairs
app.get('/api/pairs', async (req, res) => {
    try {
        const pairs = await Pair.find().sort({ timestamp: -1 });
        res.json(pairs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 