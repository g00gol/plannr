import { PlaceData } from "./PlaceData";

export class TripData {
    //private markerStyle;

    constructor(
        public name: string,
        public places: PlaceData[]
    ) {
        this.name = name;
        this.places = places;
    }
}