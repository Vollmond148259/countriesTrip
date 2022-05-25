import React from 'react';
import ReactStreetview from 'react-streetview';

function GoogleStreet({coordinates}) {
  const lat = Number(coordinates[0])
  const lng = Number(coordinates[1])
  // see https://developers.google.com/maps/documentation/javascript
  const googleMapsApiKey = 'AIzaSyAM6-oJNLTG6awt6VCXb8_ENlUnSppaU9M';

  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  const streetViewPanoramaOptions = {
    position: {lat, lng},
    pov: {heading: 100, pitch: 0},
    zoom: 1
  };

  return (
    <div style={{
      width: '100vw',
      height: '60vh',
    }}>
      <ReactStreetview
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
  );
}

export default GoogleStreet

