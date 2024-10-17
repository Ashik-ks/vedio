const express = require("express")
const router = express.Router();
const userController = require('../controller/userController');

router.post('/users', userController.Adduser);
// router.get('/users',userController.GetAlluser);

module.exports = router