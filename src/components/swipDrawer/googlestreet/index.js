import React from 'react';
import ReactStreetview from 'react-streetview';
import { KEY } from '../googlemap/constant';

function GoogleStreet({ coordinates, toggleStreet }) {
  const lat = Number(coordinates[0]);
  const lng = Number(coordinates[1]);
  const googleMapsApiKey = KEY;
  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  const streetViewPanoramaOptions = {
    position: { lat, lng },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    addressControl: false,
    showRoadLabels: false,
  };
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '50vh',
        }}
      >
        {toggleStreet && (
          <ReactStreetview
            apiKey={googleMapsApiKey}
            unique={streetViewPanoramaOptions.unique}
            streetViewPanoramaOptions={streetViewPanoramaOptions}
          />
        )}
      </div>
    </>
  );
}

export default GoogleStreet;
