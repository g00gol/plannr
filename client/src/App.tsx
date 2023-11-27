import React, {useState, useEffect}from "react";
import { PlanMap } from "./components/PlanMap";
import { PlanMarker } from "./components/PlanMarker";
import { Marker, useJsApiLoader } from '@react-google-maps/api'
import testImage from './assets/testImage.jpeg'

const elemId = "TEST_MAP";

function App(): React.ReactElement {

  //const map : PlanMap = <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556}></PlanMap>;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.MAPS_API)
  })

  return isLoaded ?
  <div>
    <PlanMap id={elemId} latitude={40.74691667} longitude={-74.02580556} zoom={15}>
    <form>
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
    <aside 
        id="searchResults"
        className="fixed opacity-80 top-0 left-0 z-20 w-1/6 h-screen transition-transform -translate-x-full sm:translate-x-0"
        >
        <div className="z-20 h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-150">
          <ul className="space-y-[10%]">
            <li>
              <div className="grid grid-flow-col grid-rows-2 gap-4">
                <div className="row-span-2">
                  <p className="text-lg font-bold">Title</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row-span-2 col-span-1">
                  <img className="object-scale-down rounded-lg" src={testImage}/>
                </div>
              </div>
            </li>
            <li>
              <div className="grid grid-flow-col grid-rows-2 gap-4">
                <div className="row-span-2">
                  <p className="text-lg font-bold">Title 2</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row-span-2 col-span-1">
                  <img className="object-scale-down rounded-lg" src={testImage}/>
                </div>
              </div>
            </li>
            <li>
              <div className="grid grid-flow-col grid-rows-2 gap-4">
                <div className="row-span-2">
                  <p className="text-lg font-bold">Title 3</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row-span-2 col-span-1">
                  <img className="object-scale-down rounded-lg" src={testImage}/>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </aside>
      <PlanMarker title={"TEST_POINT"} latitude={40.74691667} longitude={-74.02580556}></PlanMarker>
      <PlanMarker title={"TEST_POINT_2"} latitude={40.74272} longitude={-74.02710}></PlanMarker>
    </PlanMap>
  </div>
  : <></>;
}

export default App;
