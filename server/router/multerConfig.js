const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // Generate a unique filename
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'videos', // Bucket name
                };
                resolve(fileInfo);
            });
        });
    }
});

// Initialize multer with GridFS storage
const upload = multer({ storage });

module.exports = upload;