const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        let fileName =  file.originalname.split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileName[fileName.length-1])
    }
});

const upload = multer({ storage: storage });

module.exports = upload;