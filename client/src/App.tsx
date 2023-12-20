import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./components/About";
import AuthModal from "./components/auth/AuthModal";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home>
            <></>
          </Home>
        }
      />
      <Route
        path="/about"
        element={
          <Home>
            <About />
          </Home>
        }
      />
      <Route
        path="/signin"
        element={
          <Home>
            <AuthModal>
              <Signin />
            </AuthModal>
          </Home>
        }
      />
      <Route
        path="/signup"
        element={
          <Home>
            <AuthModal>
              <Signup />
            </AuthModal>
          </Home>
        }
      />
      <Route
        path="/forgot"
        element={
          <Home>
            <AuthModal>
              <ForgotPassword />
            </AuthModal>
          </Home>
        }
      />
      <Route
        path="/reset"
        element={
          <Home>
            <AuthModal>
              <ResetPassword />
            </AuthModal>
          </Home>
        }
      />
      <Route
        path="*"
        element={
          <Home>
            <></>
          </Home>
        }
      />
    </Routes>
  );
}
