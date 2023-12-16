import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "@mui/material";
import React from "react";
import noImage from "../assets/noImage.png";
import { SearchResProps, SearchResState } from "../types/SearchResTypes";


export class PlaceCard extends React.Component<SearchResProps, SearchResState>{
    state: SearchResState = {
      showDetails: false,
      phone: "",
      website: "",
    }

    constructor(props: SearchResProps){
      super(props);
      this.state = {
        showDetails: false,
        phone: "",
        website: "",
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
      service.getDetails({
          placeId: this.props.placeId
      }, (place, status) => {
          if(status === google.maps.places.PlacesServiceStatus.OK && place){
            console.log(place);

            this.setState({
              phone: place.formatted_phone_number ? place.formatted_phone_number : "",
              website: place.website ? place.website : "",
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

    render() {
      return (
        <li className="place-card p-2 rounded-md">
          <div className="grid grid-flow-col grid-rows-2 gap-4 card-grid">
            <div className="row-span-2">
              <p className="text-lg font-bold card-title">{this.props.title.length > 30 ? this.props.title.substring(0, 25) + "..." : this.props.title}</p>
              <p>{`${this.props.addr}`}</p>
              <p><span className="font-bold">Price Level: </span>{this.props.priceLevel ? this.convertPriceLevel(this.props.priceLevel) : "N/A"} | <span className="font-bold">Rating: </span>{this.props.rating? this.props.rating : "N/A"} ☆ ({this.props.ratingsTotal? this.props.ratingsTotal : 0})</p>
              <div className="flex flex-row gap-2 pt-2">
                <Button variant="text" startIcon={<AddIcon />}>
                  Add to Plan
                </Button>
                {
                  this.state.showDetails ? (
                    <Button variant="text" color='inherit' startIcon={<InfoIcon />} onClick={() => this.hideDetails()}>
                      Less Info
                    </Button>
                  ) : (
                    <Button variant="text" color='inherit' startIcon={<InfoIcon />} onClick={() => this.showDetails()}>
                      More Info
                    </Button>
                  )
                }
              </div>
            </div>
            <div className="row-span-2 col-span-1 place-img-container">
              <img className="place-img" src={
                  this.props.img
                  ? this.props.img
                  : noImage
              }/>
            </div>
          </div>

          {this.state.showDetails ? (
              <div className="row-span-2 col-span-1 place-details">
                <p className="text-lg font-bold card-title">{this.props.title.length > 30 ? this.props.title.substring(0, 25) + "..." : this.props.title}</p>
                <p>{`${this.props.addr}`}</p>
                <p><span className="font-bold">Price Level: </span>{this.props.priceLevel ? this.convertPriceLevel(this.props.priceLevel) : "N/A"} | <span className="font-bold">Rating: </span>{this.props.rating? this.props.rating : "N/A"} ☆ ({this.props.ratingsTotal? this.props.ratingsTotal : 0})</p>
                <p><span className="font-bold">Open: </span>{this.props.isOpen ? "Yes" : "No"}</p>
              </div>
            ) : (
              <></>
            )}
        </li>
      )
    }

}