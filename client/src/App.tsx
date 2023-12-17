import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AuthModal from "./components/auth/AuthModal";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import "./App.css";

function App(): React.ReactElement {
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
      {/* <Route path="/forgot" element={<Home><></></Home>} /> */}
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

export default App;
