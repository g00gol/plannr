import { PlanMarker } from "./PlanMarker";

export class PlanLine {
    constructor(
        private place1 : PlanMarker,
        private place2 : PlanMarker,
        private polyline : string
    )
    {
        this.place1 = place1;
        this.place2 = place2;
        this.polyline = polyline;
    }
}