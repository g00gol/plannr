export class PlanMarker {
    private location : [number, number];

    constructor(
        private title: string,
        latitude: number,
        longitude: number,
    ) {
        this.title = title;
        this.location = [latitude, longitude];
    }

    /*async placeMarker(map : google.maps.Map) : Promise<google.maps.Marker> {
        const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        return new Marker ({
            title: this.title,
            position: {lat: this.location[0], lng: this.location[1]},
            map: map
        });
    }*/
}