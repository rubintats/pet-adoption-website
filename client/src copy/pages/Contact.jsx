import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.min.css";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const ContactForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast("Form sent! Someone will be in touch shortly.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, phoneNumber, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        phoneNumber,
        message,
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        className="contactUsForm"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20rem" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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
            borderRadius: "5px",
          }}
        >
          <div>
            <h1 className="contactTitle">We're all ears!</h1>
          </div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
          />
          <TextField id="outlined" label="Phone number" defaultValue="" />
          <TextField
            required
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            defaultValue=""
            style={{ marginBottom: "2.6rem" }}
          />
          <Button
            style={{ backgroundColor: "#ffe2ce", color: "#4f331f" }}
            className="contactUsButton"
            variant="contained"
            disabled={disabled}
          >
            Contact us
          </Button>
        </Paper>
      </Box>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
