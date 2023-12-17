import { PlaceData } from "./PlaceData";

export class TripData {
  //private markerStyle;

  constructor(
    public name: string,
    public place_ids: string[],
  ) {
    this.name = name;
    this.place_ids = place_ids;
  }
}
