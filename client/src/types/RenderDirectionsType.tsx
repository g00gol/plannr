import { PlaceData } from "../dataObjects/PlaceData"

interface RenderDirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    place1: PlaceData
    place2: PlaceData
    travelMode: google.maps.TravelMode
    markerInd: number
    windowFunc: (index : number) => void
    children?: React.ReactNode
}

interface RenderDirectionsState {
    polyline: string
}

export type { RenderDirectionsProps, RenderDirectionsState }
