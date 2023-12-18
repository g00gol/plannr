interface DirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    travelMode: google.maps.TravelMode
    children?: React.ReactNode
}

interface DirectionsState {
    polyline: string
}

export type { DirectionsProps, DirectionsState }
