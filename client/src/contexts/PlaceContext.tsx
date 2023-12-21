import React, { createContext, useState } from "react";

interface PlaceContextType {
  currentPlaceDetails: string;
  setCurrentPlaceDetails: (placeId: string) => void;
  isInTrip: boolean;
  setIsInTrip: (isInTrip: boolean) => void;
}

export const PlaceContext = createContext<PlaceContextType>(null!);

export const PlaceProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentPlaceDetails, setCurrentPlaceDetails] = useState<string>("");
  const [isInTrip, setIsInTrip] = useState<boolean>(false);

  return (
    <PlaceContext.Provider
      value={{
        currentPlaceDetails,
        setCurrentPlaceDetails,
        isInTrip,
        setIsInTrip,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};