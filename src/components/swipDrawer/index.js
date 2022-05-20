import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Maps from "../swipDrawer/gmap"

export default function SwipDrawer({showModal, setShowModal}) {
  const anchor = "bottom";
  const list = (anchor) => (
    <Box
      role="presentation"
      onKeyDown={() => setShowModal(false)}
    >
      <Maps/>
    < /Box>
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
