import React, {useState, useEffect}from "react";
import { PlanMap } from "./types/PlanMap";
import { PlanMarker } from "./types/PlanMarker";
import { useJsApiLoader } from '@react-google-maps/api'

const elemId = "TEST_MAP";

function App(): React.ReactElement {

  const map = new PlanMap(elemId, 40.74691667, -74.02580556);
  const marker = new PlanMarker("TEST_POINT", 40.74691667, -74.02580556);
  const marker2 = new PlanMarker("TEST_POINT2", 40.74272, -74.02710);
  map.addLineFromPoints(marker, marker2)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  return isLoaded ? 
  (map.getMap())
  : <></>;
}

export default App;
