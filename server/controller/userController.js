const mongoose = require('mongoose');
const users = require('../db/model/model')
const fileUpload = require('../utils/file-upload').fileUpload
// const multer = require('multer');
// const crypto = require('crypto');

exports.Addvedio = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

        let vedio = body.vedio;
        console.log("vedio : ", vedio)

        

        if (vedio) {
            let vdio_path = await fileUpload(vedio, "vedio");
            console.log("vdio_path", vdio_path);
            body.vedio = vdio_path
        }
     
        

        let Add_vedio = await users.create(body);
        console.log("Add_vedio : ", Add_vedio)

        if (Add_vedio) {

            let response = {
                success: true,
                statuscode: 200,
                message: "vedio added succesfully",
            }
            res.status(response.statuscode).send(response);
            return;
        } else {
            let response = {
                success: false,
                statuscode: 400,
                message: "vedio not added",
            }
            res.status(response.statuscode).send(response);
        }

    } catch (error) {
        console.log("error : ", error)
        let response = {
            success: false,
            statuscode: 400,
            message: "vedio not added",
        }
        res.status(response.statuscode).send(response);
    }
}






