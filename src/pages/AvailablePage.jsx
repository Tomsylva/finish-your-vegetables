import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";
import MealList from "../components/Meal/MealList";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../App.css";

function AvailablePage(props) {
  const { user } = props;

  // const mymap = L.map("mapid").setView([51.505, -0.09], 13);

  return (
    <div>
      <h1>Steaming hot food, looking to fill a hole in your area!</h1>
      <RestaurantList user={user} />
      <MealList user={user} />
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
}

export default AvailablePage;
