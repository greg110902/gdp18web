"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  PolylineF,
  MarkerF,
  FORWARD_CLOSED_ARROW,
} from "@react-google-maps/api";
import pic from "/public/106.png";
import ac_marker from "/public/airplane-svgrepo-com.png";

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
          icon={{
            url: "/public/airplane-svgrepo-com.svg",
            scale: 5,
          }}
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
