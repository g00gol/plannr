import { Marker } from "@react-google-maps/api"
import { ReactElement } from "react";

export class PlanMarker {
    private location : [number, number];

    constructor(
        private title: string,
        latitude: number,
        longitude: number,
    ) {
        this.title = title;
        this.location = [latitude, longitude];
    }

    getLatLng() : google.maps.LatLngLiteral {
        return {
            lat: this.location[0],
            lng: this.location[1]
        }
    }

    getMarker() : ReactElement<any, any> {
        return <Marker
                title={this.title}
                position= {
                        this.getLatLng()
                }
                ></Marker>
    }
}