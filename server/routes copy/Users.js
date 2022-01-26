const express = require("express");
const router = express.Router();
const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(listOfUsers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/register", (req, res) => {
  try {
    const { userName, password, lastName, firstName, email, phoneNumber } =
      req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      try {
        await Users.create({
          userName: userName,
          password: hash,
          lastName: lastName,
          firstName: firstName,
          email: email,
          phoneNumber: phoneNumber,
          role: "user",
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Registration failed");
      }
      res.json({ message: "You are successfully registered!" });
      console.log(userName, password, lastName, firstName, email, phoneNumber);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName } });

    if (!user) res.json({ error: "User doesn't exist" });
    // userName that exists but the password's wrong
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "The password is incorrect" });

      const accessToken = sign(
        { userName: user.userName, id: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10h" }
      );
      res.json({ accessToken: accessToken, userName: userName, id: user.id });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/profile/:id", validateToken, async (req, res) => {
  try {
    const emailExists = await Users.findOne({ where: { email: "email" } });
    if (emailExists) {
      res.status(401).json("Email is already registered");
    }
    const id = req.params.id;
    await Users.update(req.body, { where: { id: id } });
    res.json("UPDATED SUCCESSFULLY");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Users.destroy({
      where: {
        id: id,
      },
    });

    res.json("DELETED SUCCESSFULLY");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.decode);
// });

module.exports = router;
