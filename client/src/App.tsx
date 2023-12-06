import React, {useState, useEffect, useRef, useCallback, FormEvent}from "react";
import { PlanMap } from "./components/PlanMap";
import { PlanMarker } from "./components/PlanMarker";
import { GoogleMap, Libraries, Marker } from "@react-google-maps/api";
import { useJsApiLoader } from '@react-google-maps/api'
import { SidebarCard } from "./components/SidebarCard";
import { SidebarData } from "./dataObjects/SidebarData";
import { PlanLine } from "./components/PlanLine";
import { PlanMarkerData } from "./dataObjects/PlanMarkerData";
import axios from "axios";


function App(): React.ReactElement {
  const mapRef = useRef<HTMLDivElement | google.maps.Map>();
  const [sideBarToggle, toggleSideBar] = useState(false);
  const [sideBarData, setSideBarData] = useState<Array<SidebarData>>([]);
  const [markerData, setMarkerData] = useState<Array<PlanMarkerData>>([]);
  const [keyWordData, setKeyWordData] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(import.meta.env.VITE_MAPS_API_KEY),
    libraries:["places"]
  })

  const onLoad = useCallback((map : HTMLDivElement | google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const search = ((event : FormEvent<HTMLFormElement>) => {
    console.log(keyWordData)
    event.preventDefault();
    setKeyWordData(event.currentTarget.searchBar.value)
    toggleSideBar(true);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        if(mapRef && mapRef.current){
          setSideBarData([]);
            const placesService = new google.maps.places.PlacesService(mapRef.current)
            placesService.nearbySearch({
              location: new google.maps.LatLng(40.74273, -74.038),
              radius: 1500,
              rankBy: google.maps.places.RankBy.PROMINENCE,
              openNow: true,
              keyword: keyWordData,
            }, (res, status) => {
              if(status === google.maps.places.PlacesServiceStatus.OK && res !== null){
                const data : Array<SidebarData> = res.map((r) => {
                  const isOpen = r.opening_hours?.isOpen();
                  const location = r.geometry?.location;
                  const name = r.name ? r.name : "Invalid Name";
                  console.log(r)

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

  }, [isLoaded, keyWordData]);

  useEffect(() => {
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

  }, [isLoaded]);

  return isLoaded ?
  <div>
    <GoogleMap 
            mapContainerStyle={
                {
                    width: '100vw',
                    height: '100vh'
                }
            } 
            center={
                {
                    lat: 40.74273, 
                    lng: -74.038
                }
            } 
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
          sideBarData.map((result) => {
            if(result.marker){
              return <Marker title={result.marker.title} position={result.marker.location}/>;
            }
          })
        }
        <Marker title="TEST_POINT4" position={new google.maps.LatLng(40.74263,-74.048)}/>
        <PlanMarker title="TEST_POINT3" longitude={40.74273} latitude={-74.038}/>
        <PlanLine 
        place1={new PlanMarkerData("TEST_POINT", new google.maps.LatLng(40.74691667, -74.025805))}
        place2={new PlanMarkerData("TEST_POINT2", new google.maps.LatLng(40.74272 , -74.0271))}
        travelMode="WALKING"
      />
    </GoogleMap>
  </div>
  : <></>;
}

export default App;
