import { } from "@react-google-maps/api";
import React from "react";

import { FaSearch } from "react-icons/fa";
import { TfiTarget } from "react-icons/tfi";
import { PlaceData } from "../../dataObjects/PlaceData";
import PlaceCard from "../PlaceCard";

interface SearchProps {
  placeData: Array<PlaceData>;
  resultsToggle: boolean;
  toggleResults: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  radius: number;
  unit: string;
}

export default function SearchResults({
  placeData,
  resultsToggle,
  toggleResults,
  searchText,
  radius,
  unit,
}: SearchProps): React.ReactElement {

  // Convert radius to readable format
  const convertRadius = () => {
    if (unit === "KM") {
      return (radius / 1000).toFixed(1);
    } else {
      return ((radius / 1000) * 0.621371).toFixed(1);
    }
  }

  return (
    <aside
      id="searchResults"
      className={`results top-inherit left-inherit load-slide-left fixed left-2 z-20 ml-2 ${placeData.length < 3 ? "h-fit" : "h-4/5"} w-1/3 rounded-lg pb-12 pl-10 opacity-90}`}
    >
      { placeData.length !== 0 ? (
      <div className={`dark:bg-gray-150 z-20 flex ${placeData.length < 3 ? "h-fit" : "h-full no-scrollbar"} flex-col rounded-lg bg-white shadow-md overflow`}>
        <div className="flex justify-between px-5 py-4">
          <h2 className="pt-2 text-2xl font-bold text-blue-500">
            Search Results
          </h2>
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300"
            onClick={() => toggleResults(!resultsToggle)}
          >
            &lt; Close Search Results
          </button>
        </div>
        <h3 className="text-1xl px-5">
          <FaSearch className="inline-block mr-2 mb-1" />
          <span className="font-bold">
            Number of Results
            {searchText ? ` for "${searchText}"` : ""}
          </span>
          : {placeData.length} {" |"}
          <TfiTarget className="inline-block ml-1 mr-2 mb-1" />
          <span className="font-bold">Search Radius</span>: {convertRadius()} {unit.toLowerCase()}
        </h3>
        <div className="flex-grow overflow-y-scroll px-3 py-4 no-scrollbar">
          {placeData.map((result, index) => (
            <div key={result.placeId}>
              <PlaceCard place={result} isResult={true} index={index}/>
            </div>
          ))}
        </div>
      </div> ) : (
      <div className="dark:bg-gray-150 z-20 flex h-fit pb-10 flex-col rounded-lg bg-white shadow-md">
        <div className="flex justify-between px-5 py-4">
          <h2 className="pt-2 text-2xl font-bold text-blue-500">Search Results</h2>{" "}
          {/* trip name? */}
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300"
            onClick={() => toggleResults(!resultsToggle)}
          >
            &lt; Close Search Results
          </button>
        </div>
        {/* <h3 className="text-1xl px-5">
          <span className="font-bold">Number of Results</span>:{" "}
          {placeData.length}
        </h3> */}
        <div className="flex-grow overflow-y-scroll px-3 py-4">
          <p className="text-center text-xl">No results {searchText ? ` for "${searchText}"` : ""} found in this area.</p>
        </div>
      </div>
      )}
    </aside>
  );
}
