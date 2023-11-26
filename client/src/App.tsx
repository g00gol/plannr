import React, {useState, useEffect}from "react";
import { PlanMap } from "./components/PlanMap";
import { PlanMarker } from "./components/PlanMarker";
import { useJsApiLoader } from '@react-google-maps/api'

const elemId = "TEST_MAP";

function App(): React.ReactElement {

  //const map : PlanMap = <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556}></PlanMap>;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  return isLoaded ?
  <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556} zoom={15}>
    <PlanMarker title={"TEST_POINT"} latitude={40.74691667} longitude={-74.02580556}></PlanMarker>
    <PlanMarker title={"TEST_POINT_2"} latitude={40.74272} longitude={-74.02710}></PlanMarker>
  </PlanMap>
  : <></>;
}

export default App;
