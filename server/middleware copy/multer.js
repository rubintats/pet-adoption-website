const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // console.log(file);

    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
}).single("picture");

module.exports = { upload };
