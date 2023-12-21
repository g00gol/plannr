import React, { useState } from "react";

interface SearchResultContextType {
  currentInfoWindow: number;
  setInfoWindow: (index: number) => void;
}

export const SearchResultContext = React.createContext<SearchResultContextType>(
  null!,
);

export const SearchResultProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [currentInfoWindow, setInfoWindow] = useState<number>(-1);

  return (
    <SearchResultContext.Provider
      value={{
        currentInfoWindow,
        setInfoWindow,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
