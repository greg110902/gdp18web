"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotInit() {
  const [data, setData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const d = await fetch("https://telemetry-worker.gwgh1g21.workers.dev/");

      setData(await d.json());
      setDataLoaded(true);
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  });

  if (dataLoaded && data !== null) {
    console.log("DATA FOUND");
    redirect("/");
  }
  return <div className="flex align-middle">No flights found.</div>;
}
