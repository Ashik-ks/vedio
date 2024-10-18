const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
// const multer = require('multer');
// const crypto = require('crypto');


// Upload video function
exports.uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    res.status(200).json({
        message: 'Video uploaded successfully!',
        file: req.file,
    });
};

// Get video by ID function
exports.getVideo = (req, res) => {
    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'videos',
    });
    const videoId = req.params.id;

    const downloadStream = gfs.openDownloadStream(mongoose.Types.ObjectId(videoId));
    downloadStream.on('data', (data) => {
        res.write(data);
    });

    downloadStream.on('error', () => {
        res.status(404).send('Video not found');
    });

    downloadStream.on('end', () => {
        res.end();
    });
};





