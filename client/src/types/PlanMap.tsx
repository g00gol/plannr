import { ReactElement } from 'react';
import { PlanLine } from './PlanLine';
import { GoogleMap } from '@react-google-maps/api';
import React from 'react';

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
                ></GoogleMap>
    }
}