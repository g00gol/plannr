import React from "react";

import { PlaceData } from "../../dataObjects/PlaceData";
import { PlaceCard } from "../PlaceCard";

interface TripWindowProps {
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  currentTrip: Array<PlaceData>;
  tripToggle: boolean;
  toggleTrip: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TripWindow({
  mapRef,
  currentTrip,
  tripToggle,
  toggleTrip,
}: TripWindowProps): React.ReactElement {
  return (
    <aside
      id="tripWindow"
      className="top-inherit  left-inherit load-slide-fast fixed right-12 z-20 mr-2 h-4/5 w-1/3 rounded-lg pb-10 pl-10 opacity-90 shadow-md"
    >
      <div className="dark:bg-gray-150 z-20 flex h-full flex-col rounded-lg bg-white shadow-md">
        <div className="flex justify-between px-5 py-4">
          <h2 className="pt-2 text-2xl font-bold text-blue-500">Your Trip</h2>{" "}
          {/* trip name? */}
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center font-bold hover:text-red-500"
            onClick={() => toggleTrip(!tripToggle)}
          >
            X
          </button>
        </div>
        <h3 className="text-1xl px-5">
          <span className="font-bold">Places in Trip</span>:{" "}
          {currentTrip.length}
        </h3>
        <ul className="flex-grow overflow-y-scroll px-3 py-4">
          {
            // current bug: does not remove existing placecards but tacks on new list of placecards.
            currentTrip.map((result) => {
              return (
                <PlaceCard
                  key={result.addr}
                  mapRef={mapRef}
                  place={result}
                  isResult={false}
                />
              );
            })
          }
        </ul>
      </div>
    </aside>
  );
}
