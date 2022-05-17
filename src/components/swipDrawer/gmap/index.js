import React from 'react'
import {Box} from "@mui/material"
import GoogleMapReact from 'google-map-react';

function MyMapComponent({lat,lng,zoom}){
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return(
    <>
      <Box height={"40vh"} width={"100%"}>
        <GoogleMapReact
          //bootstrapURLKeys={{key:"AIzaSyAM6-oJNLTG6awt6VCXb8_ENlUnSppaU9M" }}
          defaultCenter={[lat,lng]}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </Box>
    </>
    )
}
export default MyMapComponent
