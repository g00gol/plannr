import {Map} from '@vis.gl/react-google-maps';
import { ReactElement } from 'react';
import { PlanLine } from './PlanLine';

export class PlanMap {
    public center : [number, number];
    private lines : PlanLine[] = [];

    constructor(
        private id: string,
        latitude: number,
        longitude: number,
        public zoom: number = 8
    ) {
        this.id = id;
        this.center = [latitude, longitude];
        this.zoom = 8;
    }

    addLineToMap(){}

    getMap() : ReactElement<any, any> {
        return <Map center={{lat: this.center[0], lng: this.center[1]}} zoom={this.zoom} id={this.id}></Map>
    }
}