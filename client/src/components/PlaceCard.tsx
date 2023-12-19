import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import noImage from "../assets/noImage.png";
import { PlaceContext } from "../contexts/PlaceContext";
import { TripContext } from "../contexts/TripContext";
import { PlaceCardProps } from "../types/PlaceCardType";

interface PlaceCardRefProps {
  children?: React.ReactNode;
}

export const PlaceCardRef = React.forwardRef<HTMLDivElement, PlaceCardRefProps>(
  (props, ref) => {
    return <div ref={ref}>{props.children}</div>;
  },
);

export default function PlaceCard({
  place,
  isResult,
  mapRef,
  index,
  children,
}: PlaceCardProps): React.ReactElement {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [hours, setHours] = useState<string[]>([]);

  const date: number = new Date().getDay();
  const { addPlace, removePlace } = useContext(TripContext);
  const { currentPlaceDetails, setCurrentPlaceDetails, currentTripPlaceDetails, setCurrentTripPlaceDetails } = useContext(PlaceContext);

  const fetchPlaceDetails = () => {
    const map = mapRef.current;
    if (!map || !place.place_id) {
      console.log("Map or place ID is undefined");
      return;
    }

    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId: place.place_id }, (placeDetails, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        placeDetails
      ) {
        setPhone(placeDetails.formatted_phone_number || "");
        setWebsite(placeDetails.website || "");
        setHours(placeDetails?.opening_hours?.weekday_text ?? []);
      }
    });
  };

  useEffect(() => {
    if (showDetails) {
      fetchPlaceDetails();
    }
  }, [showDetails, place.place_id, mapRef]);

  useEffect(() => {
    if (place.place_id === currentPlaceDetails && (isResult)) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [place.place_id, currentPlaceDetails, isResult]);

  const showDetailsHandler = () => {
    if (place.place_id) {
      setCurrentPlaceDetails(place.place_id);
    }
    setShowDetails(true);
  };

  const hideDetailsHandler = () => {
    setShowDetails(false);
  };

  const convertPriceLevel = (priceLevel: number | undefined) => {
    return priceLevel === undefined ? "N/A" : "$".repeat(priceLevel);
  };

  return (
    <div className={isResult ? "place-card rounded-md p-2 load-slide-left" : "place-card rounded-md p-2 load-slide-right-fast"}>
      <div
        className={`grid grid-flow-col grid-rows-2 ${
          isResult ? "grid-cols-9" : "grid-cols-10"
        } card-grid gap-4`}
      >
        <div className="col-span-6 row-span-2">
          <p className="card-title truncate text-lg font-bold" onClick={() => showDetailsHandler()} onDoubleClick={() => hideDetailsHandler()}>
            {index !== undefined ? ( <span className="text-blue-600">{index + 1}. </span>) : ""}
            {place.title.length > 30
              ? `${place.title.substring(0, 25)}...`
              : place.title}
          </p>
          <p className="truncate">{place.addr}</p>
          <p>
            <span className="font-bold">Price Level: </span>
            {convertPriceLevel(place.priceLevel)} |{" "}
            <span className="font-bold">Rating: </span>
            {place.rating ? place.rating : "N/A"} ☆ (
            {place.ratingsTotal ? place.ratingsTotal : 0})
          </p>
          <div className="flex flex-row gap-2 pt-2">
            {isResult ? (
              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={() => addPlace(place)}
              >
                Add to Plan
              </Button>
            ) : (
              <Button
                variant="text"
                startIcon={<RemoveIcon />}
                color="error"
                onClick={() => removePlace(place)}
              >
                Remove
              </Button>
            )}
            {showDetails ? (
              <Button
                variant="text"
                color="inherit"
                startIcon={<KeyboardArrowUpIcon />}
                onClick={() => hideDetailsHandler()}
              >
                Less Info
              </Button>
            ) : (
              <Button
                variant="text"
                color="inherit"
                startIcon={<KeyboardArrowDownIcon />}
                onClick={() => showDetailsHandler()}
              >
                More Info
              </Button>
            )}
          </div>
        </div>
        <div
          className={`row-span-2 h-full w-full ${
            isResult ? "col-span-4" : "col-span-3"
          } place-img-container flex items-center justify-center`}
        >
          <img
            className="place-img"
            src={place.img?.getUrl() ?? noImage}
            alt="Place"
          />
        </div>
        {children}
      </div>

      {showDetails && (
        <div className="place-details col-span-6 row-span-2">
          <hr className="border-1 border-gray-300 pb-2" />
          <p>
            <span className="font-bold">Phone: </span>
            {phone ? phone : "N/A"}
          </p>
          <p>
            <span className="font-bold">Website: </span>
            {website ? (
              <a
                className="text-blue-500 hover:underline"
                href={website}
                rel="noopener noreferrer"
                target="_blank"
              >
                {website}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            <span className="pt-5 font-bold">Hours: </span>
          </p>
          {hours.length > 0 ? (
            <table className="table-auto">
              <tbody>
                {hours.map((day, index) => (
                  <tr
                    key={index}
                    className={index === date - 1 ? "font-bold text-blue-600" : ""}
                  >
                    <td className="pr-2">
                      {day.substring(0, day.indexOf(":"))}
                    </td>
                    <td>{day.substring(day.indexOf(":") + 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hours available.</p>
          )}
        </div>
      )}
    </div>
  );
}
