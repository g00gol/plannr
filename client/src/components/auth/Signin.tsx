import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signin } from "../../api/auth.js";
import logo from "../../assets/logo_cropped.png";
import { signinSchema } from "../../helpers/validation.js";
import { unloadModal } from "./AuthModal.js";

export default function Signin(): React.ReactElement {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const doSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    try {
      await signinSchema.validateAsync({ email: email, signinPassword: password });
      await signin(email, password);
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
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        {error ? <div className="text-red-500">{error}</div> : <div></div>}
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <label>
          <input
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
