"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

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

      setData(d);
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

  return isLoaded && data ? (
    <>
      <div>{JSON.stringify(data)}</div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
