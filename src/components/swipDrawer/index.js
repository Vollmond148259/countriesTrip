import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Button, styled} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import GoogleStreet from "../swipDrawer/googlestreet"
import SimpleMap from "../swipDrawer/googlemap"
import {useSelector} from "react-redux";
import LitleCityList from "../swipDrawer/cityList"
import theme from "../../../styles/theme"


export default function SwipDrawer({showModal, setShowModal, random}) {
  const StyledList = styled(Box)(() => ({
    backgroundColor: theme.palette.background.default
  }))
  let coordinates = []
  const choiceCoordinates = useSelector((state) => state.counter.coordinates)
  const randomCoordinates = useSelector((state) => state.counter.randomCoordinates)
  const [selectView, setView] = useState("none")
  const anchor = "bottom";

  if (random === true) {
    coordinates = randomCoordinates
  } else {
    coordinates = choiceCoordinates
  }

  const list = (anchor) => (
    <StyledList>
      {random && <LitleCityList/>}
      {!random && <Button fullWidth onClick={() => {
        setView("map")
      }} variant="contained">show Map</Button>}
      <Button fullWidth onClick={() => {
        console.log("rfsfsdf")
        setView("street")
      }} variant="contained">show street</Button>
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

        {list(anchor)}

      </SwipeableDrawer>
    </>
  );
}
