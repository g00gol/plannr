import React from "react";
import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";
import { MapProvider } from "./MapContext";
import { PlaceProvider } from "./PlaceContext";
import { SearchResultProvider } from "./SearchResultContext";
import { TripProvider } from "./TripContext";

const providers = [TripProvider, SearchResultProvider, PlaceProvider];

/**
 * This component is used to wrap the entire application with all the context providers.
 */
export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <MapProvider>
        <AuthProvider>
          {
            providers.reduce((acc, Provider) => {
              return <Provider>{acc}</Provider>;
            }, children)
          }
        </AuthProvider>
      </MapProvider>
    </UserProvider>
  )
}
