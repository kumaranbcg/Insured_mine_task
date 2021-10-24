const multer = require("multer");
const path = require("path");
const response = require("./response");
const errorCodes = require("../constants/errorCodes");
const docUpload = async (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/myUploads");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });
    req.files = {};
    multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }).any()(req, res, (err) => {
        if (err && err.message) response.error(req, res, errorCodes.HTTP_BAD_REQUEST, err.message);
        else next();
    });
};
module.exports = docUpload;
