import { TripData } from "./TripData";

export class UserData {
  constructor(
    public currentTrip: string,
    public trips: TripData[],
  ) {
    this.currentTrip = currentTrip;
    this.trips = trips;
  }
}
