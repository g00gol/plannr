import { PlanMarkerData } from "./PlanMarkerData";

export class SidebarData {
    //private markerStyle;

    constructor(
        public title : string,
        public addr : string,
        public isOpen : boolean | undefined,
        public marker? : PlanMarkerData,
        public img? : google.maps.places.PlacePhoto
    ) {
        this.title = title;
        this.addr = addr;
        this.isOpen = isOpen;
        this.marker = marker;
        this.img = img
    }

    public getOpenStr() : string {
        if(this.isOpen == undefined){
            return "Invalid Hours"
        }

        return this.isOpen ? "Open" : "Closed";
    }
}