import React from "react"
import testImage from "../assets/testImage.jpeg"
import { SearchResProps, SearchResState } from "../types/SearchResTypes"

export class SidebarCard extends React.Component<SearchResProps, SearchResState>{
    state: SearchResState = {
        
    }

    render() {
        return <li>
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          <div className="row-span-2">
            <p className="text-lg font-bold">{this.props.title}</p>
            <p>{`${this.props.addr} - ${
                this.props.isOpen
                ? "Open" 
                : "Closed"
               }`}</p>
            <p>{this.props.desc}</p>
          </div>
          <div className="row-span-2 col-span-1">
            <img className="object-scale-down rounded-lg" src={
                this.props.img 
                ? this.props.img
                : testImage
            }/>
          </div>
        </div>
      </li>
    }

}