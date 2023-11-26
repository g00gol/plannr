import React, {useState, useEffect}from "react";
import { PlanMap } from "./components/PlanMap";
import { PlanMarker } from "./components/PlanMarker";
import { Marker, useJsApiLoader } from '@react-google-maps/api'

const elemId = "TEST_MAP";

function App(): React.ReactElement {

  //const map : PlanMap = <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556}></PlanMap>;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  return isLoaded ?
  <div>
    <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556} zoom={15}>
    <form>
      <div className="flex justify-center ">
          <input 
              type="search" 
              id="searchBar" 
              placeholder="Search Plannr"
              className="z-10 opacity-90 block m-3 w-4/6 p-4 ps-10 text-lg border border-gray-600 rounded-xl bg-gray-40 p-50"
              >
          </input>
        </div>
    </form>
      <PlanMarker title={"TEST_POINT"} latitude={40.74691667} longitude={-74.02580556}></PlanMarker>
      <PlanMarker title={"TEST_POINT_2"} latitude={40.74272} longitude={-74.02710}></PlanMarker>
    </PlanMap>
  </div>
  : <></>;
}

export default App;
