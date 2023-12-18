import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-simple-typewriter/dist/index";

import Navbar from "../components/Navbar";
import { CircleData } from "../dataObjects/CircleData";
import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { HomeProps } from "../types/HomeTypes";
import {
  radius as DEFAULT_RADIUS,
  EPlaces,
  pinSVGFilled,
  placeKeys,
  travelModeKeys
} from "../constants/GoogleMaps/config";
import nearbySearch from "../api/GoogleMaps/nearbySearch";
import SearchResults from "../components/Home/SearchResults";
import TripWindow from "../components/Home/TripWindow";
import Directions from "../components/Directions/Directions";

const underScoreRegex = new RegExp("_", "g");

export default function Home(props: HomeProps): React.ReactElement {
  const mapRef = useRef<google.maps.Map>();
  const [centerData, setCenterData] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 40.74273, lng: -74.038 });
  const [circleData, setCircleData] = useState<CircleData>();
  const [resultsToggle, toggleResults] = useState(false);
  const [placeData, setPlaceData] = useState<Array<PlaceData>>([]);
  const [tripToggle, toggleTrip] = useState(false);
  const [markerData, setMarkerData] = useState<Array<PlanMarkerData>>([]);
  const [typeData, setTypeData] = useState<string>("");
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>();
  const [keyWordData, setKeyWordData] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(import.meta.env.VITE_MAPS_API_KEY),
    libraries: ["places"],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setCircleData(undefined);
    setPlaceData([]);
    setMarkerData([]);
    mapRef.current = map;
  }, []);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchText(event.currentTarget.searchBar.value);
    setKeyWordData(event.currentTarget.searchBar.value);
    setTypeData(event.currentTarget.categories.value);
    setTravelMode(event.currentTarget.travel_mode.value);
    setCircleData(undefined);
    setPlaceData([]);
    setMarkerData([]);

    const center = mapRef.current?.getCenter();
    if (center) {
      setCenterData(center);
      setCircleData(new CircleData(centerData, DEFAULT_RADIUS));
    }

    toggleResults(true);
    toggleTrip(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        nearbySearch(
          mapRef,
          centerData,
          circleData,
          keyWordData,
          typeData,
          setPlaceData,
        );
      } catch (e) {
        console.log(e);
      }
    }
    if (resultsToggle) {
      fetchData();
    }
  }, [keyWordData, centerData]);

  return (
    <div className="flex h-screen flex-col">
      {props.children /* modal */}
      <Navbar />
      {isLoaded ? (
        <div className="flex flex-grow">
          <GoogleMap
            mapContainerStyle={{ width: "100vw" }}
            center={centerData}
            zoom={15}
            id={"WEBSITE_MAP"}
            onLoad={onLoad}
          >
            <form className="flex justify-center" onSubmit={search}>
              <input
                type="search"
                id="searchBar"
                name="searchBar"
                placeholder="Search Plannr ... Need inspiration? Use the dropdown to filter by category."
                className="bg-gray-40 p-50 z-10 m-3 block w-3/6 rounded-xl border border-gray-600 p-4 ps-10 text-lg opacity-90"
              ></input>
              <select
                name="categories"
                id="categories"
                className="w-1/8 bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 ps-10 text-lg opacity-90"
              >
                {placeKeys.map((key) => {
                  const val = EPlaces[key];
                  const text = (
                    key[0].toUpperCase() + key.substring(1, key.length)
                  ).replace(underScoreRegex, " ");
                  return (
                    <option
                      key={val.toString()}
                      id={val.toString()}
                      value={key}
                    >
                      {text}
                    </option>
                  );
                })}
              </select>
              <select
                name="travel_mode"
                id="travel_mode"
                className="w-1/8 bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 ps-10 text-lg opacity-90"
              >
                {travelModeKeys.map((key) => {
                  const val = google.maps.TravelMode[key];
                  const text = (key[0].toUpperCase() + key.substring(1, key.length).toLowerCase());
                  return (
                    <option
                      key={val.toString()}
                      id={val.toString()}
                      value={key}
                      selected={val === google.maps.TravelMode.WALKING}
                    >
                      {text}
                    </option>
                  );
                })}
              </select>
            </form>

            {/* Results Window pretend-component */}
            {resultsToggle && (
              <SearchResults
                mapRef={mapRef}
                placeData={placeData}
                resultsToggle={resultsToggle}
                toggleResults={toggleResults}
                searchText={searchText}
              />
            )}

            {/* Trip Window pretend-component */}
            {tripToggle && (
              <TripWindow
                mapRef={mapRef}
                tripToggle={tripToggle}
                toggleTrip={toggleTrip}
              />
            )}

            <Directions travelMode={travelMode ? travelMode : google.maps.TravelMode.WALKING} mapRef={mapRef}/>

            {markerData.map((result) => {
              return (
                <Marker
                  key={`(${result.location.lat()}, ${result.location.lng()})`}
                  title={result.title}
                  position={result.location}
                />
              );
            })}

            {circleData && (
              <Circle
                center={centerData}
                radius={circleData.radius}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                }}
              />
            )}
            {placeData.map((result) => {
              if (result.marker) {
                return (
                  <Marker
                    key={`(${result.marker.location.lat()}, ${result.marker.location.lng()})`}
                    title={result.marker.title}
                    position={result.marker.location}
                    icon={{
                      path: pinSVGFilled,
                      anchor: new google.maps.Point(12, 17),
                      fillOpacity: 1,
                      fillColor: "lightblue",
                      strokeWeight: 2,
                      strokeColor: "gray",
                      scale: 2,
                    }}
                  />
                );
              }
            })}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
