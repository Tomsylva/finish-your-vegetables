import { Link } from "react-router-dom";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import * as PATHS from "../../utils/paths";
import React from "react";
import "../../pages/AvailablePage.css";

const carrot = new Icon({
  iconUrl: "../1.png",
  iconSize: [20, 40],
});

function RestaurantMarker(props) {
  const provider = new OpenStreetMapProvider();
  const { restaurant } = props;
  const [y, setY] = React.useState(0);
  const [x, setX] = React.useState(0);

  React.useEffect(() => {
    console.log("mounted");
    provider.search({ query: restaurant.location }).then((response) => {
      setX(response[0].x);
      setY(response[0].y);
    });
    return () => console.log("unmounted");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Marker position={[y, x]} icon={carrot}>
      <Popup className="popup">
        <Link to={`${PATHS.RESTAURANT}/${restaurant.restaurantName}`}>
          <p style={{ color: "#1f063d", textAlign: "center" }}>
            <strong>{restaurant.restaurantName}</strong>
          </p>
        </Link>
        <p>{restaurant.location}</p>
      </Popup>
    </Marker>
  );
}

export default RestaurantMarker;
