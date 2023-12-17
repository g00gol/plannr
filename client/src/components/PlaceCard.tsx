import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from "@mui/material";
import React from "react";
import noImage from "../assets/noImage.png";
import { PlaceCardProps, PlaceCardState } from "../types/PlaceCardType";
import { FaCircle, FaCircleInfo } from "react-icons/fa6";
import { TripContext } from '../contexts/TripContext';
import { TripData } from '../dataObjects/TripData';
import { PlaceData } from '../dataObjects/PlaceData';
export class PlaceCard extends React.Component<PlaceCardProps, PlaceCardState>{
		static contextType = TripContext;
		declare context: React.ContextType<typeof TripContext>
	
    state: PlaceCardState = {
      showDetails: false,
      phone: "",
      website: "",
      hours: [],
      date: new Date().getDay()
    }

    constructor(props: PlaceCardProps){
      super(props);
      this.state = {
        showDetails: false,
        phone: "",
        website: "",
        hours: [],
        date: new Date().getDay()
      }

      this.showDetails = this.showDetails.bind(this);
      this.hideDetails = this.hideDetails.bind(this);
    }

    showDetails() {
      this.setState({showDetails: true});
      const map = this.props.mapRef.current;
      if(map == undefined){
          return;
      }

      const service = new google.maps.places.PlacesService(map);

			if(this.props.place.place_id == undefined) return console.log("missing place id for " + this.props.place.title);

      service.getDetails({
          placeId: this.props.place.place_id
      }, (place, status) => {
          if(status === google.maps.places.PlacesServiceStatus.OK && place){
            console.log(place);

            this.setState({
              phone: place.formatted_phone_number ? place.formatted_phone_number : "",
              website: place.website ? place.website : "",
              hours: place.opening_hours ? place.opening_hours.weekday_text : []
            });
          }
      });
    }

    hideDetails() {
      this.setState({showDetails: false});
    }

    convertPriceLevel(priceLevel: number | undefined) : string {
      if(priceLevel == undefined){
          return "N/A"
      }

      let priceStr = "";
      for(let i = 0; i < priceLevel; i++){
          priceStr += "$";
      }

      return priceStr;
    }

		addToTrip = (place: PlaceData) => {
			const { addPlace } = this.context; 


			addPlace(place);
		}

		removeFromTrip = (place: PlaceData) => {
			const { removePlace } = this.context;
			removePlace(place);
		}

    render() {
      return (
        <li className="place-card p-2 rounded-md">
          <div className="grid grid-flow-col grid-rows-2 gap-4 card-grid">
            <div className="row-span-2">
              <p className="text-lg font-bold card-title">{this.props.place.title.length > 30 ? this.props.place.title.substring(0, 25) + "..." : this.props.place.title}</p>
              <p>{`${this.props.place.addr}`}</p>
              <p><span className="font-bold">Price Level: </span>{this.props.place.priceLevel ? this.convertPriceLevel(this.props.place.priceLevel) : "N/A"} | <span className="font-bold">Rating: </span>{this.props.place.rating? this.props.place.rating : "N/A"} ☆ ({this.props.place.ratingsTotal? this.props.place.ratingsTotal : 0})</p>
              <div className="flex flex-row gap-2 pt-2">
								{	this.props.isResult ?
                    // FINALLY FUCKING WORKS
                    // there's still this bug where if u add a bunch of shit and delete some, remove becomes adding for some??? like what idk
                    // to recreate -> add muteki, then shokudo, then muteki, then shokudo. remove second shokudo (deletes last shokudo) then remove last muteki (deletes both).
                    // if you remove the remaining shokudo, it creates two mutekis. NO CLUE HOW
                    // prolly gets fixed once i prevent duplicates.
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
            <div className="row-span-2 col-span-1 place-img-container">
              <img className="place-img" src={
                  this.props.place.img?.getUrl() ?? noImage
              }/>
            </div>
          </div>

          {this.state.showDetails ? (
              <div className="row-span-2 col-span-1 place-details">
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
        </li>
      )
    }

}