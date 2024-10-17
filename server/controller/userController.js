let users = require('../db/model/model');
const { success_function, error_function } = require('../utils');
const fileUpload = require('../utils/file-upload').fileUpload;
const path = require('path');

exports.Adduser = async function (req, res) {
    try {
        let body = req.body;
        console.log("bodys : ", body);

        let vedio = body.vedio;
        console.log("vedio : ", vedio)

        if (vedio) {
            let vdio_path = await fileUpload(vedio, "Users");
            console.log("vdio_path", vdio_path);
            body.vedio = vdio_path
        }

        let newbody = {
            name : req.body.name,
            vedio : req.body.vedio,
        }

        let Add_user = await users.create(newbody);
        console.log("Add_user : ", Add_user)

        let response = {
            success: true,
            statuscode: 200,
            message: "user added succesfully",
        }
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error : ", error)
        let response = {
            success: false,
            statuscode: 400,
            message: "user not added",
        }
        res.status(response.statuscode).send(response);
    }
}