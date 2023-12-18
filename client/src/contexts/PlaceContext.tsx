import React, { createContext, useEffect } from "react";

interface PlaceContextType {
  place: google.maps.places.PlaceResult | null;
  setPlace: (place: google.maps.places.PlaceResult | null) => void;
  currentPlaceId: string;
}

export const PlaceContext = createContext<PlaceContextType>(null!);

export const PlaceProvider = ({ children }: React.PropsWithChildren<object>) => {
  const [place, setPlace] = React.useState<google.maps.places.PlaceResult | null>(null);
  const [currentPlaceId, setCurrentPlaceId] = React.useState<string>("");

  useEffect(() => {
    if (place) {
      setCurrentPlaceId(place.place_id ?? "");
    }
  }, [place]);

  return (
    <PlaceContext.Provider value={{ place, setPlace, currentPlaceId }}>
      {children}
    </PlaceContext.Provider>
  );
};