import { Circle, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import 'react-simple-typewriter/dist/index';
import { CircleData } from "../dataObjects/CircleData";
import { PlanMarkerData } from "../dataObjects/PlanMarkerData";
import { ResultsData } from "../dataObjects/ResultsData";
import { HomeProps } from "../types/HomeTypes";
import Navbar from "./Navbar";
import { ResultsCard } from "./ResultsCard";

const DEFAULT_RADIUS = 1500;
enum PLACES_TYPES {
	none,
	accounting,
	airport,
	amusement_park,
	aquarium,
	art_gallery,
	atm,
	bakery,
	bank,
	bar,
	beauty_salon,
	bicycle_store,
	book_store,
	bowling_alley,
	bus_station,
	cafe,
	campground,
	car_dealer,
	car_rental,
	car_repair,
	car_wash,
	casino,
	cemetery,
	church,
	city_hall,
	clothing_store,
	convenience_store,
	courthouse,
	dentist,
	department_store,
	doctor,
	drugstore,
	electrician,
	electronics_store,
	embassy,
	fire_station,
	florist,
	funeral_home,
	furniture_store,
	gas_station,
	gym,
	hair_care,
	hardware_store,
	hindu_temple,
	home_goods_store,
	hospital,
	insurance_agency,
	jewelry_store,
	laundry,
	lawyer,
	library,
	light_rail_station,
	liquor_store,
	local_government_office,
	locksmith,
	lodging,
	meal_delivery,
	meal_takeaway,
	mosque,
	movie_rental,
	movie_theater,
	moving_company,
	museum,
	night_club,
	painter,
	park,
	parking,
	pet_store,
	pharmacy,
	physiotherapist,
	plumber,
	police,
	post_office,
	primary_school,
	real_estate_agency,
	restaurant,
	roofing_contractor,
	rv_park,
	school,
	secondary_school,
	shoe_store,
	shopping_mall,
	spa,
	stadium,
	storage,
	store,
	subway_station,
	supermarket,
	synagogue,
	taxi_stand,
	tourist_attraction,
	train_station,
	transit_station,
	travel_agency,
	university,
	veterinary_care,
	zoo
}
const keys = (Object.keys(PLACES_TYPES) as (keyof typeof PLACES_TYPES)[]).filter((val) => {return isNaN(Number(val))});
const underScoreRegex = new RegExp('_', 'g');

function Home(props: HomeProps): React.ReactElement {
	const mapRef = useRef<google.maps.Map>();
	const [centerData, setCenterData] = useState<google.maps.LatLng | google.maps.LatLngLiteral>({lat: 40.74273, lng: -74.038});
	const [circleData, setCircleData] = useState<CircleData>();
	const [resultsToggle, toggleResults] = useState(false);
	const [resultsData, setresultsData] = useState<Array<ResultsData>>([]);
	const [markerData, setMarkerData] = useState<Array<PlanMarkerData>>([]);
	const [typeData, setTypeData] = useState<string>("");
	const [keyWordData, setKeyWordData] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");
	const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: String(import.meta.env.VITE_MAPS_API_KEY),
		libraries:["places"]
	})

	const onLoad = useCallback((map : google.maps.Map) => {
		setCircleData(undefined);
		setresultsData([]);
		setMarkerData([]);
		mapRef.current = map;
	}, []);

	const search = ((event : FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSearchText(event.currentTarget.searchBar.value);
		setKeyWordData(event.currentTarget.searchBar.value);
		setTypeData(event.currentTarget.categories.value)
		setCircleData(undefined);
		setresultsData([]);
		setMarkerData([]);

		const center = mapRef.current?.getCenter();
		if(center){
			setCenterData(center);
			setCircleData(new CircleData(centerData, DEFAULT_RADIUS))
		}

		toggleResults(true);
	});

	useEffect(() => {
		async function fetchData() {
			try {
				if(mapRef && mapRef.current){
					setresultsData([]);
					const placesService = new google.maps.places.PlacesService(mapRef.current);
					placesService.nearbySearch({
						location: centerData,
						radius: circleData? circleData.radius : DEFAULT_RADIUS,
						//openNow: true,
						keyword: keyWordData.trim(),
						type: typeData.toUpperCase().trim() == "NONE" ? undefined : typeData.trim()
					}, (res, status) => {
						if(status === google.maps.places.PlacesServiceStatus.OK && res !== null){
							console.log(res);
							const data : Array<ResultsData> = res.map((r) => {
								const isOpen = r.opening_hours?.isOpen();
								const location = r.geometry?.location;
								const name = r.name ? r.name : "Invalid Name";
								const priceLevel = r.price_level;
								const rating = r.rating;
								const ratingsTotal = r.user_ratings_total;

								return new ResultsData(
									name,
									r.vicinity ? r.vicinity : "Invalid Address",
									priceLevel ? priceLevel : undefined,
									rating ? rating : undefined,
									ratingsTotal ? ratingsTotal : undefined,
									isOpen ? isOpen : false,
									location ? new PlanMarkerData(name, location) : undefined,
									r.photos ? r.photos[0] : undefined
								)
							});
							setresultsData([...data]);

							//console.log(data);
						}
					})
				}
			} catch (e) {
				console.log(e);
			}
		}
		if(resultsToggle) {
			fetchData();
		}
	}, [keyWordData, centerData]);

	return (
		<div className="flex flex-col h-screen">
            {props.children /* modal */} 
			<Navbar/>
			{ 	isLoaded ?
				<div className="flex flex-grow">
					<GoogleMap 
						mapContainerStyle={{width: '100vw'}}
						center={centerData}
						zoom={15} 
						id={"TEST_MAP"}
						onLoad={onLoad}
					>
						<form className="flex justify-center" onSubmit={search}>
							<input
								type="search"
								id="searchBar"
								name="searchBar"
								placeholder="Search Plannr ... Need inspiration? Use the dropdown to filter by category."
								className="z-10 opacity-90 block m-3 w-3/6 p-4 ps-10 text-lg border border-gray-600 rounded-xl bg-gray-40 p-50"
								>
							</input>
							<select
								name="categories"
								id="categories"
								className="z-10 opacity-90 block m-3 w-1/8 p-4 ps-10 text-lg border border-gray-600 rounded-xl bg-gray-40 p-50">
								{
									keys.map((key) => {
										const val = PLACES_TYPES[key]
										const text = (key[0].toUpperCase() + key.substring(1, key.length)).replace(underScoreRegex, ' ')
										return <option id={val.toString()} value={key}>
											{text}
										</option>
									})
								}
							</select>
						</form>
						{ 	resultsToggle &&
							<aside
								id="searchResults"
								className="fixed pb-10 pl-10 opacity-90 top-inherit left-inherit ml-2 z-20 h-4/5 w-1/3 load-slide-fast rounded-lg shadow-md"
								>
								<div className="flex flex-col z-20 h-full bg-white dark:bg-gray-150 rounded-lg shadow-md">
									<div className="px-5 py-4 flex justify-between">
										<h2 className="text-2xl font-bold pt-2 text-blue-500">Search Results</h2>
										<button
											type="button"
											className="hover:text-red-500 font-bold rounded-md text-md px-4 py-2 text-center"
											onClick={() => toggleResults(!resultsToggle)}>X</button>
									</div>
									<h3 className="text-1xl px-5"><span className="font-bold">Number of Results{searchText ? ` for "${searchText}"` : ""}</span>: {resultsData.length}</h3>
									<ul className="px-3 py-4 flex-grow overflow-y-scroll">
										{
											resultsData.map((result) => {
												return <ResultsCard key={result.addr} title={result.title} addr={result.addr} isOpen={result.isOpen} img={result.img?.getUrl()} rating={result.rating} priceLevel={result.priceLevel} ratingsTotal={result.ratingsTotal}/>;
											})
										}
									</ul>
								</div>
							</aside>
						}
						{
							markerData.map((result) => {
								return <Marker key={`(${result.location.lat()}, ${result.location.lng()})`} title={result.title} position={result.location}/>;
							})
						}
						{
							circleData &&
							<Circle
								center={centerData}
								radius={circleData.radius}
								options={{
									strokeColor: "#FF0000",
									strokeOpacity: 0.8,
									strokeWeight: 2,
									fillColor: "#FF0000",
									fillOpacity: 0.35,
								}}
							/>
						}
						{
							resultsData.map((result) => {
								if(result.marker){
									return <Marker key={`(${result.marker.location.lat()}, ${result.marker.location.lng()})`} title={result.marker.title} position={result.marker.location} icon={{
										path: pinSVGFilled,
										anchor: new google.maps.Point(12,17),
										fillOpacity: 1,
										fillColor: "lightblue",
										strokeWeight: 2,
										strokeColor: "gray",
										scale: 2
									}}/>;
								}
							})
						}
					</GoogleMap>
				</div> :
				<div>Loading...</div>
			}
		</div>
	);
}

export default Home;
