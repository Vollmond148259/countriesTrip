import React, {useEffect, useRef, useState} from "react";
import {Button, Grid, Stack, styled, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import theme from "../../../styles/theme"
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {putRandomCoordinates, putSearchValue, putShowCollection} from "../../redux/slice/slice";
import Result from "../result";

export function Search() {
  const ref = useRef(null)
  const StyledTextField = styled(TextField)(() => ({
    borderRadius: "10px",
    backgroundColor: theme.palette.background.search,
    fontSize: 17,
    '& label': {
      fontSize: 17,
      color: theme.palette.text.additional,
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
    '& label.Mui-focused': {
      fontSize: 17,
      color: theme.palette.text.main,
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.additional,
      "&:focused": {
        color: theme.palette.text.additional,
      },
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  }));
  const StyledButton = styled(Button)(() => ({
    height: "35px",
    paddingLeft: "50px",
    paddingRight: "50px",
    borderRadius: "50px",
    textTransform: 'none',
    backgroundColor: theme.palette.background.button,
    "&:hover": {
      "&:hover": {
        backgroundColor: "#6E42CA",
      },
    },
  }))

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

  const handleLoadShowCollection = (collection, value) => {
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
            onChange={() => {
              dispatch(putSearchValue(event.target.value));
            }}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" spacing={2}>
            <StyledButton
              ref={ref}
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
          </Stack>
        </Grid>
        <Grid mt={5} container spacing={2}>
          <Grid item xs={12}>
            <Result showFavorite={showFavorite}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
