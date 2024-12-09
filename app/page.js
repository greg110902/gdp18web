"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  PolylineF,
  MarkerF,
  FORWARD_CLOSED_ARROW,
} from "@react-google-maps/api";
import pic from "./public/106.png";

export default function Home() {
  const [map, setMap] = React.useState(null);
  const [width, setWidth] = React.useState();
  const [data, setData] = React.useState(null);
  //const [height, setHeight] = React.useState()
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAs91rb9-ScOhp1A6CyZBbpR4LrUdtzeGo",
  });

  useEffect(() => {
    const fetchData = async () => {
      const d = await fetch("https://telemetry-worker.gwgh1g21.workers.dev/");

      setData(d.clone());
    };
    setWidth(window.screen.width);

    if (!data || data === null) {
      fetchData();
    }
  });

  const containerStyle = {
    width: `${width}px`,
    height: `${width * 0.75}px`,
  };

  const center = {
    lat: 50.93511631590241,
    lng: -1.3946559970412276,
  };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (data !== null) {
    console.log(JSON.stringify(data));
  }

  const FlightPath = [
    { lat: 50.937308, lng: -1.396386 },
    { lat: 50.936685, lng: -1.392481 },
    { lat: 50.931809, lng: -1.391613 },
    { lat: 50.931783, lng: -1.404183 },
    { lat: 50.937344, lng: -1.39639 },
  ];

  const svgMarker = {
    path: "M511.06,286.261c-0.387-10.849-7.42-20.615-18.226-25.356l-193.947-74.094 C298.658,78.15,285.367,3.228,256.001,3.228c-29.366,0-42.657,74.922-42.885,183.583L19.167,260.904 C8.345,265.646,1.33,275.412,0.941,286.261L0.008,311.97c-0.142,3.886,1.657,7.623,4.917,10.188 c3.261,2.564,7.597,3.684,11.845,3.049c0,0,151.678-22.359,198.037-29.559c1.85,82.016,4.019,127.626,4.019,127.626l-51.312,24.166 c-6.046,2.38-10.012,8.206-10.012,14.701v9.465c0,4.346,1.781,8.505,4.954,11.493c3.155,2.987,7.403,4.539,11.74,4.292l64.83-3.667 c2.08,14.436,8.884,25.048,16.975,25.048c8.091,0,14.877-10.612,16.975-25.048l64.832,3.667c4.336,0.246,8.584-1.305,11.738-4.292 c3.174-2.988,4.954-7.148,4.954-11.493v-9.465c0-6.495-3.966-12.321-10.012-14.701l-51.329-24.166c0,0,2.186-45.61,4.037-127.626 c46.358,7.2,198.036,29.559,198.036,29.559c4.248,0.635,8.602-0.485,11.845-3.049c3.261-2.565,5.041-6.302,4.918-10.188 L511.06,286.261z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
  };

  return isLoaded && data ? (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <Image src={pic} alt="Floating ring" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <PolylineF path={FlightPath} strokeColor={"#FC0303"} />
        <MarkerF
          position={{ lat: 50.937344, lng: -1.39639 }}
          icon={svgMarker}
          rotation={270}
          onClick={() => document.getElementById("my_modal_2").showModal()}
        />
        <></>
      </GoogleMap>
      <table class="tg" className="flex align-middle justify-center">
        <tbody>
          <tr>
            <td class="tg-c3ow">Airspeed (ms^-1)</td>
            <td class="tg-c3ow">15.8</td>
          </tr>

          <tr>
            <td class="tg-c3ow">Altitude (m)</td>
            <td class="tg-c3ow">25</td>
          </tr>
          <tr>
            <td class="tg-baqh">Heading</td>
            <td class="tg-baqh">0</td>
          </tr>
          <tr>
            <td class="tg-baqh">GPS Coordinates</td>
            <td class="tg-baqh">{"50.93511631590241, \n -1.39639"}</td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <></>
  );
}
