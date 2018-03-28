const multer = require ('multer');

let memStorage = multer.memoryStorage();

let memUpload = multer({
  storage: memStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

let local = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const localUpload = multer({storage:local})

module.exports = { memUpload, localUpload };
