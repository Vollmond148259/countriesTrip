import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import GoogleStreet from "../swipDrawer/googlestreet"
import SimpleMap from "../swipDrawer/googlemap"
import {useSelector} from "react-redux";
import LitleCityList from "../swipDrawer/cityList"
import {StyledButton, StyledList} from "../../elements"


export default function SwipDrawer({showModal, setShowModal, random, getRandomTown}) {

  let coordinates = []
  const allCollection = useSelector((state) => state.counter.collection)
  const choiceCoordinates = useSelector((state) => state.counter.coordinates)
  const randomCoordinates = useSelector((state) => state.counter.randomCoordinates)
  const [selectView, setView] = useState("none")

  if (random === true) {
    coordinates = randomCoordinates
  } else {
    coordinates = choiceCoordinates
  }

  const list = () => (
    <StyledList>
      {random && <LitleCityList/>}
      {random && <StyledButton variant="contained" onClick={() => {
        getRandomTown(allCollection)
      }}>refresh</StyledButton>}
      {!random && <Button fullWidth onClick={() => {
        setView("map")
      }} variant="contained">show Map</Button>}
      {!random ? <Button fullWidth onClick={() => {
          setView("street")
        }} variant="contained">show street</Button>
        :
        <GoogleStreet coordinates={randomCoordinates}/>
      }
      <Box
        role="presentation"
        onKeyDown={() => setShowModal(false)}
      >
        {selectView === "map" && <SimpleMap coordinates={coordinates}/>}
        {selectView === "street" && <GoogleStreet coordinates={coordinates}/>}
      </Box>
    </StyledList>
  );

  function handleInitialModal() {
    setShowModal(false);
    setView("none");
  }

  return (
    <>
      <SwipeableDrawer
        open={showModal}
        anchor={"bottom"}
        onClose={() => handleInitialModal()}
        onOpen={() => setShowModal(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
