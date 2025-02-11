import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FlightSelector(
  ultimatePoint,
  penultimatePoint,
  flightid
) {
  const [flightID, setFlightID] = useState();
  const router = useRouter();

  useEffect(() => {
    
  })
  if (flightID)

  setFlightID(flightid);

  console.log(`flightID ${flightid}`);

  function incrementID() {
    setFlightID(flightID + 1);
    router.push(`/maps/${flightID}`);
  }
  function decrementID() {
    setFlightID(flightID - 1);
    router.push(`/maps/${flightID}`);
  }

  var lat1 = (penultimatePoint["lat"] * Math.PI) / 180;
  var lat2 = (ultimatePoint["lat"] * Math.PI) / 180;
  var long1 = (penultimatePoint["long"] * Math.PI) / 180;
  var long2 = (ultimatePoint["long"] * Math.PI) / 180;

  var d_phi = lat2 - lat1;
  var d_lambda = long2 - long1;

  return (
    <div>
      <button className="btn" onClick={decrementID()}>
        {"<"}
      </button>
      <>{flightID}</>
      <button className="btn" onClick={incrementID()}>
        {">"}
      </button>
    </div>
  );
}
