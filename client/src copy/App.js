import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { AppContext } from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import PetPage from "./pages/PetPage";
import CreatePet from "./pages/Admin";
import Profile from "./pages/Profile";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [active, setActive] = useState("login");
  const [user, setUser] = useState("");
  const [id, setId] = useState();
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("userName"));
    setToken(localStorage.getItem("accessToken"));
    setId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", user);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("setId", id);
  }, [token, user, id]);

  function openModal() {
    setModalIsOpen(true);
    setActive("login");
  }

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
        openModal,
        setActive,
      }}
    >
      <AuthContext.Provider
        value={{ id, setId, user, setUser, token, setToken, admin, setAdmin }}
      >
        <Router>
          <Navbar />

          {modalIsOpen && active === "login" && <LoginModal />}
          {modalIsOpen && active === "signup" && <SignUpModal />}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/petpage/:petId" component={PetPage} />
            <Route path="/admin" component={CreatePet} />
            <Route path="/login" component={LoginModal} />
            <Route path="/register" component={SignUpModal} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </AppContext.Provider>
  );
}
export default App;
