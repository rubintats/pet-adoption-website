import React, { useContext } from "react";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="homepage">
      {!user ? (
        <h1 className="homeTitle">Welcome to LuckyPet!</h1>
      ) : (
        <h1 className="homeTitle">Welcome to LuckyPet,{user}!</h1>
      )}
      <h2 className="homeSubTitle">
        New beginnings and happy endings just one click away.
      </h2>

      <p className="homeDescription">
        At our agency we will create the perfect match that best fits the needs
        of both the animal and yours, based on your preferences, lifestyle and
        your household. Whether you’d like to adopt or foster a pet, our agency
        counselor will guide you through the process till your new friend
        arrives safely to your house.
      </p>
      <p className="homeDescription">Talk to us. We’re all ears!</p>
    </div>
  );
};

export default Homepage;
