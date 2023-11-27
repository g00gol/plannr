import React, {useState, useEffect}from "react";
import { PlanMap } from "./components/PlanMap";
import { PlanMarker } from "./components/PlanMarker";
import { useJsApiLoader } from '@react-google-maps/api'
import { SidebarCard } from "./components/SidebarCard";
import { SidebarData } from "./dataObjects/SidebarData";

const elemId = "TEST_MAP";

function App(): React.ReactElement {
  const [sideBarToggle, toggleSideBar] = useState(false);
  const [sideBarData, setSideBarData] = useState<Array<SidebarData>>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  const search = ((event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleSideBar(true);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        //const data = await getSearchData(blahblahblah);
        const data = [
          new SidebarData(
              "Title", 
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "1234 Address Blvd",
              false
              ),
          new SidebarData(
              "Title2",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "123 Gay Street",
              true
              ),
          new SidebarData(
              "Title 3",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "12 Frog Avenue",
              false
          )
        ]
        setSideBarData([...data]);

      } catch (e) {
        console.log(e);
      }
    }

    if(sideBarToggle) {
      fetchData();
    }

  }, [isLoaded, sideBarToggle]);

  return isLoaded ?
  <div>
    <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556} zoom={15}>
    <form onSubmit={search}>
      <div className="flex justify-center ">
          <input 
              type="search" 
              id="searchBar" 
              placeholder="Search Plannr"
              className="z-10 opacity-90 block m-3 w-4/6 p-4 ps-10 text-lg border border-gray-600 rounded-xl bg-gray-40 p-50"
              >
          </input>
        </div>
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
                    return <SidebarCard title={result.title} desc={result.desc} addr={result.addr} isOpen={result.isOpen}/>;
                  })
                }
              </ul>
            </div>
        </aside>
        : <></> }
      <PlanMarker title={"TEST_POINT"} latitude={40.74691667} longitude={-74.02580556}></PlanMarker>
      <PlanMarker title={"TEST_POINT_2"} latitude={40.74272} longitude={-74.02710}></PlanMarker>
    </PlanMap>
  </div>
  : <></>;
}

export default App;
