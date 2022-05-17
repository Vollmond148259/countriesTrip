import React, { useState } from "react";
import { TextField, Grid, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { putSearchValue } from "../../redux/slice/slice";
export function Search() {
  const dispatch = useDispatch();
  return (
    <Grid mt={5} container spacing={2}>
      <Grid sx={{ border: "2px solid red" }} item xs={8}>
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
      <Grid item xs={3} sx={{ border: "2px solid red" }}>
        <Stack direction="column">
          <Button variant="contained">get filtered countries</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default Search;
