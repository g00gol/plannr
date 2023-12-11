import { PlanMarker } from "./PlanMarker";
import { PlanLineState, PlanLineProps } from "../types/PlanLineTypes";
import React from "react";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";

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

    componentDidMount(): void {
        this.instantiate(this.props.place1, this.props.place2);
    }

    instantiate = (place1 : PlanMarkerData | undefined, place2 : PlanMarkerData | undefined) => {
        this.setState({
            place1: place1 ? place1 : this.state.place1,
            place2: place2 ? place2 : this.state.place2
        })
    }

    state: PlanLineState = {
        place1: undefined,
        place2: undefined
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
        return <>
            {
                    <PlanMarker 
                    title={this.props.place1?.title}
                    latitude={this.props.place1?.location.lat()}
                    longitude={this.props.place1?.location.lng()}/>
            }
            {
                this.state.place2
                ?   <PlanMarker 
                    title={this.state.place2.title}
                    latitude={this.state.place2.location.lat()}
                    longitude={this.state.place2.location.lng()}/>
                : <></>
            }
        </>
    }
}