import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Maps from "../swipDrawer/gmap"
import StreetView from "./streetView";

export default function SwipDrawer({showModal, setShowModal}) {
  const [selectView, setView] = useState("none")
  const anchor = "bottom";
  const list = (anchor) => (
    <>
      <Button onClick={() => {
        setView("map")
      }} variant="contained">show Map</Button>
      <Button onClick={() => {
        setView("street")
      }} variant="contained">show street</Button>
      <Box
        role="presentation"
        onKeyDown={() => setShowModal(false)}
      >
        {selectView === "map" && <Maps/>}
        {selectView === "street" && <StreetView/>}
      </Box>
    </>
  );
  return (
    <>
      <SwipeableDrawer
        open={showModal}
        anchor={"bottom"}
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
}
