import React, { useState, useEffect, useContext } from "react";

import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { UserContext } from "./UserContext";
import { MapContext } from "./MapContext";
import { AuthContext } from "./AuthContext";
import { updateTripPlaces } from "../api/trip";
import { arrayMoveImmutable } from "array-move";
import { TripData } from "../dataObjects/TripData";

interface TripContextType {
  currentTrip: PlaceData[];
  tripName: string;
  currentInfoWindow: number;
  hasChanges: boolean;
  setTripName: (name: string) => void;
  setInfoWindow: (index: number) => void;
  addPlace: (place: PlaceData) => void;
  removePlace: (place: PlaceData) => void;
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  saveTrip: () => void;
}

export const TripContext = React.createContext<TripContextType>(null!);

// create functions for mutating tripcontext here; will use replace instead of mutation for statefulness
export const TripProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { mapRef } = useContext(MapContext);
  
  const [tripName, setTripName] = useState<string>("My Trip");
  const [tripId, setTripId] = useState<string>(""); //not needed yet
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [currentTrip, setCurrentTrip] = useState<PlaceData[]>([]);
  const [currentInfoWindow, setInfoWindow] = useState<number>(-1);
  // const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const { userData } = useContext(UserContext);
  const { loadUserData } = useContext(AuthContext);

  useEffect(() => {
    // load trip from user if user has trip in session
    const setTrip = async (map: google.maps.Map) => {
      try {
        const tripId = userData.currentTrip;
        let trip = userData.trips.find((trip) => trip.trip_id === tripId)

        // the below two lines can prolly be revised but my brain is fried
        if(!trip) trip = new TripData(tripId, "Your Trip", currentTrip.map((place) => place.placeId)); //if trip doesn't exist, create a new one with current guest trip 
        if(trip.places.length === 0) trip = new TripData(tripId, trip.name, currentTrip.map((place) => place.placeId)); //if it does exist but it's empty, create new one with current guest trip and name
        
        const placeIds = trip.places;
        const name = trip.name;

        setTripName(name);
        setTripId(tripId);
        const promises: Promise<PlaceData>[] = placeIds.map(async (placeId) => { //map > foreach, bc map expects a return value while foreach doesn't
          const request = {
            placeId: placeId,
            fields: [
              "name",
              "vicinity",
              "place_id",
              "opening_hours",
              "geometry",
              "price_level",
              "rating",
              "user_ratings_total",
              "photos",
            ],
          };
          const service = new google.maps.places.PlacesService(map);

          return new Promise<PlaceData>((resolve, reject) => {
            service.getDetails(request, (place, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                place != null
              ) {
                const placeId = place.place_id!; //might be dangerous, but this is what we'll do till we add a secondary identifier
                const name = place.name ? place.name : "Invalid Name";
                const address = place.vicinity ? place.vicinity : "Invalid Address";
                const isOpen = place.opening_hours?.isOpen();
                const location = place.geometry?.location;
                const priceLevel = place.price_level;
                const rating = place.rating;
                const ratingsTotal = place.user_ratings_total;
                const thumbnail = place.photos ? place.photos[0] : undefined;

                const newPlace = new PlaceData(
                  placeId,
                  name,
                  address,
                  priceLevel ? priceLevel : undefined,
                  rating ? rating : undefined,
                  ratingsTotal ? ratingsTotal : undefined,
                  isOpen ? isOpen : false,
                  location ? new PlanMarkerData(name, location) : undefined,
                  thumbnail,
                );

                resolve(newPlace);
              } 
              else {
                reject(`Place ${placeId} not found`);
              }
            });
          });
        });

        Promise.all(promises).then((places) => {
          setCurrentTrip(places);
        }).catch((error) => {
          console.error(error);
        });
      } catch (err) {
        console.log(err);
      } 
    }
    
    if (userData) {
      const checkMap = () => {
        const map = mapRef.current;
        setTimeout(() => { //loop until map is set, then set trip
          if(!map) {
            checkMap();
            return console.log("Map is undefined");
          }
          setTrip(map);
        }, 500);
      }
      checkMap();
    }
  }, [userData]);

  useEffect(() => {
    checkChanges();
  }, [currentTrip, userData]);

  const checkChanges = (trip?: TripData) => {
    // console.log(`checkChanges ${JSON.stringify(userData) } ${JSON.stringify(currentTrip)}`)
    if(userData && currentTrip) {
      const presavePlaces = trip ? trip.places : (userData.trips.find((trip) => trip.trip_id === tripId)?.places ?? []);
      const currentPlaces = currentTrip.map((place) => place.placeId);
      setHasChanges(JSON.stringify(presavePlaces) !== JSON.stringify(currentPlaces));
    } else if (currentTrip){
      setHasChanges(false);
    }
  }

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

  const saveTrip = async () => {
    try {
      const trip = await updateTripPlaces(tripId, currentTrip.map((place) => place.placeId));
      //try setting user data if not, just have a separate var to hold
      await loadUserData();
      checkChanges(trip);
    } catch (error: any) {
      console.log(error.message ?? error.statusText);
    }
  };
  
  return (
    <TripContext.Provider
      value={{
        currentTrip,
        tripName,
        currentInfoWindow,
        hasChanges,
        setTripName,
        setInfoWindow,
        addPlace,
        removePlace,
        onSortEnd,
        saveTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
