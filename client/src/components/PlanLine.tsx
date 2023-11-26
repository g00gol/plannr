import { PlanMarker } from "./PlanMarker";
import { PlanLineState, PlanLineProps } from "../types/TypeDefs";
import React from "react";

export class PlanLine extends React.Component<PlanLineProps, PlanLineState> {
    //TODO: Have the polyline be calculated, not have it be an input param 
    //private place1 : PlanMarker;
    //private place2 : PlanMarker;

    /*constructor(
        place1Props : PlanMarkerProps,
        place2Props : PlanMarkerProps,
        private travelMode : string
    )
    {
        this.place1.instantiateProps(place1Props);
        this.place2.instantiateProps();
        this.travelMode = travelMode.trim().toLowerCase();
    }*/

    state: PlanLineState = {
        place1: {},
        place2: {}
    }

    static getTravelMode(travelMode : string) : google.maps.TravelMode {

        switch(travelMode){
            case 'walking':
                return google.maps.TravelMode.WALKING;
            case 'driving':
                return google.maps.TravelMode.DRIVING;
            case 'bicycling':
                return google.maps.TravelMode.BICYCLING;
            case 'transit':
                return google.maps.TravelMode.TRANSIT;
            default:
                return google.maps.TravelMode.WALKING;
        }
    }
    

    // TODO: Plot line here as well
    render() {
        //const apiResultOpts : google.maps.DirectionsRendererOptions = this.getAPI() //Spoofing backend API call for testing purposes
        //console.log(apiResultOpts)
        //<DirectionsRenderer options = {apiResultOpts}></DirectionsRenderer>

        this.setState((state) => {
            place1: this.props.place1
                        ? this.props.place1
                        : state.place1
            place2: this.props.place2
                        ? this.props.place2
                        : state.place2
        });

        return <>
            <PlanMarker 
                title={this.state.place1.title}
                latitude={this.state.place1.latitude}
                longitude={this.state.place1.longitude}></PlanMarker>
            
            <PlanMarker 
                title={this.state.place2.title}
                latitude={this.state.place2.latitude}
                longitude={this.state.place2.longitude}></PlanMarker>
        </>
    }
}