import { PlanMarkerData } from "./PlanMarkerData";

export class PlanLineData {
    constructor(
        public polyLine : string,
        public point1 : PlanMarkerData,
        public point2 : PlanMarkerData
    ) {
        this.polyLine = polyLine;
        this.point1 = point1;
        this.point2 = point2;
    }
}