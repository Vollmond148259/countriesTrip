import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps"
import {useSelector} from "react-redux"

function Maps() {
  const coordinates = useSelector((state) => state.counter.coordinates)
  console.log("dfsdfsdfsd")
  return (
    <>
      <YMaps>
        <Map
          width={"100%"}
          height={350}
          defaultState={{center: coordinates, zoom: 9}}
        >
          <Placemark geometry={coordinates}/>
        </Map>
      </YMaps>
    </>
  );
}

export default Maps
