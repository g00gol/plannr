import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "@mui/material";
import React from "react";
import noImage from "../assets/noImage.png";
import { SearchResProps, SearchResState } from "../types/SearchResTypes";

export class PlaceCard extends React.Component<SearchResProps, SearchResState>{
    state: SearchResState = {
        
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
                <Button variant="text" color='warning' startIcon={<InfoIcon />}>
                  Info
                </Button>
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
        </li>
      )
    }

}