export class CircleData {
  constructor(
    public center: google.maps.LatLng | google.maps.LatLngLiteral,
    public radius: number,
  ) {
    this.center = center;
    this.radius = radius;
  }
}
