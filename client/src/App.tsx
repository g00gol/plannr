import React, {useState, useEffect}from "react";
import { PlanMap } from "./types/PlanMap";
import { PlanMarker } from "./types/PlanMarker";
import { useJsApiLoader } from '@react-google-maps/api'

const elemId = "TEST_MAP";

function App(): React.ReactElement {

  const map = new PlanMap(elemId, 40.71314239501953, -74.00843048095703);
  const marker = new PlanMarker("TEST_POINT", 40.71314239501953, -74.00843048095703);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  return isLoaded ? 
  (map.getMap())
  : <></>;
}

export default App;
