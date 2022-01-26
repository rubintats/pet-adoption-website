const express = require(`express`);
const app = express();
const db = require("./models");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// imagekit
const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), uploadFile);

function uploadFile(req, res) {
  if (req.file) {
    imageKit.upload(
      {
        file: req.file,
        fileName: req.filename,
        // folder: "images",
      },
      function (err, response) {
        if (err) {
          return res.status(500).json({
            status: "failed",
            message: "An error occured during file upload. Please try again.",
          });
        }

        res.json({ status: "success", message: "Successfully uploaded files" });
      }
    );
  }
}

//routers
const petRouter = require("./routes/Pets");
app.use("/pets", petRouter);

const userRouter = require("./routes/Users");
app.use("/users", userRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
