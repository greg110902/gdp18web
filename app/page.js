import Image from "next/image";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export default function Home() {
  const [map, setMap] = React.useState(null)
  const {isLoaded} = useJsApiLoader({id:"google-map-script", googleMapsApiKey: "AIzaSyAs91rb9-ScOhp1A6CyZBbpR4LrUdtzeGo"})

  const containerStyle = {
    width: '400px',
    height: '400px',
  }
  
  const center = {
    lat: -3.745,
    lng: -38.523,
  }
  
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}
