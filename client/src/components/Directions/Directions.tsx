import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useCallback, useContext } from "react";
import { pinSVGFilled } from "../../constants/GoogleMaps/config";
import { SearchResultContext } from "../../contexts/SearchResultContext";
import { TripContext } from "../../contexts/TripContext";
import { DirectionsProps } from "../../types/DirectionsType";
import RenderDirections from "./RenderDirections";

export default function Directions({
  travelMode,
  mapRef
}: DirectionsProps): React.ReactElement {
    const { currentTrip, currentInfoWindow, setInfoWindow : setTripWindow } = useContext(TripContext);
    const { setInfoWindow : setSearchWindow } = useContext(SearchResultContext);

    
    const updateWindows = useCallback((index: number) => {
        setTripWindow(index);
        setSearchWindow(-1);
    }, []);

  return ( currentTrip.length > 0 && currentTrip[0] && currentTrip[0].marker  ?
        <>
        {currentInfoWindow != -1 ?
              <InfoWindow
                onCloseClick={() => setTripWindow(-1)}
                options={{
                  ariaLabel: currentTrip[currentInfoWindow].title,
                  position: currentTrip[currentInfoWindow].marker?.location,
                }}>
                  <div className="text-center">
                    <h1 className="font-bold">{currentTrip[currentInfoWindow].title}</h1>
                    <p>{currentTrip[currentInfoWindow].addr}</p>
                    <p>{currentTrip[currentInfoWindow].rating ? `${currentTrip[currentInfoWindow].rating} ☆ (${currentTrip[currentInfoWindow].ratingsTotal})` : "No ratings"}</p>
                  </div>
                </InfoWindow>
                : <></>
        }
        <Marker
            key={currentTrip[0].placeId}
            title={currentTrip[0].marker.title}
            position={currentTrip[0].marker.location}
            label={{
                color: "white",
                text: "1"
            }}
            onClick={() => updateWindows(0)}
            icon={{
                path: pinSVGFilled,
                anchor: new google.maps.Point(12, 17),
                labelOrigin: new google.maps.Point(12.5, 10),
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
                            key={`${currentTrip[ind - 1].placeId} - ${result.placeId}`} 
                            place1={currentTrip[ind - 1]} 
                            place2={result} 
                            travelMode={travelMode} 
                            windowFunc={updateWindows}
                            markerInd={ind}
                            mapRef={mapRef}/>
                })
            }
        </>
        : <></>     
    )
}