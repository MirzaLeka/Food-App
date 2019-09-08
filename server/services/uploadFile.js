const multer = require('multer')

const imageUpload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'))
    }
    cb(undefined, true)
  }
});

module.exports = { imageUpload };
