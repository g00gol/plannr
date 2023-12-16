interface PlaceCardProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    place_id: string
    title: string
    isOpen: boolean | undefined
    addr: string
    rating?: number | undefined
    ratingsTotal?: number | undefined
    priceLevel?: number | undefined
    img?: string
    isResult?: boolean
}

interface PlaceCardState {
    showDetails: boolean,
    phone: string,
    website: string
    hours: string[] | undefined
    date: number
}

export type { PlaceCardProps, PlaceCardState }
