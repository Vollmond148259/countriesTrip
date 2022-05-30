import React, {useRef, useState} from "react";
import {Button, Grid, Stack, styled, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import theme from "../../../styles/theme"
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {putRandomCoordinates, putRandomTown, putSearchValue, putShowCollection} from "../../redux/slice/slice";
import Result from "../result";
import SwipDrawer from "../swipDrawer";


export const StyledTextField = styled(TextField)(() => ({
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

export function Search() {
  const ref = useRef(null)
  const dispatch = useDispatch();
  const favoriteCollection = useSelector(
    (state) => state.counter.favoriteCollection
  );
  const allCollection = useSelector((state) => state.counter.collection);
  const [randomModal, setRandomModal] = useState(false)
  const [showFavorite, setShowFavorite] = useState(false);


  function getRandomTown(array) {
    const randomCity = Math.floor(Math.random() * allCollection.length)
    dispatch(putRandomCoordinates([array[randomCity].lat, array[randomCity].lng]))
    dispatch(putRandomTown(array[randomCity]))
  }


  const handleLoadShowCollection = (collection, value) => {
    dispatch(putShowCollection(collection));
    setShowFavorite(value);
  }
  const handleRandomCity = () => {
    setRandomModal(!randomModal)
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
        <Grid item xs={12} sm={12}>
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
            <StyledButton
              onClick={() => {
                handleRandomCity();
                getRandomTown(allCollection);
              }}
              variant="contained"
            >
              random
            </StyledButton>
          </Stack>
        </Grid>
        <SwipDrawer showModal={randomModal} setShowModal={setRandomModal} random={randomModal}/>
      </Grid>
    </>
  );
}

export default Search;
