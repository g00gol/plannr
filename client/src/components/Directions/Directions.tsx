import React, { useContext } from "react";
import { DirectionsProps } from "../../types/DirectionsType";
import { TripContext } from "../../contexts/TripContext";
import RenderDirections from "./RenderDirections";

export default function Directions({
  travelMode,
  mapRef
}: DirectionsProps): React.ReactElement {
    const { currentTrip } = useContext(TripContext);

  return <>
    { currentTrip.map((result, ind) => {
            return ind != (currentTrip.length - 1)
            ? <RenderDirections place1={result} place2={currentTrip[ind + 1]} travelMode={travelMode} mapRef={mapRef}/>
            : <></>
        }
    )}
    </>
}