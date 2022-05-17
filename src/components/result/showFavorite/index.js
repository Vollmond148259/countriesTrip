import React from "react"
import {Box,Paper,Stack,Typography} from "@mui/material"
import {useSelector} from "react-redux"

function ShowFavorite(){
const favoriteCities=useSelector((state)=>state.counter.favoriteCollection)
  return(
    <>
    <Paper>
      <Box>
        {favoriteCities.map((city,key)=>
          <Box key={key}>
          <Typography variant="h4">
            {city.city}
          </Typography>
            <Stack direction="row">
          <Typography variant="h5">
            {city.country}
          </Typography>
            <Typography variant="h5">
              {city.population}
            </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
    </>
  )
}
export default ShowFavorite
