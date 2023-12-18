import React from "react";
import { FaGripLines } from "react-icons/fa6";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";

import { TripContext } from "../../contexts/TripContext";
import PlaceCard, { PlaceCardRef } from "../PlaceCard";

interface TripWindowProps {
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  tripToggle: boolean;
  toggleTrip: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TripWindow({
  mapRef,
  tripToggle,
  toggleTrip,
}: TripWindowProps): React.ReactElement {
  const { currentTrip, onSortEnd } = React.useContext(TripContext);

  return (
    <aside
      id="tripWindow"
      className="trip top-inherit left-inherit load-slide-right-fast fixed right-12 z-20 mr-2 h-4/5 w-3/12 rounded-lg pb-10 pl-10 opacity-90 shadow-md"
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
        <div className="flex-grow overflow-y-scroll px-3 py-4">
          <SortableList
            onSortEnd={onSortEnd}
            className="list"
            draggedItemClassName="dragged"
            lockAxis="y"
          >
            {
              // current bug: does not remove existing placecards but tacks on new list of placecards.
              currentTrip.map((result, i) => (
                <SortableItem key={`${result.addr}-trip`}>
                  <PlaceCardRef>
                    {/* wraps a div around placecard */}
                    <PlaceCard mapRef={mapRef} place={result} isResult={false}>
                      <SortableKnob>
                        <div className="col-span-1 row-span-2 flex cursor-pointer select-none flex-col items-center justify-center">
                          <FaGripLines size={20} />
                          {i + 1}
                        </div>
                      </SortableKnob>
                    </PlaceCard>
                  </PlaceCardRef>
                </SortableItem>
              ))
            }
          </SortableList>
        </div>
      </div>
    </aside>
  );
}
