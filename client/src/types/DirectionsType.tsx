import { PlaceData } from "../dataObjects/PlaceData"

interface DirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    place1: PlaceData
    place2: PlaceData
    travelMode: google.maps.TravelMode
    children?: React.ReactNode
}

interface DirectionsState {
    polyline: string
}

export type { DirectionsProps, DirectionsState }
