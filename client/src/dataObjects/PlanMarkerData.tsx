export class PlanMarkerData {
  constructor(
    public title: string,
    public location: google.maps.LatLng,
  ) {
    this.title = title;
    this.location = location;
  }
}
