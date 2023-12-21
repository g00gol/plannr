import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { forgotpassword } from "../../api/auth";
import logo from "../../assets/logo_cropped.png";
import { forgotPasswordSchema } from "../../helpers/validation";

import EmailIcon from "@mui/icons-material/Email";

export default function ForgotPassword(): React.ReactElement {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const doForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    try {
      await forgotPasswordSchema.validateAsync({ email });
    } catch (error: any) {
      setError(error.message);
      return;
    }
    try {
      await forgotpassword(email);
      setMessage("Password reset email has been sent. Redirecting...");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" className="mb-4 h-1/4 w-1/4 rounded-full" />
      <h1 className="text-3xl font-bold"> Forgot Password </h1>
      <form onSubmit={doForgotPassword} className="w-full">
        <TextField
          id="email"
          type="email"
          label="Email"
          placeholder="email@address.com"
          variant="outlined"
          required
          autoFocus
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        {message ? <div>{message}</div> : <div></div>}
        {error ? <div className="text-red-500">{error}</div> : <div></div>}
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          I forgor 💀
        </button>
        <div>
          Nevermind?{" "}
          <Link to="/signin" className="login-link">
            Nevermind
          </Link>
        </div>
      </form>
    </div>
  );
}
