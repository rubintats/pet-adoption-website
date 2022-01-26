import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Card from "@mui/material/Card";

const CreatePet = (props) => {
  const [listOfPets, setListOfPets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Dog");
  const [adoptionStatus, setAdoptionStatus] = useState("Available");
  const [picture, setPicture] = useState("");
  const [bio, setBio] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState(40);
  const [weight, setWeight] = useState(15);
  const [hypoallergenic, setHypoallergenic] = useState(true);
  const [breed, setBreed] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(true);
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState();

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };
  const bioChange = (event) => {
    setBio(event.target.value);
  };
  const heightChange = (event) => {
    setHeight(event.target.value);
  };
  const weightChange = (event) => {
    setWeight(event.target.value);
  };
  const breedChange = (event) => {
    setBreed(event.target.value);
  };
  const adoptionStatusChange = (event) => {
    setAdoptionStatus(event.target.value);
  };
  const dietaryRestrictionsChange = (event) => {
    const response = event.target.value;

    if (response === "yes") {
      setDietaryRestrictions(true);
    } else {
      setDietaryRestrictions(false);
    }
  };
  const hypoallergenicChange = (event) => {
    const response = event.target.value;

    if (response === "yes") {
      setHypoallergenic(true);
    } else {
      setHypoallergenic(false);
    }
  };

  const typeChange = (event) => {
    setType(event.target.value);
  };

  const pictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("picture", picture);
    formData.append("bio", bio);
    formData.append("color", color);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("breed", breed);
    formData.append("dietaryRestrictions", dietaryRestrictions);
    formData.append("hypoallergenic", hypoallergenic);
    formData.append("type", type);
    formData.append("adoptionStatus", adoptionStatus);

    await axios
      .post("http://localhost:3001/pets/pet", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setListOfPets(response.data);
      });

    setName("");
    setType("Dog");
    setAdoptionStatus("Available");
    setBio("");
    setColor("");
    setHeight("");
    setWeight("");
    setHypoallergenic(true);
    setBreed("");
    setDietaryRestrictions(true);
    setPicture("");
  };

  return (
    <>
      <Box>
        <Card
          className="searchPaper"
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 450,
            height: 720,
            borderRadius: "5%",
            marginTop: "2rem",
            marginLeft: "2rem",
          }}
        >
          <TextField
            className="muiAddPetAdmin"
            id="name"
            label="Name"
            value={name}
            onChange={nameChange}
            required
          />
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={pictureChange}
            className="muiAddPetAdmin"
            accept="image/png, image/jpeg, image/jpg"
          ></input>

          <Select
            defaultValue="Dog"
            label="Type"
            className="muiAddPetAdmin"
            id="type"
            required
            onChange={typeChange}
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Fish">Fish</MenuItem>
          </Select>
          <TextField
            className="muiAddPetAdmin"
            id="filled-basic"
            label="Color"
            value={color}
            onChange={colorChange}
          />
          <TextField
            className="muiAddPetAdmin"
            id="height"
            label="Height"
            type="number"
            value={height}
            onChange={heightChange}
          />
          <TextField
            className="muiAddPetAdmin"
            id="weight"
            label="Weight"
            type="number"
            value={weight}
            onChange={weightChange}
          />
          <TextField
            className="muiAddPetAdmin"
            id="breed"
            label="Breed"
            value={breed}
            onChange={breedChange}
            required
          />
          <TextField
            className="muiAddPetAdmin"
            id="bio"
            label="Bio"
            value={bio}
            onChange={bioChange}
            required
          />
          <InputLabel className="muiAddPetAdmin" id="demo-simple-select-label">
            Dietary Restrictions
          </InputLabel>
          <Select
            defaultValue="no"
            label="Dietary Restrictions"
            className="muiAddPetAdmin"
            id="dietaryRestrictions"
            required
            onChange={dietaryRestrictionsChange}
          >
            <MenuItem value="yes">yes</MenuItem>
            <MenuItem value="no">no</MenuItem>
          </Select>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Hypoallergenic
            </InputLabel>
            <Select
              defaultValue="no"
              label="Hypoallergenic"
              className="muiAddPetAdmin"
              id="hypoallergenic"
              onChange={hypoallergenicChange}
              required
            >
              <MenuItem value="yes">yes</MenuItem>
              <MenuItem value="no">no</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Adoption status
            </InputLabel>
            <Select
              defaultValue="available"
              label="Adoption Status"
              className="muiAddPetAdmin"
              id="adoptionStatus"
              onChange={adoptionStatusChange}
              required
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="adopted">Adopted</MenuItem>
              <MenuItem value="fostered">Fostered</MenuItem>
            </Select>
          </FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={onSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              Add a pet
            </Button>
          </div>
        </Card>
      </Box>
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2} style={{ marginTop: "10px" }}>
          {!authError ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Error check some mandatory fields!
              <strong>name, image url, type, adoption status</strong>
            </Alert>
          ) : (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>unauthorized access</strong>
            </Alert>
          )}
        </Stack>
      )}
    </>
  );
};

export default CreatePet;
