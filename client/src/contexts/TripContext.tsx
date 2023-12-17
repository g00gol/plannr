import React, { useState, useContext, useEffect } from "react";
import { PlaceData } from "../dataObjects/PlaceData";
import { AuthContext } from "./AuthContext";


interface TripContextType {
  currentTrip: PlaceData[];
	tripName: string;
	setTripName: (name: string) => void;
  addPlace: (place: PlaceData) => void;
  removePlace: (place: PlaceData) => void;
}

export const TripContext = React.createContext<TripContextType>(null!);

// create functions for mutating tripcontext here; will use replace instead of mutation for statefulness
export const TripProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [tripName, setTripName] = useState<string>("My Trip");
	const [currentTrip, setCurrentTrip] = useState<PlaceData[]>([]);
  const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    // load trip from user if user has trip in session
		// currentTrip.place_ids.forEach(async (place_id) => {
		// 	const request = {
		// 		placeId: place_id,
		// 		fields: ["name", "vicinity", "place_id", "opening_hours", "geometry", "price_level", "rating", "user_ratings_total", "photos"]
		// 	};

		// 	 placesService.getDetails(request, (place, status) => {
		// 		if (status === google.maps.places.PlacesServiceStatus.OK && place != null){
		// 			console.log(place)
		// 			const place_id = place.place_id;
		// 			const name = place.name ? place.name : "Invalid Name";
		// 			const address = place.vicinity ? place.vicinity : "Invalid Address";
		// 			const isOpen = place.opening_hours?.isOpen();
		// 			const location = place.geometry?.location;
		// 			const priceLevel = place.price_level;
		// 			const rating = place.rating;
		// 			const ratingsTotal = place.user_ratings_total;
		// 			const thumbnail = place.photos ? place.photos[0] : undefined	
		// 			setTripData([...tripData, new PlaceData(
		// 				place_id,
		// 				name,
		// 				address,
		// 				priceLevel ? priceLevel : undefined,
		// 				rating ? rating : undefined,
		// 				ratingsTotal ? ratingsTotal : undefined,
		// 				isOpen ? isOpen : false,
		// 				location ? new PlanMarkerData(name, location) : undefined,
		// 				thumbnail
		// 			)])
		// 		}
		// 	});
		// });
  }, []);

    //   TODO: make currentTrip array of PlaceData and update one by one here. So we don't have to leave it to Home to fetch all the data at once and have it be spaghetti code; more reactive, one by one changes.
  const addPlace = (place: PlaceData) => {
		//add placeid to user's trip
    setCurrentTrip([...currentTrip, place]);
  };

  const removePlace = (place: PlaceData) => {
		const filtered = currentTrip.filter((p) => p.place_id !== place.place_id);
    setCurrentTrip(filtered);
  };

  return (
    <TripContext.Provider value={{ currentTrip, tripName, setTripName, addPlace, removePlace }}>
      {children}
    </TripContext.Provider>
  );
};
