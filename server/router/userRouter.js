const express = require('express');
const upload = require('../router/multerConfig'); // Import multer config
const { uploadVideo, getVideo } = require('../controller/userController');

const router = express.Router();

// Route to upload video
router.post('/upload', upload.single('file'), uploadVideo); // Use multer here

// Route to get video by ID
router.get('/video/:id', getVideo);

module.exports = router;

