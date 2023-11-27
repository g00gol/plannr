import { PlanLine } from './PlanLine';
import { GoogleMap } from '@react-google-maps/api';
import { PlanMapProps, PlanMapState } from '../types/TypeDefs';
import React from 'react';

export class PlanMap extends React.Component<PlanMapProps, PlanMapState>{
    state: PlanMapState = {
        lines: []
    }

    render() {
        return <GoogleMap 
                    mapContainerStyle={
                        {
                            width: '100vw',
                            height: '100vh'
                        }
                    } 
                    center={
                        {
                            lat: this.props.latitude, 
                            lng: this.props.longitude
                        }
                    } 
                    zoom={this.props.zoom} 
                    id={this.props.id}
                >
                    {
                        this.state.lines.map((line) => {
                            return <PlanLine
                                    place1={line.place1}
                                    place2={line.place2}
                                    travelMode={line.travelMode}></PlanLine>
                        })
                    }
                    {this.props.children}
                </GoogleMap>
    }
}