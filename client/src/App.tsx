import React, {useState, useEffect, useRef, useCallback, FormEvent}from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { useJsApiLoader } from '@react-google-maps/api'
import { SidebarCard } from "./components/SidebarCard";
import { SidebarData } from "./dataObjects/SidebarData";
import { PlanMarkerData } from "./dataObjects/PlanMarkerData";
import { CircleData } from "./dataObjects/CircleData";

const DEFAULT_RADIUS = 1500;

function App(): React.ReactElement {
  const mapRef = useRef<google.maps.Map>();
  const [centerData, setCenterData] = useState<google.maps.LatLng | google.maps.LatLngLiteral>({lat: 40.74273, lng: -74.038});
  const [circleData, setCircleData] = useState<CircleData>();
  const [sideBarToggle, toggleSideBar] = useState(false);
  const [sideBarData, setSideBarData] = useState<Array<SidebarData>>([]);
  const [markerData, setMarkerData] = useState<Array<PlanMarkerData>>([]);
  const [keyWordData, setKeyWordData] = useState<string>("");
  const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(import.meta.env.VITE_MAPS_API_KEY),
    libraries:["places"]
  })

  const onLoad = useCallback((map : google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const search = ((event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyWordData(event.currentTarget.searchBar.value);
    setCircleData(undefined);

    const center = mapRef.current?.getCenter();
    if(center){
      setCenterData(center);
      setCircleData(new CircleData(centerData, DEFAULT_RADIUS))
    }

    toggleSideBar(true);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        if(mapRef && mapRef.current){
          setSideBarData([]);
            const placesService = new google.maps.places.PlacesService(mapRef.current);
            placesService.nearbySearch({
              location: centerData,
              radius: circleData? circleData.radius : DEFAULT_RADIUS,
              //openNow: true,
              keyword: keyWordData.trim(),
            }, (res, status) => {
              if(status === google.maps.places.PlacesServiceStatus.OK && res !== null){
                const data : Array<SidebarData> = res.map((r) => {
                  const isOpen = r.opening_hours?.isOpen();
                  const location = r.geometry?.location;
                  const name = r.name ? r.name : "Invalid Name";

                  return new SidebarData(
                    name, 
                    r.vicinity ? r.vicinity : "Invalid Address",  
                    isOpen ? isOpen : false,
                    location ? new PlanMarkerData(name, location) : undefined,
                    r.photos ? r.photos[0] : undefined
                    )
                });
                setSideBarData([...data]);
              }
            })
        }

      } catch (e) {
        console.log(e);
      }
    }

    if(sideBarToggle) {
      fetchData();
    }

  }, [keyWordData, centerData]);

  /*useEffect(() => {
    async function fetchData() {
      try {
        //const data = await getSearchData(blahblahblah);
        const data = [
          new PlanMarkerData(
              "TEST_POINT",
              new google.maps.LatLng(40.74273, -74.038)
              ),
        ]
        setMarkerData([...data]);

      } catch (e) {
        console.log(e);
      }
    }
    
    fetchData();

  }, [isLoaded]);*/
  return isLoaded ?
  <div>
    <GoogleMap 
            mapContainerStyle={
                {
                    width: '100vw',
                    height: '100vh'
                }
            }
            center={centerData}
            zoom={15} 
            id={"TEST_MAP"}
            onLoad={onLoad}
        >
    <form className="flex justify-center " onSubmit={search}>
          <input 
              type="search" 
              id="searchBar" 
              name="searchBar"
              placeholder="Search Plannr"
              className="z-10 opacity-90 block m-3 w-4/6 p-4 ps-10 text-lg border border-gray-600 rounded-xl bg-gray-40 p-50"
              >
          </input>
    </form>
    { sideBarToggle ?
        <aside 
            id="searchResults"
            className="fixed opacity-80 top-0 left-0 z-20 w-1/6 h-screen transition-transform -translate-x-full sm:translate-x-0"
            >
            <div className="z-20 h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-150">
              <div className="pb-5 flex justify-between">
                <h2 className="text-2xl font-bold">Plannr</h2>
                <button 
                    type="button" 
                    className="text-white bg-red-700 hover:bg-red-600 font-bold rounded-md text-md px-4 py-2 text-center"
                    onClick={() => toggleSideBar(!sideBarToggle)}>X</button>
              </div>
              <ul className="space-y-[10%]">
                {
                  sideBarData.map((result) => {
                    return <SidebarCard title={result.title} addr={result.addr} isOpen={result.isOpen} img={result.img?.getUrl()}/>;
                  })
                }
              </ul>
            </div>
        </aside>
        : <></> }
        {
          markerData.map((result) => {
            return <Marker title={result.title} position={result.location}/>;
          })
        }
        {
          circleData 
          ? <Circle
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
          : <></>
        }
        {
          sideBarData.map((result) => {
            if(result.marker){
              return <Marker title={result.marker.title} position={result.marker.location} icon={{  
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
  </div>
  : <></>;
}

export default App;
