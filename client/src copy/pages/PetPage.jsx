import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function PetCard() {
  const petId = window.location.pathname.split("/").pop();
  const [petObject, setPetObject] = useState({});
  const { id, token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pets/${petId}`, {
        headers: { accesstoken: token, "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setPetObject(response.data);
      });
  }, [petId]);

  function adoptButton(e) {
    e.preventDefault();
    const dataPetAdopted = {
      id: petObject.id,
      picture: petObject.picture,
      name: petObject.name,
      type: petObject.type,
      bio: petObject.bio,
      color: petObject.color,
      height: petObject.height,
      weight: petObject.weight,
      hypoallergenic: petObject.hypoallergenic,
      breed: petObject.breed,
      dietaryRestriction: petObject.dietaryRestriction,
      adoptionStatus: "Adopted",
    };

    axios
      .post(
        `http://localhost:3001/pets/pet/adopt/${petId}/${id}`,
        dataPetAdopted,

        {
          headers: {
            accesstoken: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPetObject(response.data);
      });
    console.log(token);
  }

  function returnButton(e) {
    e.preventDefault();

    const dataPetReturned = {
      id: petObject.id,
      picture: petObject.picture,
      name: petObject.name,
      type: petObject.type,
      bio: petObject.bio,
      color: petObject.color,
      height: petObject.height,
      weight: petObject.weight,
      hypoallergenic: petObject.hypoallergenic,
      breed: petObject.breed,
      dietaryRestriction: petObject.dietaryRestriction,
      adoptionStatus: "Available",
    };
    axios
      .post(
        `http://localhost:3001/pets/pet/adopt/${petId}/${id}`,
        dataPetReturned,

        {
          headers: {
            accesstoken: token,
          },
        }
      )
      .then((response) => {
        setPetObject(response.data);
      });
  }

  function fosterButton(e) {
    e.preventDefault();

    const dataPetFostered = {
      id: petObject.id,
      picture: petObject.picture,
      name: petObject.name,
      type: petObject.type,
      bio: petObject.bio,
      color: petObject.color,
      height: petObject.height,
      weight: petObject.weight,
      hypoallergenic: petObject.hypoallergenic,
      breed: petObject.breed,
      dietaryRestriction: petObject.dietaryRestriction,
      adoptionStatus: "Fostered",
    };
    axios
      .post(
        `http://localhost:3001/pets/pet/adopt/${petId}/${id}`,
        dataPetFostered,
        {
          headers: {
            accesstoken: token,
          },
        }
      )
      .then((response) => {
        setPetObject(response.data);
      });
  }
  return (
    <Card className="petpagecard" sx={{ maxWidth: 545, maxHeight: 850 }}>
      <CardContent>
        <img
          src={
            petObject.picture && `http://localhost:3001/${petObject.picture}`
          }
          alt={petObject.name}
          variant="body2"
          color="text.secondary"
        />
        <Typography paragraph color="text.secondary">
          {petObject.type}
        </Typography>
        <Typography paragraph color="text.secondary">
          {petObject.name}
        </Typography>
        <Typography paragraph>Bio: {petObject.bio}</Typography>
        <Typography paragraph>Color: {petObject.color}</Typography>
        <Typography paragraph>Height: {petObject.height}</Typography>
        <Typography paragraph>Weight: {petObject.weight}</Typography>
        <Typography paragraph>
          Hypoallergenic: {petObject.hypoallergenic ? "yes" : "no"}
        </Typography>
        <Typography paragraph>Breed: {petObject.breed}</Typography>
        <Typography paragraph>
          Dietary Restriction: {petObject.dietaryRestriction ? "yes" : "no"}
        </Typography>
      </CardContent>
      <CardActions>
        {petObject.adoptionStatus === "Available" ? (
          <>
            <Button
              style={{ marginTop: "1px" }}
              onClick={adoptButton}
              size="small"
            >
              Adopt
            </Button>
            <Button
              style={{ marginTop: "1px" }}
              onClick={fosterButton}
              size="small"
            >
              Foster
            </Button>
          </>
        ) : (
          <Button
            style={{ marginTop: "1px" }}
            onClick={returnButton}
            size="small"
          >
            Return to agency
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
