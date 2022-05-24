import React from "react";
import GoogleMapReact from 'google-map-react';
import {useSelector} from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AnyReactComponent = () => <div><LocationOnIcon sx={{color: "yellow"}} fontSize="large"/></div>
;

export default function SimpleMap() {
  const coordinates = useSelector((state) => state.counter.coordinates)
  const lat = Number(coordinates[0])
  const lng = Number(coordinates[1])
  return (
    // Important! Always set the container height explicitly
    <div style={{height: '70vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyAM6-oJNLTG6awt6VCXb8_ENlUnSppaU9M"}}
        defaultCenter={[lat, lng]}
        defaultZoom={12}
      >
        <AnyReactComponent lat={lat} lng={lng}/>
      </GoogleMapReact>
    </div>
  );
}
