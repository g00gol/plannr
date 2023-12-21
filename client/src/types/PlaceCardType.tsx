import { PlaceData } from "../dataObjects/PlaceData";

interface PlaceCardProps {
  place: PlaceData;
  isResult: boolean;
  index?: number;
  children?: React.ReactNode
}

interface PlaceCardState {
  showDetails: boolean;
  phone: string;
  website: string;
  hours: string[] | undefined;
  date: number;
}

export type { PlaceCardProps, PlaceCardState };
