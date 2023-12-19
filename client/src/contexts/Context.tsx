import React from "react";
import { AuthProvider } from "./AuthContext";
import { TripProvider } from "./TripContext";
import { SearchResultProvider } from "./SearchResultContext";

const providers = [AuthProvider, TripProvider, SearchResultProvider];

/**
 * This component is used to wrap the entire application with all the context providers.
 */
export function ContextProvider({ children }: { children: React.ReactNode }) {
  return providers.reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
