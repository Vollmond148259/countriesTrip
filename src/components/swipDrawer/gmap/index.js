import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps"

function Maps({coordinates}) {
  return (
    <>
      <YMaps query={{apikey: '91b160e2-aee0-4bb5-ab2d-7300ab9847c8'}}>
        <Map
          width={"100vw"}
          height={"70vh"}
          defaultState={{center: coordinates, zoom: 9}}
        >
          <Placemark geometry={coordinates}/>
        </Map>
      </YMaps>
    </>
  )
    ;
}

export default Maps
