interface SearchResProps {
    mapRef: React.MutableRefObject<google.maps.Map | undefined>
    placeId: string
    title: string
    isOpen: boolean | undefined
    addr: string
    rating?: number | undefined
    ratingsTotal?: number | undefined
    priceLevel?: number | undefined
    img?: string
}

interface SearchResState {
    showDetails: boolean,
    phone: string,
    website: string
    hours: string[] | undefined
}

export type { SearchResProps, SearchResState }
