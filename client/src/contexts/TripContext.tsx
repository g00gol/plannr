import React, { useState, useContext, useEffect } from "react";
import { TripData } from "../dataObjects/TripData";
import { AuthContext } from "./AuthContext";

interface TripContextType {
  currentTrip: TripData;
  addPlace: (placeId: string) => void;
  removePlace: (placeId: string) => void;
}

export const TripContext = React.createContext<TripContextType>(null!);

// create functions for mutating tripcontext here; will use replace instead of mutation for statefulness
export const TripProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentTrip, setCurrentTrip] = useState<TripData>(
    new TripData("My Trip", [])
  );
  const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    // load trip if user has trip in session
  }, []);

  const addPlace = (placeId: string) => {
    currentTrip.place_ids.push(placeId);
    setCurrentTrip(currentTrip);
  };

  const removePlace = (placeId: string) => {
    currentTrip.place_ids = currentTrip.place_ids.filter(
      (id) => id !== placeId
    );
    setCurrentTrip(currentTrip);
  };

  return (
    <TripContext.Provider value={{ currentTrip, addPlace, removePlace }}>
      {children}
    </TripContext.Provider>
  );
};
