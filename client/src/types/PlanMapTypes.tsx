import { PlanLineProps } from "./PlanLineTypes"

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

export type { PlanMapProps, PlanMapState }