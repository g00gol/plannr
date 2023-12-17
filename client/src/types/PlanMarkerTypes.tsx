interface PlanMarkerProps {
  title?: string;
  latitude?: number;
  longitude?: number;
}

interface PlanMarkerState {
  title: string;
  location: google.maps.LatLng;
}

export type { PlanMarkerProps, PlanMarkerState };
