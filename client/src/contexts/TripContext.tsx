import React, { useState, useEffect, useContext } from "react";

import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { UserContext } from "./UserContext";
import { MapContext } from "./MapContext";
import { updateTripPlaces } from "../api/trip";
import { arrayMoveImmutable } from "array-move";
import { TripData } from "../dataObjects/TripData";

interface TripContextType {
  currentTrip: PlaceData[];
  tripName: string;
  currentInfoWindow: number;
  setTripName: (name: string) => void;
  setInfoWindow: (index: number) => void;
  addPlace: (place: PlaceData) => void;
  removePlace: (place: PlaceData) => void;
  onSortEnd: (oldIndex: number, newIndex: number) => void;
}

export const TripContext = React.createContext<TripContextType>(null!);

// create functions for mutating tripcontext here; will use replace instead of mutation for statefulness
export const TripProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { mapRef } = useContext(MapContext);
  
  const [tripName, setTripName] = useState<string>("My Trip");
  const [tripId, setTripId] = useState<string>("");
  const [currentTrip, setCurrentTrip] = useState<PlaceData[]>([]);
  const [currentInfoWindow, setInfoWindow] = useState<number>(-1);
  // const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // load trip from user if user has trip in session
    if (userData) {
      const map = mapRef.current;
      if(!map) return console.log("Map is undefined");
      try {
        const tripId = userData.currentTrip;
        const trip = userData.trips.find((trip) => trip._id === tripId) ?? new TripData("Your Trip", []);
        const placeIds = trip.places;
        const name = trip.name;
        setTripName(name);
        setTripId(tripId);
  
        placeIds.forEach(async (placeId) => {
          const request = {
            placeId: placeId,
            fields: [
              "name",
              "vicinity",
              "placeId",
              "opening_hours",
              "geometry",
              "price_level",
              "rating",
              "user_ratings_total",
              "photos",
            ],
          };
          const service = new google.maps.places.PlacesService(map);
          service.getDetails(request, (place, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              place != null
            ) {
              console.log(place);
              const placeId = place.place_id;
              const name = place.name ? place.name : "Invalid Name";
              const address = place.vicinity ? place.vicinity : "Invalid Address";
              const isOpen = place.opening_hours?.isOpen();
              const location = place.geometry?.location;
              const priceLevel = place.price_level;
              const rating = place.rating;
              const ratingsTotal = place.user_ratings_total;
              const thumbnail = place.photos ? place.photos[0] : undefined;
              // NOTE: if this is bad (doesn't refresh), create state for placeids and useEffect for placeIds that clears currentTrip and calls this load function
              setCurrentTrip([
                ...currentTrip,
                new PlaceData(
                  placeId,
                  name,
                  address,
                  priceLevel ? priceLevel : undefined,
                  rating ? rating : undefined,
                  ratingsTotal ? ratingsTotal : undefined,
                  isOpen ? isOpen : false,
                  location ? new PlanMarkerData(name, location) : undefined,
                  thumbnail,
                ),
              ]);
            }
          });
        });
      } catch (err) {
        console.log(err);
      } 
    }
  }, [userData]);

  const addPlace = (place: PlaceData) => {
    //add placeid to user's trip
    if (currentTrip.some((p) => p.placeId === place.placeId))
      return console.log(`${place.title} is already in your trip!`);
    setCurrentTrip([...currentTrip, place]);
  };

  const removePlace = (place: PlaceData) => {
    //remove placeid to user's trip
    if (!currentTrip.some((p) => p.placeId === place.placeId))
      return console.log(`${place.title} isn't in your trip!`);
    const filtered = currentTrip.filter((p) => p.placeId !== place.placeId);
    setCurrentTrip(filtered);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setCurrentTrip((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  const saveTrip = () => {
    updateTripPlaces(currentTrip.map((place) => place.placeId));
  };
  
  return (
    <TripContext.Provider
      value={{
        currentTrip,
        tripName,
        currentInfoWindow,
        setTripName,
        setInfoWindow,
        addPlace,
        removePlace,
        onSortEnd,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
