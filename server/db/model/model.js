const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Uncomment to enforce name is required
    },
    video: {
        filename: {
            type: String,
            required: true, // Uncomment if you want to require the filename
        },
        bucketName: {
            type: String,
            default: 'videos', // Default bucket name
        },
        // Add other fields as needed (e.g., file size, content type)
    },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
