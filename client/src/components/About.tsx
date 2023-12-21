import React from "react";

import { useNavigate } from "react-router-dom";

export const unloadModal = (navigate: Function) => {
  const modal = document.getElementById("modal");
  modal?.classList.remove("load-slide-fast");
  modal?.classList.add("unload-slide-fast");
  setTimeout(() => {
    navigate("/");
  }, 250);
};

export default function About(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div
      className="absolute left-0 top-0 z-40 h-screen w-screen opacity-100"
      onClick={() => unloadModal(navigate)}
    >
      <div
        id="modal"
        className="load-slide-fast absolute inset-y-0 left-0 right-0 top-0 z-50 flex h-screen w-3/4 flex-wrap content-center justify-center bg-white opacity-90 duration-75"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2/4 w-2/4">
          <h1 className="pt-10 text-3xl font-bold">About Plannr</h1>
        </div>
      </div>
    </div>
  );
}
