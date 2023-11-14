import React, {useState, useEffect}from "react";
import { PlanMap } from "./types/PlanMap";
import { PlanMarker } from "./types/PlanMarker";
import {APIProvider} from '@vis.gl/react-google-maps';

const elemId = "TEST_MAP";

function App(): React.ReactElement {
  const map = new PlanMap(elemId, 40.71314239501953, -74.00843048095703);
  const marker = new PlanMarker("TEST_POINT", 40.71314239501953, -74.00843048095703);

  return <APIProvider apiKey={process.env.MAPS_API as string} libraries={['marker']} version="beta">
      {map.getMap()}
  </APIProvider>;
}

export default App;
