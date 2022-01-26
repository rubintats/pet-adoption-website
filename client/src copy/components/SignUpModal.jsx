import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppContext } from "../context/AppContext";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

Modal.setAppElement("#root");

const SignUpModal = () => {
  const { modalIsOpen, setModalIsOpen, setActive } = useContext(AppContext);

  function closeModal() {
    setModalIsOpen(false);
  }

  function switchToLogin() {
    setActive("login");
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      {
        message: "Please enter a valid number.",
        excludeEmptyString: false,
      }
    ),
    userName: Yup.string().min(3).max(15).required(),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Passwords don't match"),
    }),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/users/register", data).then(() => {
      console.log(data);
    });
    closeModal();
  };

  const customStyles = {
    content: {
      width: 500,
      height: 700,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div>
        <Modal
          component="main"
          maxWidth="xs"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleBlur }) => (
              <Form className="signupModal">
                <h1 className="signupTitle">Register</h1>
                <div className="signupNameFieldDiv">
                  <ErrorMessage
                    className="signupErrorMsg"
                    name="firstName"
                    component="span"
                  />
                  <Field
                    onBlur={handleBlur}
                    className={
                      "form-input name-input" +
                      (errors.firstName && touched.firstName
                        ? " is-invalid"
                        : "")
                    }
                    autoComplete="off"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                  />

                  <ErrorMessage
                    className="signupErrorMsg"
                    name="lastName"
                    component="span"
                  />
                  <Field
                    onBlur={handleBlur}
                    className={
                      "form-input name-input" +
                      (errors.lastName && touched.lastName ? " is-invalid" : "")
                    }
                    autoComplete="off"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <ErrorMessage
                  className="signupErrorMsg"
                  name="phoneNumber"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "form-input" +
                    (errors.phoneNumber && touched.phoneNumber
                      ? " is-invalid"
                      : "")
                  }
                  autoComplete="off"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />

                <ErrorMessage
                  className="signupErrorMsg"
                  name="userName"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "form-input" +
                    (errors.userName && touched.userName ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  id="userName"
                  name="userName"
                  placeholder="Username"
                />

                <ErrorMessage
                  className="signupErrorMsg"
                  name="email"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "form-input" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />

                <ErrorMessage
                  className="signupErrorMsg"
                  name="password"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "form-input" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />

                <ErrorMessage
                  className="signupErrorMsg"
                  name="confirmPassword"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "form-input" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                  autoComplete="off"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <div className="signupButtonDiv">
                  <Button
                    style={{
                      marginRight: "2rem",
                      backgroundColor: "#ffe2ce",
                      color: "#4f331f",
                    }}
                    className="signupButton"
                    type="submit"
                    variant="contained"
                    onSubmit={onSubmit}
                  >
                    Register
                  </Button>
                  <Button
                    style={{ backgroundColor: "#ffe2ce", color: "#4f331f" }}
                    className="signupButton"
                    type="submit"
                    variant="contained"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                </div>
                <Link href="#" variant="body2" onClick={switchToLogin}>
                  Already have an account? Log in
                </Link>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export default SignUpModal;
