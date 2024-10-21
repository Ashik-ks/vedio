const mongoose = require('mongoose');
const users = require('../db/model/model')
const fileUpload = require('../utils/file-upload').fileUpload
// const multer = require('multer');
// const crypto = require('crypto');

exports.Addvedio = async function (req, res) {
    try {
        let body = req.body;
        console.log("Request body:", JSON.stringify(body, null, 2));

        let vedio = body.vedio;
        console.log("Video file:", vedio);

        if (vedio) {
            let vdio_path = await fileUpload(vedio, "vedio");
            console.log("vdio_path:", vdio_path);
            body.video = { filename: vdio_path };  // Set video.filename correctly
        }

        let Add_vedio = await users.create(body);
        console.log("Database response:", Add_vedio);

        if (Add_vedio) {
            res.status(200).send({
                success: true,
                statuscode: 200,
                message: "Video added successfully",
            });
        } else {
            res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Video not added",
            });
        }

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({
            success: false,
            statuscode: 500,
            message: "An error occurred while adding the video",
        });
    }
}








