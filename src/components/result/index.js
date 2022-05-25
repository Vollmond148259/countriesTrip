import React, {forwardRef, useCallback, useDeferredValue, useEffect, useState} from "react";
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
        <Paper elevation={0} key={index} style={style}
               sx={{background: "linear-gradient(90deg,#21163B,#15142B)", borderRadius: "10px"}}>
          <Grid pl={2} pr={2} container spacing={{xs: 1, sm: 2}} justifyContent="space-between">
            <Grid m={3} item xs={10} sm={3} md={2} lg={2}>
              <Box height="110px" width="200px" sx={{border: "2px solid violet"}}/>
            </Grid>
            <Grid item xs={10} sm={4} md={5} lg={7} mt={2}>
              <Typography color="text.main" variant="h5">{light(countries[index].city)}</Typography>
              <Stack direction={{xs: "row", sm: "column", md: "row"}} spacing={1}>
                <Typography variant="h5" color="text.additional">
                  {countries[index].population}
                </Typography>
                <Typography variant="h5" color="text.additional">{light(countries[index].country)}</Typography>
              </Stack>
            </Grid>

            <Stack direction="column" spacing={1} mt={3} mr={7}>
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
                    I want to visit
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
  const GUTTER_SIZE = 5;
  const COLUMN_WIDTH = 100;
  const ROW_HEIGHT = 35;
  const innerElementType = forwardRef(({style, ...rest}, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        paddingLeft: GUTTER_SIZE,
        paddingTop: GUTTER_SIZE
      }}
      {...rest}
    />
  ));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          maxWidth: "100vw",
        }}
      >
        <AutoSizer>
          {({height, width}) => (
            <List
              sx={{background: "background.default"}}
              height={height}
              itemCount={countries.length}
              itemSize={200}
              innerElementType={innerElementType}
              width={width}
            >
              {RenderRow}
            </List>
          )}
        </AutoSizer>
      </Box>
      <SwipDrawer showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
    ;
}

export default Result;
