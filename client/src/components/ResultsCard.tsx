import React from "react";
import '../App.css';
import noImage from "../assets/noImage.png";
import { SearchResProps, SearchResState } from "../types/SearchResTypes";

export class ResultsCard extends React.Component<SearchResProps, SearchResState>{
    state: SearchResState = {
        
    }

    render() {
      return (
        <li className="results-card p-2 rounded-md">
          <div className="grid grid-flow-col grid-rows-2 gap-4 card-grid">
            <div className="row-span-2">
              <p className="text-lg font-bold">{this.props.title}</p>
              <p>{`${this.props.addr} - ${
                  this.props.isOpen
                  ? "Open"
                  : "Closed"
                }`}</p>
            </div>
            <div className="row-span-2 col-span-1 results-img-container">
              <img className="results-img" src={
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