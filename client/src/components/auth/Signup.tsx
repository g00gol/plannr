import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../api/auth.js";
import logo from "../../assets/logo_cropped.png";
import { signupSchema } from "../../helpers/validation.js";
import { unloadModal } from "./AuthModal.js";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Signup(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const doSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;
    try {
      await signupSchema.validateAsync({
        email,
        username,
        password,
        confirmPassword,
      });
    } catch (error: any) {
      setError(error.message);
      return;
    }
    try {
      await signup(email, username, password);
      unloadModal(navigate);
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" className="mb-4 h-1/4 w-1/4 rounded-full" />
      <h1 className="text-3xl font-bold"> Sign Up </h1>
      <form onSubmit={doSignUp}>
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
                <IconButton aria-label="email icon" disabled>
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="username"
          type="text"
          label="Username"
          placeholder="username"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="email icon" disabled>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Account
        </button>
        <div>
          Already have an account?{" "}
          <Link to="/signin" className="login-link">
            Sign in
          </Link>
        </div>
      </form>
      {error && <span className="py-2 text-red-500">{error}</span>}
    </div>
  );
}
