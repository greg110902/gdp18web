import { useState, useEffect } from "react";

export default function FlightSelector(ultimatePoint, penultimatePoint) {
  const [flightID, setFlightID] = useState(0);

  function incrementID() {
    setFlightID(flightID + 1);
  }
  function decrementID() {
    setFlightID(flightID - 1);
  }

    var lat1 = (penultimatePoint["lat"] * Math.PI) / 180;
    var lat2 = (ultimatePoint["lat"] * Math.PI) / 180;
    var long1 = (penultimatePoint["long"] * Math.PI) / 180;
    var long2 = (ultimatePoint["long"] * Math.PI) / 180;

    var d_phi = lat2 - lat1;
    var d_lambda = long2 - long1;

  return (
    <div>
        <button className="btn" onClick={decrementID()}></button>
        <>{flightID}</>
        <button className="btn" onClick={incrementID()}></button>
    </div>
  );
}
