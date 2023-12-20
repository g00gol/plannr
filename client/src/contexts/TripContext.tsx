import React, { useState, useEffect, useContext } from "react";

import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { UserContext } from "./UserContext";
import { MapContext } from "./MapContext";
import { arrayMoveImmutable } from "array-move";

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
  const [currentTrip, setCurrentTrip] = useState<PlaceData[]>([]);
  const [currentInfoWindow, setInfoWindow] = useState<number>(-1);
  // const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // load trip from user if user has trip in session
    if (userData) {
      const map = mapRef.current;
      if(!map) return console.log("Map is undefined");

      const currentTripId = 0; //userData.currentTrip;
      const placeIds = userData.trips[currentTripId].placeIds; //..get(currentTripId);
      setTripName(userData.trips[currentTripId].name); // .get(currentTripId).name);

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
