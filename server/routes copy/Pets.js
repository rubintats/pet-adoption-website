const express = require("express");
const router = express.Router();
const db = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
const Pets = db.Pets;
const Users = db.Users;
const petController = require("../controllers/petController");
const { upload } = require("../middleware/multer");

router.get("/", async (req, res) => {
  try {
    const listOfPets = await Pets.findAll();
    res.json(listOfPets);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pets.findByPk(id);
    res.json(pet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/pet", upload, petController.addPet);

router.put("/pet/:id", async (req, res) => {
  try {
    // if (user.role !== "admin") {
    //   return;
    // }
    const id = req.params.id;
    await Pets.update(req.body, { where: { id: id } });
    res.json("UPDATED SUCCESSFULLY");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Pets.destroy({
      where: {
        id: id,
      },
    });

    res.json("DELETED SUCCESSFULLY");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/pet/adopt/:petId/:userId", validateToken, async (req, res) => {
  const { petId, userId } = req.params;
  const { adoptionStatus } = req.body;
  try {
    const pet = await Pets.findByPk(petId);
    // case #1:
    // when the user wants to adopt/foster we must check: if pet is available
    // case #2:
    // when the user wants to return we must check: if pet is not available

    if (adoptionStatus === "Adopted" || adoptionStatus === "Fostered") {
      if (pet.adoptionStatus != "Available") {
        res.status(500).send("the pet isn't available");
        return;
      }
      await Pets.update(
        { adoptionStatus: adoptionStatus, userId: userId },
        { where: { id: petId } }
      );
    }
    if (adoptionStatus === "Available") {
      if (pet.adoptionStatus === "Available") {
        res.status(500).send("the pet is already available");
        return;
      }
      if (userId != pet.userId) {
        res.status(500).send("pet is not adopted or fostered by user");
        return;
      }
      await Pets.update(
        { adoptionStatus: adoptionStatus, userId: null },
        { where: { id: petId } }
      );
    }
    const updatedPet = await Pets.findByPk(petId);
    res.status(200);
    res.send(updatedPet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
