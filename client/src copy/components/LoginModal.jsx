import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import Link from "@mui/material/Link";
import { AppContext } from "../context/AppContext";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

Modal.setAppElement("#root");

const LoginModal = () => {
  const { modalIsOpen, setModalIsOpen, setActive } = useContext(AppContext);
  const { setId, setUser, setToken, setAdmin } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function closeModal() {
    setModalIsOpen(false);
  }

  function switchToSignup() {
    setActive("signup");
  }

  const customStyles = {
    content: {
      width: 450,
      height: 500,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const login = async (data) => {
    await axios
      .post("http://localhost:3001/users/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("userName", response.data.userName);
          localStorage.setItem("userId", response.data.id);
          setId(response.data.id);
          setToken(response.data.accessToken);
          setUser(response.data.userName);
        }
        history.push("/");
      });
  };

  const onSubmit = () => {
    const data = { userName: userName, password: password };
    login(data);
    closeModal();
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="loginContainer">
      <Modal
        component="main"
        maxWidth="xs"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h1 className="loginTitle">Log in</h1>

        <div className="loginInputDiv">
          <label className="loginLabel">Username:</label>
          <input
            className="form-input"
            type="text"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <label className="loginLabel">Password:</label>
          <input
            className="form-input"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="loginButtonDiv">
          <Button
            className="loginButton"
            variant="contained"
            style={{
              marginRight: "2rem",
              backgroundColor: "#ffe2ce",
              color: "#4f331f",
            }}
            onClick={onSubmit}
          >
            Login
          </Button>
          <Button
            style={{
              marginRight: "2rem",
              backgroundColor: "#ffe2ce",
              color: "#4f331f",
            }}
            type="submit"
            className="loginButton"
            variant="contained"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
        <Link
          href="#"
          style={{ marginLeft: "5.5rem", marginTop: "1rem" }}
          variant="body2"
          onClick={switchToSignup}
        >
          {"Don't have an account? Sign Up"}
        </Link>
      </Modal>
    </div>
  );
};

export default LoginModal;
