import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./components/About";
import AuthModal from "./components/auth/AuthModal";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
// import Protected from "./components/middleware/Protected"; //profile
import CounterProtected from "./components/middleware/CounterProtected";
import ResetProtected from "./components/middleware/ResetProtected";
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
            <CounterProtected>
              <AuthModal>
                <Signin />
              </AuthModal>
            </CounterProtected>
          </Home>
        }
      />
      <Route
        path="/signup"
        element={
          <Home>
            <CounterProtected>
              <AuthModal>
                <Signup />
              </AuthModal>
            </CounterProtected>        
          </Home>
        }
      />
      <Route
        path="/forgot"
        element={
          <Home>
            <CounterProtected>
              <AuthModal>
                <ForgotPassword />
              </AuthModal>
            </CounterProtected>
          </Home>
        }
      />
      <Route
        path="/reset"
        element={
          <Home>
            <ResetProtected>
              <AuthModal>
                <ResetPassword />
              </AuthModal>
            </ResetProtected>
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
