import React, { useContext, useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { id, token } = useContext(AuthContext);
  const [userObject, setUserObject] = useState();
  const [userObjectUpdated, setUserObjectUpdated] = useState();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    phoneNumber: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      {
        message: "Please enter a valid number.",
        excludeEmptyString: false,
      }
    ),
    email: Yup.string().email("Email is invalid"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    bio: Yup.string().min(20).max(140),
  });

  useEffect(() => {
    (async () => {
      try {
        const userObject = await axios.get(
          `http://localhost:3001/users/${id}`,
          { headers: { accesstoken: token } }
        );
        setUserObject(userObject.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, token]);

  const initialValues = useMemo(
    () => ({
      firstName: userObject?.firstName,
      lastName: userObject?.lastName,
      phoneNumber: userObject?.phoneNumber,
      email: userObject?.email,
      password: userObject?.password,
      bio: userObject?.bio,
    }),
    [userObject]
  );

  const onSubmit = async (values) => {
    const userObjectUpdated = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      bio: values.bio,
    };
    console.log(values.bio);
    const response = await axios.put(
      `http://localhost:3001/users/profile/${id}`,
      userObjectUpdated,
      {
        headers: { accesstoken: token },
      }
    );

    setUserObjectUpdated(userObjectUpdated);
  };

  return (
    <>
      <div>
        <Paper
          className="profilePaper"
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 550,
            height: 640,
            borderRadius: "5%",
            marginTop: "4rem",
            marginLeft: "30rem",
          }}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, values, touched, handleBlur }) => (
              <Form className="signupModal">
                <h1 className="signupTitle">Profile Settings</h1>
                <div className="profileFieldDiv">
                  <ErrorMessage
                    className="profileErrorMsg"
                    name="firstName"
                    component="span"
                  />
                  <Field
                    onBlur={handleBlur}
                    className={
                      "profile-form-input profile-name-input" +
                      (errors.firstName && touched.firstName
                        ? " is-invalid"
                        : "")
                    }
                    autoComplete="off"
                    id="firstName"
                    name="firstName"
                    value={values.firstName || ""}
                  />

                  <ErrorMessage
                    className="profileErrorMsg"
                    name="lastName"
                    component="span"
                  />
                  <Field
                    onBlur={handleBlur}
                    className={
                      "profile-form-input profile-name-input" +
                      (errors.lastName && touched.lastName ? " is-invalid" : "")
                    }
                    autoComplete="off"
                    id="lastName"
                    name="lastName"
                    value={values.lastName || ""}
                  />
                </div>
                <ErrorMessage
                  className="profileErrorMsg"
                  name="phoneNumber"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "profile-form-input" +
                    (errors.phoneNumber && touched.phoneNumber
                      ? " is-invalid"
                      : "")
                  }
                  autoComplete="off"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber || ""}
                />

                <ErrorMessage
                  className="profileErrorMsg"
                  name="email"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "profile-form-input" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  value={values.email || ""}
                />

                <ErrorMessage
                  className="profileErrorMsg"
                  name="password"
                  component="span"
                />
                <Field
                  onBlur={handleBlur}
                  className={
                    "profile-form-input" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  type="password"
                  id="password"
                  name="password"
                  value={values.password || ""}
                />

                <ErrorMessage
                  className="profileErrorMsg"
                  name="bio"
                  component="span"
                />
                <Field
                  component="textarea"
                  rows="4"
                  onBlur={handleBlur}
                  className={
                    "profile-form-input" +
                    (errors.bio && touched.bio ? " is-invalid" : "")
                  }
                  autoComplete="off"
                  id="bio"
                  name="bio"
                  value={values.bio || ""}
                />

                <Button
                  style={{
                    marginRight: "2rem",
                    backgroundColor: "#ffe2ce",
                    color: "#4f331f",
                  }}
                  className="profileButton"
                  type="submit"
                  variant="contained"
                >
                  Save changes
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </>
  );
};

export default Profile;
