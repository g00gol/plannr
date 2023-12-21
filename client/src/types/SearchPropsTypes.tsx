import { CircleData } from "../dataObjects/CircleData";
import { PlaceData } from "../dataObjects/PlaceData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";

export default interface SearchProps {
  centerData: google.maps.LatLng | google.maps.LatLngLiteral;
  setCenterData: React.Dispatch<
    React.SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral>
  >;
  circleData: CircleData | undefined;
  setCircleData: React.Dispatch<React.SetStateAction<CircleData | undefined>>;
  resultsToggle: boolean;
  toggleResults: React.Dispatch<React.SetStateAction<boolean>>;
  placeData: Array<PlaceData>;
  setPlaceData: React.Dispatch<React.SetStateAction<Array<PlaceData>>>;
  tripToggle: boolean;
  toggleTrip: React.Dispatch<React.SetStateAction<boolean>>;
  markerData: Array<PlanMarkerData>;
  setMarkerData: React.Dispatch<React.SetStateAction<Array<PlanMarkerData>>>;
  typeData: string;
  setTypeData: React.Dispatch<React.SetStateAction<string>>;
  keyWordData: string;
  setKeyWordData: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  currentTrip: Array<PlaceData>;
}
