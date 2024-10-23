const fs = require('fs');
const dayjs = require('dayjs');

exports.fileUpload = async function (file, directory) {
    return new Promise((resolve, reject) => {
        try {
            if (!file || typeof file !== 'string') {
                return reject("Invalid file data provided.");
            }

            let mimeType = file.split(';')[0].split('/')[1];
            console.log("mime_type:", mimeType);

            const allowedTypes = ["png", "jpeg", "jpg", "mp4", "mp3", "pdf", "webp", "video"];
            if (!allowedTypes.includes(mimeType)) {
                return reject("File type not allowed. Allowed types are: " + allowedTypes.join(", "));
            }
            console.log("Allowed file type");

            let filename = `${dayjs().format('YYYYMMDDHHmmss')}${Math.floor(Math.random() * 100)}.${mimeType}`;
            console.log("filename:", filename);

            let uploadPath = `uploads/${directory}`;
            console.log("upload_path:", uploadPath);

            let base64 = file.split(';base64,')[1];
            if (!base64) {
                return reject("Base64 data is missing or incorrectly formatted.");
            }
            console.log("base64 length:", base64.length);

            fs.mkdir(uploadPath, { recursive: true }, (err) => {
                if (err) {
                    return reject(err.message ? err.message : err);
                } else {
                    let fullUploadPath = `${uploadPath}/${filename}`;
                    console.log("full_upload_path:", fullUploadPath);

                    fs.writeFile(fullUploadPath, base64, { encoding: "base64" }, function (err) {
                        if (err) {
                            console.log('Error writing file:', err);
                            return reject(err.message ? err.message : err);
                        } else {
                            resolve(fullUploadPath);
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

