import React from "react"
import {FixedSizeList} from "react-window";
import {useDispatch, useSelector} from "react-redux"
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {removeFavoriteCities} from "../../redux/slice/slice";

function FavoriteResult() {

  function renderFavoriteRow({index, style}) {
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <Stack direction="column">
            <Stack direction="row">
              <Typography variant="h4">{countries[index].city}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5">
                {countries[index].population}
              </Typography>
              <Typography variant="h5">{countries[index].country}</Typography>
            </Stack>
          </Stack>
        </ListItemButton>
        <Stack direction="column" spacing={1}>
          <Button
            onClick={() => dispatch(removeFavoriteCities(countries[index]))}
            variant="contained"
          >
            move to bin
          </Button>
        </Stack>
      </ListItem>
    );
  }

  const dispatch = useDispatch()
  const countries = useSelector((state) => state.counter.showCollection)
  
  return (
    <>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              width: "100%",
              height: 800,
              maxWidth: 800,
              bgcolor: "background.paper",
            }}
          >
            <FixedSizeList
              height={800}
              width={800}
              itemSize={100}
              itemCount={countries.length}
              overscanCount={5}
            >
              {countries && renderFavoriteRow}
            </FixedSizeList>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default FavoriteResult
