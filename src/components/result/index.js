import React, {useCallback, useDeferredValue, useEffect, useState} from "react";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  changeFavoriteMarker,
  putChoiceCoordinates,
  putCollection,
  putFavoriteCities,
  putPageCollection,
  putShowCollection,
  removeFavoriteCities
} from "../../redux/slice/slice";
import checkTheSame from "../result/checkTheSame";
import filtered from "../result/filterByWord"
import HightLight from "../result/hightlight"
import SwipDrawer from "../swipDrawer";
import Papa from "papaparse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import chunk from "lodash/chunk"

import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function Result({showFavorite}) {
  const [showModal, setShowModal] = useState(false);
  const searchingValue = useSelector((state) => state.counter.searchValue);
  const allCollection = useSelector((state) => state.counter.collection);
  const favoriteCollection = useSelector((state) => state.counter.favoriteCollection);
  const countries = useSelector((state) => state.counter.showCollection);
  const defferedValue = useDeferredValue(searchingValue);
  const pageCollection = useSelector((state) => state.counter.pageCollection);
  const dispatch = useDispatch();


  const RenderRow = ({index, style}) => {
      const light = useCallback((str) => {
        return (
          <HightLight filter={defferedValue} str={str}/>
        )
      }, [])
      return (
        <ListItem style={style} key={index} component="div">
          <ListItemButton>
            <Stack direction="column">
              <Stack direction="row">
                <Typography variant="h5">{light(countries[index].city)}</Typography>
              </Stack>
              <Stack direction={{xs: "column", sm: "row"}} spacing={0.4}>
                <Typography variant="h5">
                  {countries[index].population}
                </Typography>
                <Typography variant="h5">{light(countries[index].country)}</Typography>
                <Typography variant="h5">{countries[index].favorite}</Typography>
                <></>
              </Stack>
            </Stack>
          </ListItemButton>
          <Stack direction="column" spacing={0.5}>
            <Button onClick={() => {
              setShowModal(true);
              dispatch(putChoiceCoordinates([countries[index].lat, countries[index].lng]))
            }}
                    variant="contained">
              see on map
            </Button>
            {showFavorite ?
              <Button
                onClick={() => {
                  dispatch(removeFavoriteCities(countries[index]));
                }}
                variant="contained"
              >
                move to bin
              </Button>
              :
              !checkTheSame(favoriteCollection,countries[index]) ? 
              <Button
                  onClick={() => {
                    dispatch(removeFavoriteCities(countries[index]));
                  }}
                  variant="contained"
                >
                  delete
                </Button>
                :
                <Button
                  onClick={() => {
                    dispatch(putFavoriteCities(countries[index]));
                  }}
                  variant="contained"
                >
                  add to list
                </Button> 
            }
          </Stack>
        </ListItem>
      )
    }
  ;
  const getCountries = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"
    );
    const data = await response.text();
    const parsedData = Papa.parse(data, {header: true});
    dispatch(putCollection(parsedData.data));
    dispatch(putShowCollection(parsedData.data))
  };
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (!showFavorite) {
      dispatch(putShowCollection(filtered(allCollection, defferedValue)));
    } else {
      dispatch(putShowCollection(filtered(favoriteCollection, defferedValue)));
    }
  }, [defferedValue, favoriteCollection, showFavorite])

  useEffect(() => {
    dispatch(putPageCollection(chunk(countries, 10)))
    console.log(pageCollection)
  }, [])
  return (
    <>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              maxWidth: "100vw",
              bgcolor: "background.paper",
            }}
          >
            <AutoSizer>
              {({height, width}) => (
                <List
                  height={height}
                  itemCount={countries.length}
                  itemSize={120}
                  width={width}
                >
                  {RenderRow}
                </List>
              )}
            </AutoSizer>
          </Box>
        </Grid>
      </Grid>
      <SwipDrawer showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
}

export default Result;
