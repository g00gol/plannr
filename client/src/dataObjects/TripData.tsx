export class TripData {
  //private markerStyle;

  constructor(
    public name: string,
    public places: string[],
  ) {
    this.name = name;
    this.places = places;
  }
}
