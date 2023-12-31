import { PlanMarkerData } from "./PlanMarkerData";

export class PlaceData {
  //private markerStyle;

  constructor(
    public placeId: string,
    public title: string,
    public addr: string,
    public priceLevel: number | undefined,
    public rating: number | undefined,
    public ratingsTotal: number | undefined,
    public isOpen: boolean | undefined,
    public marker?: PlanMarkerData,
    public img?: google.maps.places.PlacePhoto,
  ) {
    this.placeId = placeId;
    this.title = title;
    this.addr = addr;
    this.priceLevel = priceLevel;
    this.rating = rating;
    this.isOpen = isOpen;
    this.marker = marker;
    this.img = img;
  }

  public getOpenStr(): string {
    if (this.isOpen == undefined) {
      return "Invalid Hours";
    }

    return this.isOpen ? "Open" : "Closed";
  }
}
