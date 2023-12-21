export class TripData {
  //private markerStyle;

  constructor(
    public trip_id: string,
    public name: string,
    public places: string[],
  ) {
    this.trip_id = trip_id;
    this.name = name;
    this.places = places;
  }
}
