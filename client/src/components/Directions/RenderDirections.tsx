import React, { useState, useMemo, useCallback } from "react";
import { RenderDirectionsProps } from "../../types/RenderDirectionsType";
import { DirectionsRenderer, DirectionsService, Marker } from "@react-google-maps/api";
import { pinSVGFilled } from "../../constants/GoogleMaps/config";

export default function RenderDirections({
  place1,
  place2,
  travelMode,
  markerInd,
  mapRef
}: RenderDirectionsProps): React.ReactElement {
  const [dirResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);

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
                travelMode: travelMode,
            }
        :
            null
    }, [place1.marker?.location, place2.marker?.location, travelMode]);

  return ( directionsOpts != null && 
            place1.marker && place2.marker && 
            place1.marker.location && place2.marker.location ?
            <>
            <DirectionsService options={directionsOpts} callback={directionsCallback}/>
            { dirResult != null ?
                <DirectionsRenderer options={{ 
                    map: mapRef.current,               
                    directions: dirResult,
                    suppressMarkers: true,
                    preserveViewport: true,
                    polylineOptions: {
                        zIndex: 5,
                        strokeColor: "blue" 
                    }}}/>
                : <></>
            }
            <Marker
              key={`(${place2.marker.location.lat()}, ${place2.marker.location.lng()})`}
              title={place2.marker.title}
              position={place2.marker.location}
              label={{
                color: "white",
                text: String(markerInd + 1)
              }}
              icon={{
                path: pinSVGFilled,
                anchor: new google.maps.Point(12, 17),
                labelOrigin: new google.maps.Point(12.5, 10),
                fillOpacity: 1,
                fillColor: "crimson",
                strokeWeight: 2,
                strokeColor: "gray",
                scale: 2,
              }}
            />
            </>
        : 
            <></>
        )
}