import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { FaGripLines } from "react-icons/fa6";

import { Button } from "@mui/material";
import { TripContext } from "../../contexts/TripContext";
import PlaceCard, { PlaceCardRef } from "../PlaceCard";

interface TripWindowProps {
  tripToggle: boolean;
  toggleTrip: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TripWindow({
  tripToggle,
  toggleTrip,
}: TripWindowProps): React.ReactElement {
  const { currentTrip, hasChanges, onSortEnd, saveTrip } = React.useContext(TripContext);

  // Not working - intent is to unload window with animation
  const unloadWindow = () => {
    document.getElementById("tripWindow")?.classList.remove("load-slide-right");
    document.getElementById("tripWindow")?.classList.add("unload-slide-right");
    toggleTrip(!tripToggle);
  }

  return (
    <aside
      id="tripWindow"
      className={`trip top-inherit left-inherit load-slide-right fixed right-12 z-20 mr-2 ${currentTrip.length < 3 ? "h-fit" : "h-4/5"} w-1/3 rounded-lg pb-10 pl-10 opacity-90`}
    >
      {/* move this conditional into just the cards so we don't have to repeat some elements */}
      <div className={`dark:bg-gray-150 z-20 flex ${currentTrip.length < 3 ? "h-fit pb-10" : "h-full"} flex-col rounded-lg bg-white shadow-md`}>
        <div className="flex justify-between px-5 py-4">
          {/* trip name? */}
          <div className="w-1/2 flex flex-row">
            <h2 className="pt-2 text-2xl font-bold text-blue-500">Your Trip</h2>{" "}
          </div>
          <button
            type="button"
            className="text-md rounded-md px-4 py-2 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300"
            onClick={() => unloadWindow()}
          >
            Close Trip Window &gt;
          </button>
        </div>
        { hasChanges &&
          (
            <div className="flex justify-left px-5 pb-1">
              <p className="text-red-500 pb-1">You have unsaved changes!</p>
              <Button
                variant="text"
                color="inherit"
                onClick={() => saveTrip()}
                endIcon={<SaveIcon />}
                className='text-md rounded-md px-8 !pt-0 text-center hover:text-red-500 hover:font-bold hover:transition hover:duration-300'
              >
                Save
              </Button>
            </div>
          )
        }
        { currentTrip.length !== 0 ?
          <>
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
                  currentTrip.map((result, i) => (
                    <SortableItem key={result.placeId}>
                      <PlaceCardRef>
                        {/* wraps a div around placecard */}
                        <PlaceCard place={result} isResult={false}>
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
          </>
          :
          <div className="flex-grow overflow-y-scroll px-3 py-4">
            <p className="text-center text-xl">
            No places in trip yet!
            <br />
            Use the search results on the left to build an itinerary.
            </p>
          </div>
        }
      </div>
    </aside>
  );
}
