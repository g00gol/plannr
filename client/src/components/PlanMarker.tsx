import { Marker } from "@react-google-maps/api"
import React from "react";
import { PlanMarkerProps, PlanMarkerState } from "../types/PlanMarkerTypes";

export class PlanMarker extends React.Component<PlanMarkerProps, PlanMarkerState>{
    state: PlanMarkerState = {
        title: "",
        location: new google.maps.LatLng({lat:0, lng: 0})
    }

    componentDidMount(): void {
        this.instantiateProps(this.props);
    }

    instantiateVals = (title: string, latitude: number, longitude: number) => {
        this.setState(() => {
            title: title
            location: new google.maps.LatLng({lat: latitude, lng: longitude})
        })
    }

    instantiateProps = (props : PlanMarkerProps) => {
        this.setState((state) => {
            title: props.title
            location: 
            props.latitude && props.longitude 
            ? new google.maps.LatLng({lat: props.latitude, lng: props.longitude})
            : state.location
        })
    }

    render() {
        //console.log(this.props.title && this.props.latitude !== undefined && this.props.longitude !== undefined)
        //console.log(this.props.title + " " + this.props.latitude + " " + this.props.longitude)
        return ( 
            this.props.title && this.props.latitude !== undefined && this.props.longitude !== undefined
            ?
            <Marker
                title={this.props.title}
                position= { new google.maps.LatLng(
                        {
                            lat: this.props.latitude, 
                            lng: this.props.longitude
                        })
                }
            ></Marker>
            : <></>
        ) 
    }
}