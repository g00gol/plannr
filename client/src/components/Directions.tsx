import React, { useState, useContext, useMemo, useCallback } from "react";
import { DirectionsProps } from "../types/DirectionsType";
import { DirectionsContext } from "../contexts/DirectionsContext";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

export default function Directions({
  place1,
  place2,
  travelMode,
  mapRef,
}: DirectionsProps): React.ReactElement {
  const [polyline, setPolyLine] = useState<string>("");
  const [dirResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);


  //const { addPlace, removePlace } = useContext(DirectionsContext);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null && status === 'OK') {
        setDirectionsResult(result)
      }else{
        console.log(`Error obtaining result (Status: ${status})`)
      }
    },
    []);

  const directionsOpts = useMemo<google.maps.DirectionsRequest | null>(() => {
    return place1.marker && place2.marker && place1.marker.location && place2.marker.location
        ?
            {
                destination: place1.marker.location,
                origin: place2.marker.location,
                travelMode: travelMode
            }
        :
            null
    }, []);

  return ( directionsOpts ?
            <>
            <DirectionsService options={directionsOpts} callback={directionsCallback}/>
            { dirResult ?
                <DirectionsRenderer options={{directions: dirResult}}/>
                : <></>
            }
            </>
        : 
            <></>
        )
}