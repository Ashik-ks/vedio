const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Uncomment to enforce name is required
    },
    video: {
        filename: {
            type: String,
            required: true
        },
        // other fields...
    },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
