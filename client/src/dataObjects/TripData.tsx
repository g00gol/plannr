export class TripData {
  //private markerStyle;

  constructor(
    public name: string,
    public placeIds: string[],
  ) {
    this.name = name;
    this.placeIds = placeIds;
  }
}
