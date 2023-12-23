import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MapIcon from '@mui/icons-material/Map';
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Dialog } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import noImage from "../assets/noImage.png";
import { MapContext } from "../contexts/MapContext";
import { PlaceContext } from "../contexts/PlaceContext";
import { SearchResultContext } from "../contexts/SearchResultContext";
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
  index,
  children,
}: PlaceCardProps): React.ReactElement {
  const { mapRef } = useContext(MapContext);
  
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [hours, setHours] = useState<string[]>([]);
  const [gmapsLink, setGmapsLink] = useState<string>("");
  const [placeImgs, setPlaceImgs] = useState<google.maps.places.PlacePhoto[]>([]);
  const [openImgDialog, setOpenImgDialog] = useState<boolean>(false);

  const handleCloseImgDialog = () => setOpenImgDialog(false);
  const handleOpenImgDialog = () => setOpenImgDialog(true);

  const date: number = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  const { currentTrip, addPlace, removePlace } = useContext(TripContext);
  const { currentPlaceDetails, setCurrentPlaceDetails, isInTrip, setIsInTrip } = useContext(PlaceContext);
  const { currentInfoWindow } = useContext(SearchResultContext);

  const fetchPlaceDetails = () => {
    const map = mapRef.current;

    if (!map || !place.placeId) {
      console.log("Map or place ID is undefined");
      return;
    }

    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId: place.placeId }, (placeDetails, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        placeDetails
      ) {
        
        setPhone(placeDetails.formatted_phone_number || "");
        setWebsite(placeDetails.website || "");
        setHours(placeDetails?.opening_hours?.weekday_text ?? []);
        setGmapsLink(placeDetails.url ?? "");
        setPlaceImgs(placeDetails.photos ?? []);
      }
    });
  };

  useEffect(() => {
    if (showDetails) {
      fetchPlaceDetails();
    }
  }, [showDetails, place.placeId, mapRef]);

  useEffect(() => {
    if (place.placeId === currentPlaceDetails && (isResult)) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [place.placeId, currentPlaceDetails, isResult]);

  const showDetailsHandler = () => {
    if (isResult && !isInTrip) {
      setCurrentPlaceDetails(place.placeId);
    } else if (!isResult && isInTrip) {
      setCurrentPlaceDetails("");
    }

    setIsInTrip(!isResult);
    setShowDetails(true);
  };

  const hideDetailsHandler = () => {
    if (isResult && !isInTrip) {
      setCurrentPlaceDetails("");
    } else if (!isResult && isInTrip) {
      setCurrentPlaceDetails(place.placeId);
    }

    if (isResult) {
      setIsInTrip(true);
    } else {
      setIsInTrip(false);
      setCurrentPlaceDetails("");
    }

    setShowDetails(false);
  };

  const convertPriceLevel = (priceLevel: number | undefined) => {
    return priceLevel === undefined ? "N/A" : "$".repeat(priceLevel);
  };

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    const dialogScroll = document.getElementById("dialog-scroll");

    if (slider && !openImgDialog) {
      slider.scrollLeft -= 200;
    } else if (dialogScroll && openImgDialog) {
      dialogScroll.scrollLeft -= 300;
    }
  }

  const slideRight = () => {
    const slider = document.getElementById("slider");
    const dialogScroll = document.getElementById("dialog-scroll");

    if (slider && !openImgDialog) {
      slider.scrollLeft += 200;
    } else if (dialogScroll && openImgDialog) {
      dialogScroll.scrollLeft += 300;
    }
  }

  // Determine if the place this card is displaying is in the trip or not
  const inCurrentTrip = () => {
    if (currentTrip) {
      for (let i = 0; i < currentTrip.length; i++) {
        if (currentTrip[i].placeId === place.placeId) {
          return true;
        }
      }
    }

    return false;
  }

  const selected = () => {
    if (currentInfoWindow === index) {
      return "bg-blue-100";
    } else {
      return "";
    }
  }

  return (
    <div className={isResult ? `place-card rounded-md p-2 load-slide-left ${selected()}` : `place-card rounded-md p-2`}>
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
              // <Button
              //   variant="text"
              //   startIcon={<AddIcon />}
              //   onClick={() => addPlace(place)}
              // >
              //   Add to Plan
              // </Button>
              (
                inCurrentTrip() ? (
                  <Button
                    variant="text"
                    startIcon={<MapIcon />}
                    color="error"
                    disabled
                  >
                    Already in Trip
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    onClick={() => addPlace(place)}
                  >
                    Add to Trip
                  </Button>
                )
              )
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
          } place-img-container flex items-center justify-center hover:scale-105 ease-in-out duration-300`}
        >
          <img
            className="place-img hover:cursor-pointer"
            src={place.img?.getUrl() ?? noImage}
            alt="Place"
            onClick={() => showDetailsHandler()}
            onDoubleClick={() => hideDetailsHandler()}
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
                See Place's Website
              </a>
            ) : (
              "N/A"
            )}{" "} | <a className="text-blue-500 hover:underline" href={gmapsLink} rel="noopener noreferrer" target="_blank">See on Google Maps</a>
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
          <hr className="border-1 border-gray-300 pb-2" />
          <div className="flex flex-row gap-2 pt-2">
            <p><span className="font-bold">Photos: </span></p>
            {/* Create a horizontal scrollable div for the photos, all images should be the same size */}
            {placeImgs.length > 0 ? (
              <div className="relative flex items-center gap-2">
                <MdChevronLeft size={50} onClick={slideLeft} className="opacity-50 cursor-pointer hover:scale-105 hover:text-blue-500 ease-in-out" />
                <div id="slider" className="w-full h-full overflow-x-scroll no-scrollbar scroll whitespace-nowrap scroll-smooth">
                  {placeImgs.map((img, index) => (
                    <img
                      key={index}
                      className="place-img rounded-md inline-block cursor-pointer overflow-hidden h-[100px] w-[100px] hover:scale-105 ease-in-out duration-300 m-2"
                      src={img.getUrl()}
                      alt={`${place.placeId} image ${index}`}
                      onClick={handleOpenImgDialog}
                    />
                  ))}
                </div>
                <MdChevronRight size={50} onClick={slideRight} className="opacity-50 cursor-pointer hover:scale-105 hover:text-blue-500 ease-in-out" />
              </div>
            ) : (
              "No photos available."
            )}
          </div>
        </div>
      )}

      <Dialog
        open={openImgDialog}
        onClose={handleCloseImgDialog}
        maxWidth="lg"
        fullWidth
      >
        <div className="p-5">
          <h1 className="text-2xl font-bold">Images for {place.title}:</h1>
          <div className="relative flex items-center">
            <MdChevronLeft size={70} onClick={slideLeft} className="opacity-50 cursor-pointer hover:scale-105 hover:text-blue-500 ease-in-out" />
            <div id="dialog-scroll" className="w-full h-full overflow-x-scroll no-scrollbar scroll whitespace-nowrap scroll-smooth">
              {
                placeImgs.map((img, index) => (
                  <img
                    key={index}
                    className="place-img rounded-md inline-block cursor-pointer overflow-hidden h-[200px] w-[200px] hover:scale-105 ease-in-out duration-300 m-2"
                    src={img.getUrl()}
                    alt={`${place.placeId} image ${index}`}
                  />
                ))
              }
            </div>
            <MdChevronRight size={70} onClick={slideRight} className="opacity-50 cursor-pointer hover:scale-105 hover:text-blue-500 ease-in-out" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
