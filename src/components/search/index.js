import React, {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Result from "../result"
import {putRandomCoordinates, putSearchValue, putShowCollection} from "../../redux/slice/slice";

export function Search() {
  const dispatch = useDispatch();
  const favoriteCollection = useSelector(
    (state) => state.counter.favoriteCollection
  );
  const allCollection = useSelector((state) => state.counter.collection);
  const [showFavorite, setShowFavorite] = useState(false);
  const [random, startRandom] = useState(false)


  useEffect(() => {
    function randomCoords(array) {
      const randomCity = Math.floor(Math.random() * allCollection.length)
      return (dispatch(putRandomCoordinates([array[randomCity].lat, array[randomCity].lng])))
    }

    randomCoords(allCollection)
  }, [, random])

  return (
    <>
      <Grid mt={5} container spacing={2}>
        <Grid item xs={7}>
          <TextField
            autoComplete="off"
            onChange={() => {
              dispatch(putSearchValue(event.target.value));
            }}
            fullWidth
            id="outlined-basic"
            label="input country or city"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          {showFavorite ? (
            <Button
              sx={{height: "55px"}}
              onClick={() => {
                dispatch(putShowCollection(allCollection));
                setShowFavorite(!showFavorite);
              }}
              variant="contained"
            >
              show all cities
            </Button>
          ) : (
            <Button
              sx={{height: "55px"}}
              onClick={() => {
                dispatch(putShowCollection(favoriteCollection));
                setShowFavorite(!showFavorite);
              }}
              variant="contained"
            >
              show favorite cities
            </Button>
          )}

        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => startRandom(!random)} sx={{height: "55px"}}
                  variant="contained">get random</Button>
        </Grid>
        <Result showFavorite={showFavorite}/>
      </Grid>
    </>
  );
}

export default Search;
