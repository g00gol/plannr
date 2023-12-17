import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { AuthModalProps } from "../../types/AuthModalTypes";

const AuthModal = (props: AuthModalProps): React.ReactElement => {
  window.onbeforeunload = () => {
    document.body.classList.remove("load-slide");
    document.body.classList.add("unload-slide");
  };

  return (
    <div className="load-slide absolute left-0 top-0 z-40 h-screen w-screen opacity-100 ">
      <div className="load-slide absolute inset-y-0 left-0 right-0 top-0 z-50 flex h-screen w-1/2 flex-wrap content-center justify-center bg-white opacity-90 duration-75">
        <div className="h-2/4 w-2/4">
          <Link to="/" className="back-link text-base">
            &lt; Back to plannr
          </Link>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
