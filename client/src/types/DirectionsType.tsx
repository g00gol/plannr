interface RenderDirectionsProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    travelMode: google.maps.TravelMode
    children?: React.ReactNode
}

interface RenderDirectionsState {
    polyline: string
}

export type { RenderDirectionsProps, RenderDirectionsState }
