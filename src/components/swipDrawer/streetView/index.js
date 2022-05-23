import React from "react";
import {Panorama, YMaps} from "react-yandex-maps"
import {useSelector} from "react-redux"

function StreetView() {
  const coordinates = useSelector((state) => state.counter.coordinates)
  return (
    <>
      <YMaps query={{apikey: '91b160e2-aee0-4bb5-ab2d-7300ab9847c8'}}>
        <Panorama
          width={"100%"}
          height={450}
          defaultPoint={[coordinates[0], coordinates[1]]}/>
      </YMaps>
    </>
  );
}

export default StreetView
