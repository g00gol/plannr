import React from "react";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { FaGripLines } from "react-icons/fa6";

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

  // Not working - intent is to unload window with animation
  const unloadWindow = () => {
    document.getElementById("tripWindow")?.classList.remove("load-slide-right");
    document.getElementById("tripWindow")?.classList.add("unload-slide-right");
    toggleTrip(!tripToggle);
  }

  return (
    <aside
      id="tripWindow"
      className="trip top-inherit left-inherit load-slide-right fixed right-12 z-20 mr-2 h-4/5 w-1/3 rounded-lg pb-10 pl-10 opacity-90"
    >
      { currentTrip.length !== 0 ? (
      <div className={`dark:bg-gray-150 z-20 flex ${currentTrip.length < 4 ? "h-fit" : "h-full"} flex-col rounded-lg bg-white shadow-md`}>
        <div className="flex justify-between px-5 py-4">
          <h2 className="pt-2 text-2xl font-bold text-blue-500">Your Trip</h2>{" "}
          {/* trip name? */}
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300"
            onClick={() => unloadWindow()}
          >
            Close Trip Window &gt;
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
                <SortableItem key={result.place_id}>
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
      </div> ) : (
        <div className="dark:bg-gray-150 z-20 flex h-fit pb-10 flex-col rounded-lg bg-white shadow-md">
          <div className="flex justify-between px-5 py-4">
            <h2 className="pt-2 text-2xl font-bold text-blue-500">Your Trip</h2>{" "}
            {/* trip name? */}
            <button
              type="button"
              className="text-md rounded-md px-4 py-2 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300"
              onClick={() => unloadWindow()}
            >
              Close Trip Window &gt;
            </button>
          </div>
          {/* <h3 className="text-1xl px-5">
            <span className="font-bold">Places in Trip</span>:{" "}
            {currentTrip.length}
          </h3> */}
          <div className="flex-grow overflow-y-scroll px-3 py-4">
            <p className="text-center text-xl">
            No places in trip yet!
            <br />
            Use the search results on the left to build an itinerary.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
