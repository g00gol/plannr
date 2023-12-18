import React, { useContext } from "react";
import { DirectionsProps } from "../../types/DirectionsType";
import { TripContext } from "../../contexts/TripContext";
import RenderDirections from "./RenderDirections";
import { pinSVGFilled } from "../../constants/GoogleMaps/config";
import { Marker } from "@react-google-maps/api";

export default function Directions({
  travelMode,
  mapRef
}: DirectionsProps): React.ReactElement {
    const { currentTrip } = useContext(TripContext);

  return ( currentTrip.length > 0 && currentTrip[0] && currentTrip[0].marker  ?
        <>
        <Marker
            key={`(${currentTrip[0].marker.location.lat()}, ${currentTrip[0].marker.location.lng()})`}
            title={currentTrip[0].marker.title}
            position={currentTrip[0].marker.location}
            icon={{
                path: pinSVGFilled,
                anchor: new google.maps.Point(12, 17),
                fillOpacity: 1,
                fillColor: "crimson",
                strokeWeight: 2,
                strokeColor: "gray",
                scale: 2,
            }}/>
            {
                currentTrip.map((result, ind) => {
                    if (ind == 0) {
                        return;
                    }

                    return <RenderDirections 
                            key={`(${currentTrip[ind - 1].marker?.location.lat()}, ${currentTrip[ind - 1].marker?.location.lng()}) | (${result.marker?.location.lat()}, ${result.marker?.location.lng()})`} 
                            place1={currentTrip[ind - 1]} 
                            place2={result} 
                            travelMode={travelMode} 
                            mapRef={mapRef}/>
                })
            }
        </>
        : <></>     
    )
}