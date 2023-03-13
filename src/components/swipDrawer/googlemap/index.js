import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { KEY } from './constant';

const AnyReactComponent = () => (
  <div>
    <LocationOnIcon sx={{ color: 'red' }} fontSize="large" />
  </div>
);

export default function SimpleMap({ coordinates }) {
  const lat = Number(coordinates[0]);
  const lng = Number(coordinates[1]);
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={[lat, lng]}
        defaultZoom={12}
      >
        <AnyReactComponent lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}
