interface PlaceCardProps {
    place_id: string | undefined
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

}

export type { PlaceCardProps, PlaceCardState }
