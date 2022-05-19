import React, {useState} from "react";
import {Button, Grid, Stack, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Result from "../result"
import {putSearchValue, putShowCollection} from "../../redux/slice/slice";

export function Search() {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(
    (state) => state.counter.favoriteCollection
  );
  const allCities = useSelector((state) => state.counter.collection);
  const [toggleButton, setToggleButton] = useState(true);
  return (
    <Grid mt={5} container spacing={2}>
      <Grid item xs={8}>
        <TextField
          disabled={!toggleButton}
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
          {toggleButton ? (
            <Button
              sx={{height: "55px"}}
              onClick={() => {
                dispatch(putShowCollection(favoriteCities));
                setToggleButton(!toggleButton);
              }}
              variant="contained"
            >
              show favorite cities
            </Button>
          ) : (
            <Button
              sx={{height: "55px"}}
              onClick={() => {
                dispatch(putShowCollection(allCities));
                setToggleButton(!toggleButton);
              }}
              variant="contained"
            >
              show all cities
            </Button>
          )}
        </Stack>
      </Grid>
      <Result showFavorite={toggleButton}/>
    </Grid>
  );
}

export default Search;
