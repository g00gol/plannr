import React, { createContext, useRef } from "react";

interface MapContextType {
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
}

export const MapContext = createContext<MapContextType>(null!);

export const MapProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const mapRef = useRef<google.maps.Map>();

  return (
    <MapContext.Provider
      value={{
        mapRef
      }}
    >
      {children}
    </MapContext.Provider>
  );
};