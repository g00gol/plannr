import { ReactElement } from "react";
import { PlanMarker } from "./PlanMarker";
import { DirectionsRenderer } from "@react-google-maps/api"

export class PlanLine {
    //TODO: Have the polyline be calculated, not have it be an input param 
    constructor(
        private place1 : PlanMarker,
        private place2 : PlanMarker,
        private travelMode : string
    )
    {
        this.place1 = place1;
        this.place2 = place2;
        this.travelMode = travelMode.trim().toLowerCase();
    }

    getTravelMode() : google.maps.TravelMode {

        switch(this.travelMode){
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
    getLine() : ReactElement<any, any> {
        //const apiResultOpts : google.maps.DirectionsRendererOptions = this.getAPI() //Spoofing backend API call for testing purposes
        //console.log(apiResultOpts)
        //<DirectionsRenderer options = {apiResultOpts}></DirectionsRenderer>
        return <>
            {this.place1.getMarker()}
            
            {this.place2.getMarker()}
        </>
    }
}