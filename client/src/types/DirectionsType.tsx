<<<<<<< HEAD

interface RenderDirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
=======
import { PlaceData } from "../dataObjects/PlaceData"

interface DirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    place1: PlaceData
    place2: PlaceData
>>>>>>> 4565d7f4b239e4536658f79665006dfafa898898
    travelMode: google.maps.TravelMode
    children?: React.ReactNode
}

<<<<<<< HEAD
interface RenderDirectionsState {
    polyline: string
}

export type { RenderDirectionsProps, RenderDirectionsState }
=======
interface DirectionsState {
    polyline: string
}

export type { DirectionsProps, DirectionsState }
>>>>>>> 4565d7f4b239e4536658f79665006dfafa898898
