import React, { useState } from "react";
import { TextField, Grid, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { putSearchValue,putShowCollection } from "../../redux/slice/slice";

export function Search() {
  const dispatch = useDispatch();
  const favoriteCities=useSelector((state)=>state.counter.favoriteCollection)
  const allCities=useSelector((state)=>state.counter.collection)
  const[toggleButton,setToggleButton] =useState(true)
  return (
    <Grid mt={5} container spacing={2}>
      <Grid item xs={8}>
        <TextField
          onChange={() => {
            dispatch(putSearchValue(event.target.value));
          }}
          fullWidth
          id="outlined-basic"
          label="input country"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <Stack direction="column">
          {toggleButton ?
            <Button sx={{height:"55px"}} onClick={()=>{dispatch(putShowCollection(favoriteCities));setToggleButton(!toggleButton)}}  variant="contained">show favorite cities</Button>
            :
            <Button sx={{height:"55px"}} onClick={()=>{dispatch(putShowCollection(allCities));setToggleButton(!toggleButton)}}  variant="contained">show all cities</Button>}

        </Stack>
      </Grid>
    </Grid>
  );
}
export default Search;
