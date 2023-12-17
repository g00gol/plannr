import { Marker } from "@react-google-maps/api";
import React from "react";
import { PlanMarkerProps, PlanMarkerState } from "../types/PlanMarkerTypes";

export class PlanMarker extends React.Component<
  PlanMarkerProps,
  PlanMarkerState
> {
  state: PlanMarkerState = {
    title: "",
    location: new google.maps.LatLng({ lat: 0, lng: 0 }),
  };

  componentDidMount(): void {
    this.instantiateProps(this.props);
  }

  instantiateVals = (title: string, latitude: number, longitude: number) => {
    this.setState({
      title: title,
      location: new google.maps.LatLng({ lat: latitude, lng: longitude }),
    });
  };

  instantiateProps = (props: PlanMarkerProps) => {
    this.setState(
      {
        title: String(props.title),
        location:
          props.latitude && props.longitude
            ? new google.maps.LatLng({
                lat: props.latitude,
                lng: props.longitude,
              })
            : this.state.location,
      },
      () => {
        console.log(
          this.state.title +
            " " +
            this.state.location.lat() +
            " " +
            this.state.location.lng(),
        );
      },
    );
  };

  render() {
    console.log(
      this.props.title + " " + this.props.latitude + " " + this.props.longitude,
    );
    console.log(
      this.state.title +
        " " +
        this.state.location.lat() +
        " " +
        this.state.location.lng(),
    );
    return this.state.title &&
      !(this.state.location.lat() == 0 && this.state.location.lng() == 0) ? (
      <Marker
        title={this.props.title}
        position={
          this.props.latitude && this.props.longitude
            ? new google.maps.LatLng(this.props.latitude, this.props.longitude)
            : this.state.location
        }
      />
    ) : (
      <></>
    );
  }
}
