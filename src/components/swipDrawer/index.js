import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MyMapComponent from "./gmap"

export default function SwipDrawer({showModal,setShowModal}) {
  const anchor="bottom"
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={()=>setShowModal(false)}
      onKeyDown={()=>setShowModal(false)}
    >
    </Box>
  );

  return (
    <div>

          <SwipeableDrawer
            open={showModal}
            anchor={"bottom"}
            onClose={()=>setShowModal(false)}
            onOpen={()=>setShowModal(true)}
          >
            {list(anchor)}
            <MyMapComponent lat={"59.95"} lng={"33.33"} zoom={11}/>
          </SwipeableDrawer>
    </div>
  );
}
