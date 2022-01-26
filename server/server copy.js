const express = require(`express`);
const app = express();
const db = require("./models");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// app.use(express.static("./public"));

app.use("/images", express.static("./images"));

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
