import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function Maps() {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "40vh",
  };
  return (
    <>
      <Map
        google={window.google}
        containerStyle={containerStyle}
        zoom={1}
        style={mapStyles}
        initialCenter={{ lat: 9.761927, lng: 79.95244 }}
      />
      <Marker
        title={"The marker`s title will appear as a tooltip."}
        name={"SOMA"}
        position={{ lat: 37.778519, lng: 122.40564 }}
      />
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAM6-oJNLTG6awt6VCXb8_ENlUnSppaU9M",
})(Maps);
