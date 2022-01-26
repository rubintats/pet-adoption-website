import React, { useState, useEffect } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function Search() {
  const [request, setRequest] = useState(false);
  const [type, setType] = useState("");
  // const [adoptionStatus, setAdoptionStatus] = useState("");

  const [listOfPets, setListOfPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/pets", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfPets(response.data);
        console.log(response.data);
      });
  }, []);

  const animals = [{ label: "Dog" }, { label: "Cat" }, { label: "Fish" }];

  const status = [
    { label: "Adopted" },
    { label: "Available" },
    { label: "Fostered" },
  ];

  const requestedData = listOfPets.filter(
    (element) => element.type === request
  );

  function searchButton() {
    setRequest(type);
  }

  //Search Form -----------------------------------------------------------------------------------

  return (
    <>
      <Box
        className="searchPetForm"
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Paper
          className="searchPaper"
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            height: 560,
            borderRadius: "5%",
            marginTop: "4rem",
          }}
        >
          <div>
            <h1 className="searchTitle">Find a friend</h1>
          </div>
          <Autocomplete
            onChange={(e) => {
              setType(e.target.innerText);
            }}
            disablePortal
            id="combo-box-demo-pet"
            options={animals}
            sx={{ width: 300, marginBottom: "1rem" }}
            renderInput={(params) => <TextField {...params} label="Pet" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo-status"
            options={status}
            sx={{ width: 300, marginBottom: "1rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Adoption status" />
            )}
          />
          <TextField
            id="PetName"
            label="Name"
            variant="outlined"
            sx={{ width: 300, marginBottom: "1rem" }}
          />
          <div>
            <TextField
              id="min-height"
              sx={{ m: 1, width: "8.9rem", marginBottom: "1rem" }}
              label="Min height"
              variant="outlined"
            />
            <TextField
              id="max-height"
              sx={{ m: 1, width: "8.9rem" }}
              label="Max height"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="min-weight"
              sx={{ m: 1, width: "8.9rem" }}
              label="Min weight"
              variant="outlined"
            />
            <TextField
              id="max-weight"
              sx={{ m: 1, width: "8.9rem" }}
              label="Max weight"
              variant="outlined"
              style={{ marginBottom: "2.6rem" }}
            />
          </div>
          <Button
            onClick={searchButton}
            style={{ backgroundColor: "#ffe2ce", color: "#4f331f" }}
            className="searchButton"
            variant="contained"
          >
            Search
          </Button>
        </Paper>
      </Box>

      {requestedData.map((element) => {
        return (
          <PetCard
            id={element.id}
            picture={element.picture}
            type={element.type}
            name={element.name}
            bio={element.bio}
            color={element.color}
            height={element.height}
            weight={element.weight}
            adoptionStatus={element.adoptionStatus}
            hypoallergenic={element.hypoallergenic}
            breed={element.breed}
            dietaryRestrictions={element.dietaryRestrictions}
          />
        );
      })}
    </>
  );
}

// Pet Card -----------------------------------------------------------------------------------

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

function PetCard(props) {
  return (
    <Card className="petcard" sx={{ maxWidth: 545, maxHeight: 545 }}>
      <CardContent>
        <img
          src={`http://localhost:3001/${props.picture}`}
          alt={props.type + props.name}
          variant="body2"
          color="text.secondary"
        />

        <Typography paragraph color="text.secondary">
          {props.type}
        </Typography>
        <Typography paragraph color="text.secondary">
          Name: {props.name}
        </Typography>
        <Typography paragraph color="text.secondary">
          {props.adoptionStatus}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Link to={"/petpage/" + Number(props.id)}>See more </Link>
        </IconButton>
      </CardActions>
    </Card>
  );
}
