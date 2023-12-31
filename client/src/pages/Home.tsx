import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-simple-typewriter/dist/index";

import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';

import { Slider } from "@mui/material";
import nearbySearch from "../api/GoogleMaps/nearbySearch";
import Directions from "../components/Directions/Directions";
import SearchResults from "../components/Home/SearchResults";
import TripWindow from "../components/Home/TripWindow";
import Navbar from "../components/Navbar";
import {
  radius as DEFAULT_RADIUS,
  EPlaces,
  Units,
  libsArr,
  pinSVGFilled,
  placeKeys,
  travelModeKeys,
} from "../constants/GoogleMaps/config";
import { MapContext } from "../contexts/MapContext";
import { SearchResultContext } from "../contexts/SearchResultContext";
import { TripContext } from "../contexts/TripContext";
import { CircleData } from "../dataObjects/CircleData";
import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { HomeProps } from "../types/HomeTypes";

const underScoreRegex = new RegExp("_", "g");

export default function Home(props: HomeProps): React.ReactElement {
  const { mapRef } = useContext(MapContext);
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
  const [currentUnit, setCurrentUnit] = useState<Units>(Units.KM);
  const { currentInfoWindow, setInfoWindow : setSearchWindow } = useContext(SearchResultContext);
  const { currentTrip, setInfoWindow : setTripWindow } = useContext(TripContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(import.meta.env.VITE_MAPS_API_KEY),
    libraries: libsArr,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setCircleData(undefined);
    setPlaceData([]);
    setMarkerData([]);
    mapRef.current = map;
  }, []);

  const updateWindows = useCallback((index: number) => {
    setSearchWindow(index);
    setTripWindow(-1);
  }, []);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const center = mapRef.current?.getCenter();

    if(
      event.currentTarget.searchBar.value != keyWordData || 
      event.currentTarget.categories.value != typeData || 
      center != centerData || 
      event.currentTarget.travel_mode.value != travelMode) {

      setSearchText(event.currentTarget.searchBar.value);
      setKeyWordData(event.currentTarget.searchBar.value);
      setTypeData(event.currentTarget.categories.value);
      setTravelMode(event.currentTarget.travel_mode.value);
      setCircleData(undefined);
      setPlaceData([]);
      setMarkerData([]);
  
      if (center) {
        setCenterData(center);
        setCircleData(new CircleData(centerData, circleData?.radius ? circleData.radius : DEFAULT_RADIUS));
      }
  
      toggleResults(true);
      toggleTrip(true);
    }

  };

  useEffect(() => {
    async function fetchData() {
      try {
        setSearchWindow(-1);
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
  }, [keyWordData, typeData, centerData, travelMode]);

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
            {/* Map crosshair */}
            <AddIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-blue-800 z-10 pointer-events-none"/>
            {/* Search Bar */}
            <form className="flex justify-center" onSubmit={search}>
              <input
                type="search"
                id="searchBar"
                name="searchBar"
                placeholder="Search Plannr ... Use the dropdown to filter by category."
                className="bg-gray-40 p-50 z-10 m-3 block w-2/6 rounded-xl border border-gray-600 p-4 text-lg opacity-90"
              />
              <select
                name="categories"
                id="categories"
                className="w-min bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 text-lg opacity-90"
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
                className="w-min bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 text-lg opacity-90"
                defaultValue={google.maps.TravelMode.WALKING}
                onChange={(e) => setTravelMode(e.target.value as google.maps.TravelMode)}
              >
                {travelModeKeys.map((key) => {
                  const val = google.maps.TravelMode[key];
                  const text = (key[0].toUpperCase() + key.substring(1, key.length).toLowerCase());
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

              <div className="w-2/12 bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 text-lg flex flex-row justify-center">
                <p className="text-center text-md mr-5 bg-slate-100 pl-2 pr-2 rounded-xl opacity-90">Radius</p>
                {
                  currentUnit === Units.KM ? (
                    <Slider
                    className="w-1/2 bg-gray-40"
                    defaultValue={DEFAULT_RADIUS / 1000}
                    aria-label="Radius"
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks
                    min={0.5}
                    max={5}
                    onChange={(e, value) => {
                      const center = mapRef.current?.getCenter();
                      if (value && center) {
                        setCenterData(center);
                        setCircleData(
                          new CircleData(centerData, value as number * 1000),
                        );
                      }
                    }}
                    />
                  ) : (
                    <Slider
                    className="w-1/2 bg-gray-40"
                    defaultValue={DEFAULT_RADIUS / 1609}
                    aria-label="Radius"
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks
                    min={0.5}
                    max={5}
                    onChange={(e, value) => {
                      const center = mapRef.current?.getCenter();
                      if (value && center) {
                        setCenterData(center);
                        setCircleData(
                          new CircleData(centerData, value as number * 1609),
                        );
                      }
                    }}
                    />
                  )
                }
              </div>

              <select
                name="units"
                id="units"
                className="w-min bg-gray-40 p-50 z-10 m-3 block rounded-xl border border-gray-600 p-4 text-lg opacity-90"
                defaultValue={Units.KM}
                onChange={(e) => {
                  const center = mapRef.current?.getCenter();
                  
                  if (center) {
                    setCenterData(center);
                  }

                  setCurrentUnit(e.target.value as Units);
                  if (circleData) {
                    if (e.target.value === Units.KM) {
                      // convert to km
                      setCircleData(
                        new CircleData(centerData, circleData.radius / 1.609),
                      );
                    } else {
                      // convert to miles
                      setCircleData(
                        new CircleData(centerData, circleData.radius * 1.609),
                      );
                    }
                  }
                }}
              >
                <option value={Units.KM}>km</option>
                <option value={Units.MI}>mi</option>
              </select>
            </form>

            {/* Results Window pretend-component */}
            {resultsToggle ? (
              <SearchResults
                placeData={placeData}
                resultsToggle={resultsToggle}
                toggleResults={toggleResults}
                searchText={searchText}
                radius={circleData ? circleData.radius : DEFAULT_RADIUS}
                unit={currentUnit}
              />
            ) : (
              <aside
                id="showSearchResultsButton"
                className="results top-inherit left-inherit load-slide-left fixed left-2 z-20 ml-2 h-4/5 w-1/7 rounded-lg pb-10 opacity-90"
              >
                <div className={`dark:bg-gray-150 z-20 flex flex-col rounded-lg bg-white shadow-md p-5`}>
                  <SearchIcon className="text-2xl text-blue-500"/>
                  <p className="text-center text-lg toggle-button" onClick={() => toggleResults(true)}>Show Search Results &gt;</p>
                </div>
              </aside>
            )}

            {/* Trip Window pretend-component */}
            {tripToggle ? (
              <TripWindow
                tripToggle={tripToggle}
                toggleTrip={toggleTrip}
              />
            ) : (
              <aside
                id="showTripWindowButton"
                className="trip top-inherit left-inherit load-slide-right fixed right-12 z-20 h-4/5 w-1/7 rounded-lg pb-10 opacity-90"
              >
                <div className={`dark:bg-gray-150 z-20 flex flex-col rounded-lg bg-white shadow-md p-5 justify-items-end`}>
                  <MapIcon className="text-2xl text-blue-500"/>
                  <p className="text-center text-lg toggle-button" onClick={() => toggleTrip(true)}>&lt; Show Your Trip</p>
                </div>
              </aside>
            )}

            <Directions travelMode={travelMode ? travelMode : google.maps.TravelMode.WALKING} mapRef={mapRef}/>

            {currentInfoWindow != -1 && placeData[currentInfoWindow] ?
              <InfoWindow
                onCloseClick={() => setSearchWindow(-1)}
                options={{
                  ariaLabel: placeData[currentInfoWindow].title,
                  position: placeData[currentInfoWindow].marker?.location,
                }}>
                  <div className="text-center">
                    <h1 className="font-bold">{placeData[currentInfoWindow].title}</h1>
                    <p>{placeData[currentInfoWindow].addr}</p>
                    <p>{placeData[currentInfoWindow].rating ? `${placeData[currentInfoWindow].rating} ☆ (${placeData[currentInfoWindow].ratingsTotal})` : "No ratings"}</p>
                  </div>
                </InfoWindow>
                : <></>
            }
            
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
            {placeData.map((result, ind) => {
              if (result.marker && !currentTrip.some(({ placeId }) => placeId === result.placeId)) {
                return (
                  <Marker
                    key={`(${result.marker.location.lat()}, ${result.marker.location.lng()})`}
                    title={result.marker.title}
                    position={result.marker.location}
                    label={{
                      color: "black",
                      text: String(ind + 1),
                    }}
                    onClick={() => updateWindows(ind)}
                    icon={{
                      path: pinSVGFilled,
                      anchor: new google.maps.Point(12, 17),
                      labelOrigin: new google.maps.Point(12.5, 10),
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

      <footer className="flex justify-center items-center h-8 bg-black text-white">
        <p className="text-center">Plannr © 2023 gang gang ice cream so good, Inc.</p>
      </footer>
    </div>
  );
}
