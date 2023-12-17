import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import noImage from "../assets/noImage.png";
import { PlaceCardProps } from "../types/PlaceCardType";
import { TripContext } from "../contexts/TripContext";

export default function PlaceCard({
  place,
  isResult,
  mapRef,
}: PlaceCardProps): React.ReactElement {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [hours, setHours] = useState<string[]>([]);

  const date: number = new Date().getDay();

  const { addPlace, removePlace } = useContext(TripContext);

  const showDetailsHandler = () => {
    setShowDetails(true);
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

  const hideDetailsHandler = () => {
    setShowDetails(false);
  };

  const convertPriceLevel = (priceLevel: number | undefined) => {
    if (priceLevel === undefined) {
      return "N/A";
    }

    return "$".repeat(priceLevel);
  };

    render() {
      return (
        <div className="place-card p-2 rounded-md">
          <div className={`grid grid-flow-col grid-rows-2 ${this.props.isResult ? "grid-cols-9" : "grid-cols-10"} gap-4 card-grid`}>
            <div className="row-span-2 col-span-6">
              {/* EXTRA FEATURE: instead of truncate, scroll text on hover */}
              <p className="text-lg font-bold card-title truncate">{this.props.place.title.length > 30 ? this.props.place.title.substring(0, 25) + "..." : this.props.place.title}</p>
              <p className='truncate'>{`${this.props.place.addr}`}</p>
              <p><span className="font-bold">Price Level: </span>{this.props.place.priceLevel ? this.convertPriceLevel(this.props.place.priceLevel) : "N/A"} | <span className="font-bold">Rating: </span>{this.props.place.rating? this.props.place.rating : "N/A"} ☆ ({this.props.place.ratingsTotal? this.props.place.ratingsTotal : 0})</p>
              <div className="flex flex-row gap-2 pt-2">
								{	this.props.isResult ?
									<Button variant="text" startIcon={<AddIcon />} onClick={() => this.addToTrip(this.props.place)}>
										Add to Plan
									</Button> :
									<Button variant="text" startIcon={<RemoveIcon />} onClick={() => this.removeFromTrip(this.props.place)}>
										Remove
									</Button>
								}
                {
                  this.state.showDetails ? (
                    <Button variant="text" color='inherit' startIcon={<KeyboardArrowUpIcon />} onClick={() => this.hideDetails()}>
                      Less Info
                    </Button>
                  ) : (
                    <Button variant="text" color='inherit' startIcon={<KeyboardArrowDownIcon />} onClick={() => this.showDetails()}>
                      More Info
                    </Button>
                  )
                }
              </div>
            </div>
            <div className={`row-span-2 h-full w-full ${this.props.isResult ? "col-span-4" : "col-span-3"} flex justify-center items-center place-img-container`}>
              <img className="place-img" src={
                  this.props.place.img?.getUrl() ?? noImage
              }/>
            </div>
            {this.props.children}
          </div>

          {this.state.showDetails ? (
              <div className="row-span-2 col-span-6 place-details">
                <hr className="border-1 pb-2 border-gray-300"/>
                <p><span className="font-bold">Phone: </span>{this.state.phone}</p>
                <p><span className="font-bold">Website: </span><a className="text-blue-500" href={this.state.website} rel="noopener noreferrer" target="_blank">{this.state.website}</a></p>

                <p><span className="font-bold pt-5">Hours: </span></p>
                { this.state.hours ? (
                  <table className="table-auto">
                    <tbody>
                      {this.state.hours.map((day, index) => (
                        (index == this.state.date - 1) ? (
                          <tr className="font-bold" key={index}>
                            <td className="pr-2">{day.substring(0, day.indexOf(":"))}</td>
                            <td>{day.substring(day.indexOf(":") + 1)}</td>
                          </tr>
                        ) : (
                          <tr key={index}>
                            <td className="pr-2">{day.substring(0, day.indexOf(":"))}</td>
                            <td>{day.substring(day.indexOf(":") + 1)}</td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No hours available.</p>
                )}
              </div>
            ) : (
              <></>
            )}
        </div>
      )
    }
}

interface PlaceCardRefProps {
  children?: React.ReactNode
}

export const PlaceCardRef = React.forwardRef((props: PlaceCardRefProps, ref: React.Ref<HTMLDivElement>) => (
  <div ref={ref}>
    {props.children}
  </div>
))