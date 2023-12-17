import React from "react";
import {} from "@react-google-maps/api";

import { PlaceData } from "../../dataObjects/PlaceData";
import PlaceCard from "../PlaceCard";

interface SearchProps {
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  placeData: Array<PlaceData>;
  resultsToggle: boolean;
  toggleResults: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
}

export default function SearchResults({
  mapRef,
  placeData,
  resultsToggle,
  toggleResults,
  searchText,
}: SearchProps): React.ReactElement {
  return (
    <aside
      id="searchResults"
      className="results top-inherit left-inherit load-slide-fast fixed left-2 z-20 ml-2 h-4/5 w-1/3 rounded-lg pb-10 pl-10 opacity-90 shadow-md"
    >
      <div className="dark:bg-gray-150 z-20 flex h-full flex-col rounded-lg bg-white shadow-md">
        <div className="flex justify-between px-5 py-4">
          <h2 className="pt-2 text-2xl font-bold text-blue-500">
            Search Results
          </h2>
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center font-bold hover:text-red-500"
            onClick={() => toggleResults(!resultsToggle)}
          >
            X
          </button>
        </div>
        <h3 className="text-1xl px-5">
          <span className="font-bold">
            Number of Results
            {searchText ? ` for "${searchText}"` : ""}
          </span>
          : {placeData.length}
        </h3>
        <div className="flex-grow overflow-y-scroll px-3 py-4">
          {placeData.map((result) => (
            <div key={`${result.addr}-result`}>
              <PlaceCard mapRef={mapRef} place={result} isResult={true} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
