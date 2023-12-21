import { Libraries } from "@react-google-maps/api";

const libsArr : Libraries = ["places"];

const radius = 1500;

enum EPlaces {
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
  zoo,
}

const routeColors = ["blue", "darkcyan", "dodgerblue", "deepskyblue", "mediumturquoise", "lightskyblue", "midnightblue", "paleturquoise", "royalblue", "cyan"]

const hexVals = "0123456789ABCDEF"

enum TravelMode {
    BICYCLING = 'BICYCLING',
    DRIVING = 'DRIVING',
    TRANSIT = 'TRANSIT',
    WALKING = 'WALKING',
}

const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";

const placeKeys = (Object.keys(EPlaces) as (keyof typeof EPlaces)[]).filter(
  (val) => {
    return isNaN(Number(val));
  },
);

const travelModeKeys = (Object.keys(TravelMode) as (keyof typeof TravelMode)[]).filter(
  (val) => {
    return isNaN(Number(val));
  },
);

export { libsArr,radius, pinSVGFilled, EPlaces, placeKeys, TravelMode, travelModeKeys, routeColors, hexVals };
