import { PlaceData } from "./PlaceData";

export class TripData {
    //private markerStyle;

    constructor(
        public places: TripData[]
    ) {
        this.places = places;
    }
}