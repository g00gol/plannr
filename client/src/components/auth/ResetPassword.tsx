import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import logo from "../../assets/logo_cropped.png";
import { resetpassword } from "../../api/auth";
import { resetPasswordSchema } from "../../helpers/validation";

export default function ResetPassword(): React.ReactElement {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";
  const navigate = useNavigate();

  const doResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;
    try {
      await resetPasswordSchema.validateAsync({ password, confirmPassword });
    } catch (error: any) {
      setError(error.message);
      return;
    }
    try {
      await resetpassword(oobCode, password);
      setMessage("Success!");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" className="mb-4 h-1/4 w-1/4 rounded-full" />
      <h1 className="text-3xl font-bold"> Reset Password </h1>
      <form onSubmit={doResetPassword} className="w-full">
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
        <TextField
          id="confirmPassword"
          type="password"
          label="ConfirmPassword"
          placeholder="Confirm Password"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        {message ? <div>{message}</div> : <div></div>}
        {error ? <div className="text-red-500">{error}</div> : <div></div>}
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
