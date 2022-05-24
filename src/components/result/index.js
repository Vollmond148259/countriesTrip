import React, {useCallback, useDeferredValue, useEffect, useState} from "react";
import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  putChoiceCoordinates,
  putCollection,
  putFavoriteCities,
  putShowCollection,
  removeFavoriteCities
} from "../../redux/slice/slice";
import checkTheSame from "../result/checkTheSame";
import filtered from "../result/filterByWord"
import HightLight from "../result/hightlight"
import SwipDrawer from "../swipDrawer";
import Papa from "papaparse";

import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function Result({showFavorite}) {
  const [showModal, setShowModal] = useState(false);
  const searchingValue = useSelector((state) => state.counter.searchValue);
  const allCollection = useSelector((state) => state.counter.collection);
  const favoriteCollection = useSelector((state) => state.counter.favoriteCollection);
  const countries = useSelector((state) => state.counter.showCollection);
  const defferedValue = useDeferredValue(searchingValue);
  const dispatch = useDispatch();


  const RenderRow = ({index, style}) => {
      const light = useCallback((str) => {
        return (
          <HightLight filter={defferedValue} str={str}/>
        )
      }, [])
      return (
        <Paper elevation={3} m={10} style={style} key={index}
               sx={{background: "linear-gradient(90deg,#21163B,#15142B)", borderRadius: "10px"}}>
          <Grid container spacing={{xs: 1, sm: 2}} justifyContent="space-between" alignItems="center">
            <Grid item xs={5} sm={6} mt={2} ml={7}>
              <Typography color="text.main" variant="h5">{light(countries[index].city)}</Typography>
              <Stack direction={{xs: "column", sm: "row"}} spacing={0.4}>
                <Typography variant="h5" color="text.additional">
                  {countries[index].population}
                </Typography>
                <Typography variant="h5" color="text.additional">{light(countries[index].country)}</Typography>
              </Stack>
            </Grid>

            <Stack direction="column" spacing={1} mt={5} mr={7}>
              <Button onClick={() => {
                setShowModal(true);
                dispatch(putChoiceCoordinates([countries[index].lat, countries[index].lng]))
              }}
                      variant="outlined">
                See on map
              </Button>
              {showFavorite ?
                <Button
                  onClick={() => {
                    dispatch(removeFavoriteCities(countries[index]));
                  }}
                  variant="outlined"
                >
                  Move to bin
                </Button>
                :
                checkTheSame(favoriteCollection, countries[index]) ?
                  <Button
                    onClick={() => {
                      dispatch(removeFavoriteCities(countries[index]));
                    }}
                    variant="outlined"
                  >
                    Delete
                  </Button>
                  :
                  <Button
                    onClick={() => {
                      dispatch(putFavoriteCities(countries[index]));
                    }}
                    variant="outlined"
                  >
                    Add to list
                  </Button>
              }
            </Stack>
          </Grid>
        </Paper>
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
    }
  ;
  useEffect(() => {
      getCountries();
    }
    , []);

  useEffect(() => {
      if (!showFavorite) {
        dispatch(putShowCollection(filtered(allCollection, defferedValue)));
      } else {
        dispatch(putShowCollection(filtered(favoriteCollection, defferedValue)));
      }
    }
    , [defferedValue, favoriteCollection, showFavorite])

  // useEffect(() => {
  //     dispatch(putPageCollection(chunk(countries, 10)))
  //   }
  //   , [])
  // const paddTop = 10
  // const innerElementType = forwardRef(({style, ...rest}, ref) => (
  //     <div
  //       ref={ref}
  //       style={{
  //         ...style,
  //         paddingTop: paddTop,
  //       }}
  //       {...rest}
  //     />
  //   )
  // )
  // innerElementType.displayName = 'MyComponent';
  // ;
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
                  sx={{background: "background.default"}}
                  height={height}
                  itemCount={countries.length}
                  itemSize={200}
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
