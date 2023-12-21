import React from "react";

import { PlaceData } from "../../dataObjects/PlaceData";
import { PlanMarkerData } from "../../dataObjects/PlanMarkerData";
import { CircleData } from "../../dataObjects/CircleData";
import { radius as DEFAULT_RADIUS } from "../../constants/GoogleMaps/config";

export default function nearbySearch(
  mapRef: React.RefObject<any>,
  centerData: google.maps.LatLng | google.maps.LatLngLiteral,
  circleData: CircleData | undefined,
  keyWordData: string,
  typeData: string,
  setPlaceData: React.Dispatch<React.SetStateAction<PlaceData[]>>,
) {
  if (mapRef && mapRef.current) {
    setPlaceData([]);
    const placesService = new google.maps.places.PlacesService(mapRef.current);
    placesService.nearbySearch(
      {
        location: centerData,
        radius: circleData ? circleData.radius : DEFAULT_RADIUS,
        //openNow: true,
        keyword: keyWordData.trim(),
        type:
          typeData.toUpperCase().trim() == "NONE" ? undefined : typeData.trim(),
      },
      (res, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          res !== null
        ) {
          const data: Array<PlaceData> = res.filter((r) => {
            return r.geometry && r.geometry.location && circleData && google.maps.geometry.spherical.computeDistanceBetween(r.geometry.location, centerData) < circleData.radius;
          }).map((r) => {

            const placeId = r.place_id!;
            const name = r.name ? r.name : "Invalid Name";
            const address = r.vicinity ? r.vicinity : "Invalid Address";
            const isOpen = r.opening_hours?.isOpen();
            const location = r.geometry?.location;
            const priceLevel = r.price_level;
            const rating = r.rating;
            const ratingsTotal = r.user_ratings_total;
            const thumbnail = r.photos ? r.photos[0] : undefined;

            return new PlaceData(
              placeId,
              name,
              address,
              priceLevel ? priceLevel : undefined,
              rating ? rating : undefined,
              ratingsTotal ? ratingsTotal : undefined,
              isOpen ? isOpen : false,
              location ? new PlanMarkerData(name, location) : undefined,
              thumbnail,
            );
          });
          setPlaceData([...data]);
        }
      },
    );
  }
}
