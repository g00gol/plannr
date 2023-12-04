import { PlanMarkerProps } from "./PlanMarkerTypes"

interface PlanLineProps {
    place1?: PlanMarkerProps
    place2?: PlanMarkerProps
    travelMode: string
}

interface PlanLineState {
    place1: PlanMarkerProps
    place2: PlanMarkerProps
}

export type { PlanLineProps, PlanLineState }