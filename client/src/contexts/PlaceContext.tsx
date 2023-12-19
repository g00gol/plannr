import React, { createContext, useState } from "react";

interface PlaceContextType {
  currentPlaceDetails: string;
  setCurrentPlaceDetails: (placeId: string) => void;
}

export const PlaceContext = createContext<PlaceContextType>(null!);

export const PlaceProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentPlaceDetails, setCurrentPlaceDetails] = useState<string>("");

  return (
    <PlaceContext.Provider
      value={{
        currentPlaceDetails,
        setCurrentPlaceDetails
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};