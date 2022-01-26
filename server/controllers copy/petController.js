const db = require("../models");
const Pets = db.Pets;
const Users = db.Users;

const addPet = async (req, res) => {
  try {
    // if (Users.role !== "admin") {
    //   console.log("you don't have access");
    //   return;
    // } else {
    const pet = {
      id: Math.floor(Math.random() * 10000) + 1,
      type: req.body.type,
      name: req.body.name,
      adoptionStatus: req.body.adoptionStatus,
      bio: req.body.bio,
      color: req.body.color,
      height: req.body.height,
      weight: req.body.weight,
      hypoallergenic: req.body.hypoallergenic,
      breed: req.body.breed,
      dietaryRestrictions: req.body.dietaryRestrictions,
      picture: req.file.path,
    };
    let createdPet = await Pets.create(pet);

    res.status(200).send("pet created");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = { addPet };
