const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    contactName: {
        type: String,
        required: [true, 'Contact name is required'],
        trim: true
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);