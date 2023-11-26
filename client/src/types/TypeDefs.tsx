interface PlanMarkerProps {
    title?: string
    latitude?: number
    longitude?: number
}

interface PlanMarkerState {
    title: string,
    location : google.maps.LatLng
}

interface PlanLineProps {
    place1?: PlanMarkerProps
    place2?: PlanMarkerProps
    travelMode: string
}

interface PlanLineState {
    place1: PlanMarkerProps
    place2: PlanMarkerProps
}

interface PlanMapProps {
    id: string
    latitude: number
    longitude: number
    zoom?: number
    children: React.ReactNode
}

interface PlanMapState {
    lines : PlanLineProps[]
}

export type {PlanMarkerProps, PlanMarkerState, PlanLineProps, PlanLineState, PlanMapProps, PlanMapState} 