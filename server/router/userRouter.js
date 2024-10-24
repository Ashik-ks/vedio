const express = require('express');
const { uploadVideo, getVideo } = require('../controller/userController');
const Controller = require('../controller/userController')

const router = express.Router();

// Route to upload video
router.post('/upload', Controller.Addvedio); 
router.get('/upload', Controller.getvedio);

// Route to get video by ID
// router.get('/video/:id', getVideo);

module.exports = router;

