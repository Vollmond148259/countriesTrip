import React, {useState} from "react";
import {Grid, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {StyledButton, StyledTextField} from "../../elements"
import {putRandomCoordinates, putRandomTown, putShowCollection} from "../../redux/slice/slice";
import SwipDrawer from "../swipDrawer";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


export function Navigate({setShowFavorite}) {
  const dispatch = useDispatch();
  const favoriteCollection = useSelector((state) => state.counter.favoriteCollection);
  const allCollection = useSelector((state) => state.counter.collection);
  const [randomModal, setRandomModal] = useState(false)

  function getRandomTown(array) {
    const randomCity = Math.floor(Math.random() * allCollection.length)
    dispatch(putRandomCoordinates([array[randomCity].lat, array[randomCity].lng]))
    dispatch(putRandomTown(array[randomCity]))
  }

  function handleLoadShowCollection(collection, value) {
    dispatch(putShowCollection(collection));
    setShowFavorite(value);
  }

  return (
    <>
      <Grid mt={5} container spacing={2}>
        <Grid item xs={12}>
          <StyledTextField
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="icon"/>
                </InputAdornment>
              ),
            }}
            onInput={() => {
            }}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack direction="row" spacing={2}>
            <StyledButton
              onClick={() => {
                handleLoadShowCollection(allCollection, false);
              }}
              variant="contained"
            >
              all
            </StyledButton>
            <StyledButton
              onClick={() => {
                handleLoadShowCollection(favoriteCollection, true)
              }}
              variant="contained"
            >
              selected
            </StyledButton>
            <StyledButton
              onClick={() => {
                setRandomModal(!randomModal)
                getRandomTown(allCollection);
              }}
              variant="contained"
            >
              random
            </StyledButton>
          </Stack>
        </Grid>
        <SwipDrawer showModal={randomModal} setShowModal={setRandomModal} random={randomModal}
                    getRandomTown={getRandomTown}/>
      </Grid>
    </>
  );
}

export default Navigate;
