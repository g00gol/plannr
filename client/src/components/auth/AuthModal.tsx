import React from "react";
import { Link } from "react-router-dom";

import { AuthModalProps } from "../../types/AuthModalTypes";
import { useNavigate } from "react-router-dom";

export default function AuthModal(props: AuthModalProps): React.ReactElement {
  const navigate = useNavigate();

  const unloadModal = () => {
    const modal = document.getElementById("modal");
    modal?.classList.remove("load-slide-fast");
    modal?.classList.add("unload-slide-fast");
    setTimeout(() => {
      navigate("/");
    }, 250);
  };
  
  return (
    <div className="absolute left-0 top-0 z-40 h-screen w-screen opacity-100" onClick={unloadModal}>
      <div id="modal" className="load-slide-fast absolute inset-y-0 left-0 right-0 top-0 z-50 flex h-screen w-1/2 flex-wrap content-center justify-center bg-white opacity-90 duration-75" onClick={(e) => e.stopPropagation()}>
        <div className="h-2/4 w-2/4">
          <span onClick={unloadModal} className="cursor-pointer">
            &lt; Back to plannr
          </span>
          {props.children}
        </div>
      </div>
    </div>
  );
}
