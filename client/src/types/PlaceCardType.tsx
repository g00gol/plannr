interface PlaceCardProps {
    place_id: string | undefined
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
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
