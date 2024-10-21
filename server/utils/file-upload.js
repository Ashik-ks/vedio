const fs = require('fs');
const dayjs = require('dayjs');

exports.fileUpload = async function (file, directory) {
    return new Promise((resolve, reject) => {
        try {
            let mime_type = file.split(';')[0].split('/')[1];
            console.log("mime_type:", mime_type);

            const allowedTypes = ["png", "jpeg", "jpg", "mp4", "mp3", "pdf","webp","video"];
            if (!allowedTypes.includes(mime_type)) {
                return reject("File type not allowed. Allowed types are: " + allowedTypes.join(", "));
            }
            console.log("Allowed file type");

            let filename = `${dayjs().format('YYYYMMDDHHmmss')}${Math.floor(Math.random() * 100)}.${mime_type}`;
            console.log("filename:", filename);

            let upload_path = `uploads/${directory}`;
            console.log("upload_path:", upload_path);

            let base64 = file.split(';base64,')[1];
            console.log("base64 length:", base64 ? base64.length : 0);

            fs.mkdir(upload_path, { recursive: true }, (err) => {
                if (err) {
                    return reject(err.message ? err.message : err);
                } else {
                    let full_upload_path = `${upload_path}/${filename}`;
                    console.log("full_upload_path:", full_upload_path);

                    fs.writeFile(full_upload_path, base64, { encoding: "base64" }, function (err) {
                        if (err) {
                            console.log('Error writing file:', err);
                            return reject(err.message ? err.message : err);
                        } else {
                            resolve(full_upload_path);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("Error in fileUpload:", error);
            reject("An unexpected error occurred");
        }
    });
}
