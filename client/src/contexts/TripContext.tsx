import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { arrayMoveImmutable } from "array-move";

import { updateTripPlaces } from "../api/trip";
import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { TripData } from "../dataObjects/TripData";
import { MapContext } from "./MapContext";
import { UserContext } from "./UserContext";

interface TripContextType {
  currentTrip: PlaceData[];
  tripName: string;
  currentInfoWindow: number;
  hasChanges: boolean;
  savingTrip: boolean;
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
  const [presaveTrip, setPresaveTrip] = useState<PlaceData[]>([]); //used to check if trip has changed before saving
  const [currentTrip, setCurrentTrip] = useState<PlaceData[]>([]);
  const [currentInfoWindow, setInfoWindow] = useState<number>(-1);
  // const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const [savingTrip, setSavingTrip] = useState<boolean>(false); 
  const { userData } = useContext(UserContext);

  const [searchParams] = useSearchParams();
  const sharedTrip = searchParams.getAll("places[]") || [];

  const getPlaces = async (map: google.maps.Map, placeIds: string[]): Promise<PlaceData[]> => {
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

    const places = await Promise.all(promises);
    return places;
  }

  // http://localhost:5173/share?places%5B%5D=ChIJ__-DlN9ZwokRPnVsSyzpXc0&places%5B%5D=ChIJsYJBfl9XwokRZpOdm5tGNi8
  // load shared trip if exists and user is not logged in (for now. later when we add multiple trips, make it so they have to log in (or not?))
  useEffect(() => {
    if(sharedTrip && sharedTrip.length > 0 && !userData){
      const setTrip = async (map: google.maps.Map) => {
        console.log('load shared trip')
        const places = await getPlaces(map, sharedTrip);
        setCurrentTrip(places);
      }
      
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
  }, []);

  // load trip from user if user has trip in session
  useEffect(() => {
    const setTrip = async (map: google.maps.Map) => {
      console.log('load existing trip')
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
        const places = await getPlaces(map, placeIds);
        setPresaveTrip(places);
        setCurrentTrip(places);
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
  }, [currentTrip, presaveTrip, userData]);

  const checkChanges = () => {
    // console.log(`checkChanges ${JSON.stringify(userData) } ${JSON.stringify(currentTrip)}`)
    if(userData && currentTrip) {
      const presavePlacesToId = presaveTrip.map((place) => place.placeId);
      const currentPlacesToId = currentTrip.map((place) => place.placeId);
      setHasChanges(JSON.stringify(presavePlacesToId) !== JSON.stringify(currentPlacesToId));
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
      setSavingTrip(true);
      await updateTripPlaces(tripId, currentTrip.map((place) => place.placeId));
      setPresaveTrip(currentTrip);
      setSavingTrip(false);
    } catch (error: any) {
      console.log(error.message ?? error.statusText);
      setSavingTrip(false);
      alert("Error saving trip");
    }
  };
  
  return (
    <TripContext.Provider
      value={{
        currentTrip,
        tripName,
        currentInfoWindow,
        hasChanges,
        savingTrip,
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
