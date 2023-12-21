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
    <div className="absolute left-0 top-0 z-40 h-screen w-screen opacity-100" onClick={() => unloadModal(navigate)}>
      <div id="modal" className="load-slide-fast absolute inset-y-0 left-0 right-0 top-0 z-50 flex h-screen w-3/4 flex-wrap content-center justify-center bg-white opacity-90 duration-75" onClick={(e) => e.stopPropagation()}>
        <div className="h-2/4 w-2/4">
          <h1 className="text-3xl font-bold pt-10">About Plannr</h1>
          <p className="text-3x1"><span style="display: block">Ever feel like you just can't make a plan? Feel like you have no idea what to do? We are here to help with that! 
            We're taking Google Maps data to provide you with an easy-to-use trip-planning app. The app takes a given location and filtering parameters as its input to identify 
            nearby locations that match the user's criteria. After that, select the location(s) you would like to go to and we will provide the routes to reach your destination(s)!</span>
            <span style="display: block">Plannr is a site that will be powered by Google Maps, providing our users with a way to drop a pin on the map to a desired location 
              that you would like to search. Select a radius around the pin location and use a search bar to pass in filters such as the price range, and we will provide a 
              list of all available locations that you can select based on your query.</span></p>
        </div>
      </div>
    </div>
  );
}
