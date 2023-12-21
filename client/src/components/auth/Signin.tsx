import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signin } from "../../api/auth.js";
import logo from "../../assets/logo_cropped.png";
import { signinSchema } from "../../helpers/validation.js";
import { unloadModal } from "./AuthModal.js";

import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signin(): React.ReactElement {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const doSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const remember = (document.getElementById("remember") as HTMLInputElement).checked;
    try {
      await signinSchema.validateAsync({ email: email, signinPassword: password });
    } catch (error: any) {
      setError(error.message);
      return;
    }
    try {
      await signin(email, password, remember);
      unloadModal(navigate);
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" className="mb-4 h-1/4 w-1/4 rounded-full" />
      <h1 className="text-3xl font-bold"> Sign In </h1>
      <form onSubmit={doSignIn} className="w-full">
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
                <IconButton
                  aria-label="email icon"
                  disabled
                >
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            )
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
            )
          }}
        />
        {error ? <div className="text-red-500">{error}</div> : <div></div>}
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <label className="align-middle">
          <input
            id="remember"
            type="checkbox"
            checked={checked}
            name="remember"
            onChange={() => setChecked(!checked)}
          />{" "}
          Remember me |
          <Link to="/forgot" className="login-link relative pl-1 text-right">
            Forgot Password?
          </Link>
        </label>
        <div>
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
