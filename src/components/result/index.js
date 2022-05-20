import React, {useDeferredValue, useEffect, useState} from "react";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  putChoiceCoordinates,
  putCollection,
  putFavoriteCities,
  putShowCollection,
  removeFavoriteCities
} from "../../redux/slice/slice";
import SwipDrawer from "../swipDrawer";
import Papa from "papaparse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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

  function renderRow({index, style}) {
    return (
      <ListItem style={style} key={index} component="div">
        <ListItemButton>
          <Stack direction="column">
            <Stack direction="row">
              <Typography variant="h5">{countries[index].city}</Typography>
            </Stack>
            <Stack direction={{xs: "column", sm: "row"}} spacing={0.3}>
              <Typography variant="h5">
                {countries[index].population}
              </Typography>
              <Typography variant="h5">{countries[index].country}</Typography>
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
          {showFavorite ? <Button
              onClick={() => checkTheSame(favoriteCollection, countries[index])}
              variant="contained"
            >
              add to list
            </Button>
            :
            <Button
              onClick={() => dispatch(removeFavoriteCities(countries[index]))}
              variant="contained"
            >
              move to bin
            </Button>
          }
        </Stack>
      </ListItem>
    );
  }

  function checkTheSame(array, searchingObject) {
    let flag = false
    array.map((arr) => {
      if (arr.city === searchingObject.city) {
        flag = false
      } else {
        flag = true
      }
    })
    if (flag === true) {
      dispatch(putFavoriteCities(searchingObject))
    }
    return flag
  }


  function filtered(array, value) {
    const tempArray = [];
    array.map((arr) => {
      if (arr.city.indexOf(value) !== -1 || arr.country.indexOf(value) !== -1) {
        tempArray.push(arr);
      }
    });
    return tempArray;
  }

  const getCountries = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"
    );
    const data = await response.text();
    const parsedData = Papa.parse(data, {header: true});
    dispatch(putCollection(parsedData.data));
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    dispatch(putShowCollection(filtered(allCollection, defferedValue)));
  }, [defferedValue])


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
                  {renderRow}
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
