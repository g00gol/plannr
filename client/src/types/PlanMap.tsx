import { ReactElement } from 'react';
import { PlanLine } from './PlanLine';
import { GoogleMap } from '@react-google-maps/api';
import { PlanMarker } from './PlanMarker';

export class PlanMap {
    public center : [number, number];
    private lines : PlanLine[] = [];

    constructor(
        private id: string,
        latitude: number,
        longitude: number,
        public zoom: number = 15
    ) {
        this.id = id;
        this.center = [latitude, longitude];
        this.zoom = zoom;
    }

    addLineFromPoints(pm1 : PlanMarker, pm2 : PlanMarker, travelMode : string = 'WALKING'){
        this.lines.push(new PlanLine(pm1, pm2, travelMode));
    }

    getMap() : ReactElement<any, any> {
        return <GoogleMap 
                    mapContainerStyle={
                        {
                            width: '100vw',
                            height: '100vh'
                        }
                    } 
                    center={
                        {
                            lat: this.center[0], 
                            lng: this.center[1]
                        }
                    } 
                    zoom={this.zoom} 
                    id={this.id}
                >
                    {
                        this.lines.map((line) => {
                            return line.getLine()
                        })
                    }
                </GoogleMap>
    }
}