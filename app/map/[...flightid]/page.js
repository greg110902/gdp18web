"use client";

import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MarkerF, FORWARD_CLOSED_ARROW } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import pic from "/public/106.png";
import ac_marker from "/public/airplane-svgrepo-com.png";
import { redirect } from "next/navigation";
import FlightSelector from "@/app/components/flight_selector";

export default function Home() {
  const [map, setGMap] = React.useState(null);
  const [width, setWidth] = React.useState();
  const [lastItem, setLastItem] = React.useState(0);
  const [center, setCenter] = React.useState({
    lat: 50.93511631590241,
    lng: -1.3946559970412276,
  });
  const [currentPos, setCurrentPos] = React.useState();
  const [alt, setAlt] = React.useState();
  const [speed, setSpeed] = React.useState();
  const [heading, setHeading] = React.useState();
  const [data, setData] = React.useState();
  const [dataLoaded, setDataLoaded] = React.useState(false);
  //const [height, setHeight] = React.useState()
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAs91rb9-ScOhp1A6CyZBbpR4LrUdtzeGo",
  });
  const R = 6371e3;
  const { flightid } = useParams();
  console.log(flightid);
  useEffect(() => {
    const fetchData = async () => {
      const d = await fetch("https://telemetry-worker.gwgh1g21.workers.dev/");

      setData(await d.json());
      setDataLoaded(true);
    };
    setWidth(window.screen.width);

    setTimeout(() => {
      fetchData();
      if (dataLoaded) {
        setLastItem(data.length - 1);
        var FlightPath = [];
        data.forEach((element) => {
          FlightPath.push({ lat: element["lat"], lng: element["long"] });
        });
        const line = new google.maps.Polyline({
          path: FlightPath,
          strokeColor: "#FC0303",
        });

        line.setMap(map);
        setAlt(data[lastItem]["alt"]);
        setCurrentPos({
          lat: data[lastItem]["lat"],
          long: data[lastItem]["long"],
        });
        setHeading(data[lastItem]["head"]);
      }

      console.log("CALCULATING LATS");

      if (dataLoaded) {
        var lat1 = (data[lastItem - 1]["lat"] * Math.PI) / 180;
        var lat2 = (data[lastItem]["lat"] * Math.PI) / 180;
        var long1 = (data[lastItem - 1]["long"] * Math.PI) / 180;
        var long2 = (data[lastItem]["long"] * Math.PI) / 180;

        console.log(data[lastItem - 1]["lat"]);

        var d_phi = lat2 - lat1;
        var d_lambda = long2 - long1;

        var a =
          Math.sin(d_phi / 2) * Math.sin(d_phi / 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(d_lambda / 2) *
            Math.sin(d_lambda / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        setSpeed(
          (
            (1000 * R * c) /
            (data[lastItem]["time"] - data[lastItem - 1]["time"])
          ).toFixed(2)
        );
      }
    }, 1000);
  }, [data, width, dataLoaded]);

  const containerStyle = {
    width: `${width}px`,
    height: `${width * 0.75}px`,
  };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);

    setGMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setGMap(null);
  }, []);

  var connectedSats = 5;

  if (dataLoaded) {
    console.log(data);
  }

  if (isLoaded && map !== null) {
    map.setCenter(map.getCenter());
    console.log(JSON.stringify(currentPos));
  }
  //if (isLoaded && dataLoaded && data == null) {
  //redirect("/flight-not-initiated", "replace");
  //}

  console.log(`FlightID before component ${flightid[0]}`);

  return isLoaded && dataLoaded ? (
    <>
      <Head>
        <title>GDP18 Website</title>
      </Head>
      <dialog id="my_modal_2" className="modal bg-white">
        <div className="modal-box bg-slate-300">
          <Image src={pic} alt="Floating ring" />
          <div className="flex justify-center align-middle text-black pt-3">
            Confidence = 0.86
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {dataLoaded ? <>{JSON.stringify(data[1])}</> : <></>}
      <FlightSelector
        ultimatePoint={data[lastItem]}
        penultimatePoint={data[lastItem - 1]}
        flightid={parseInt(flightid[0])}
      ></FlightSelector>
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <MarkerF
          position={{ lat: data[lastItem]["lat"], lng: data[lastItem]["long"] }}
          icon={{
            url: "/airplane-svgrepo-com.svg",
            scaledSize: new google.maps.Size(25, 25),
            rotation: 41.45,
            anchor: new google.maps.Point(12.5, 12.5),
          }}
        />
        <MarkerF
          position={{ lat: 50.931809, lng: -1.391613 }}
          onClick={() => document.getElementById("my_modal_2").showModal()}
        />
        <></>
      </GoogleMap>
      <table class="tg" className="flex align-middle justify-center">
        <tbody className="text-black border shadow my-5 P-2">
          <tr className="border">
            <td class="tg-c3ow">Airspeed (ms^-1)</td>
            <td class="tg-c3ow" className="flex justify-center align-middle">
              {dataLoaded ? speed : <></>}
            </td>
          </tr>

          <tr className="border">
            <td class="tg-c3ow">Altitude (m)</td>
            <td class="tg-c3ow" className="flex justify-center align-middle">
              {alt}
            </td>
          </tr>
          <tr className="border">
            <td class="tg-baqh">Heading</td>
            <td class="tg-baqh" className="flex justify-center align-middle">
              {heading}
            </td>
          </tr>
          <tr className="border">
            <td class="tg-baqh">GPS Coordinates</td>
            <td class="tg-baqh" className="flex justify-center align-middle">
              {dataLoaded ? (
                `${data[lastItem]["lat"]}, ${data[lastItem]["long"]}`
              ) : (
                <></>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="justify-end m-2 rounded shadow p-2">
        <div
          className={`${
            connectedSats > 3 ? "text-green-600" : "text-red-600"
          } justify-end`}
        >
          {connectedSats}
        </div>
        <img
          src="https://gdp18web.pages.dev/radio-svgrepo-com.svg"
          className="justify-end"
          alt="gps"
          fill={`${connectedSats > 3 ? "green" : "red"}`}
          color={`${connectedSats > 3 ? "green" : "red"}`}
          width={25}
          height={25}
        ></img>
      </div>
    </>
  ) : (
    <></>
  );
}

export const runtime = "edge";
