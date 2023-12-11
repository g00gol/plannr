import React from "react"
import testImage from "../assets/testImage.jpeg"
import { SearchResProps, SearchResState } from "../types/SearchResTypes"

export class ResultsCard extends React.Component<SearchResProps, SearchResState>{
    state: SearchResState = {
        
    }

    render() {
        return <li className="hover:bg-gray-100">
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          <div className="row-span-2">
            <p className="text-lg font-bold">{this.props.title}</p>
            <p>{`${this.props.addr} - ${
                this.props.isOpen
                ? "Open" 
                : "Closed"
               }`}</p>
          </div>
          <div className="row-span-2 col-span-1">
            <img className="object-scale-down rounded-lg max-h-[10vh]" src={
                this.props.img 
                ? this.props.img
                : testImage
            }/>
          </div>
        </div>
      </li>
    }

}