import React, {useEffect} from "react"
import {Stack, Typography} from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import map from "lodash/map"
import {useDispatch, useSelector} from "react-redux"
import {putUserGuessTown, putVariantCollection} from "../../../redux/slice/slice";

function LitleCityList() {
  const dispatch = useDispatch()
  const allCollection = useSelector((state) => state.counter.collection)
  const randomTown = useSelector((state) => state.counter.randomTown)
  const variantCollection = useSelector((state) => state.counter.variantCollection)

  useEffect(() => {
    function getRandomArray(array) {
      function mixarr(arr) {
        return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
      }

      let tempArray = [randomTown]
      for (let i = 0; i <= 3; i++) {
        const randomCity = Math.floor(Math.random() * allCollection.length)
        tempArray.push(array[randomCity])
      }
      tempArray = mixarr(tempArray)
      dispatch(putVariantCollection(tempArray))
    }

    getRandomArray(allCollection)
  }, [randomTown])


  return (
    <>
      <Typography color="white" variant="h4">{message}</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {map(variantCollection, (item, index) => (

            <ListItemButton
              onClick={() => dispatch(putUserGuessTown(item))}
              key={index}
            >
              <Stack direction="row" spacing={2}>
                <Typography color="white" variant="p">{item.city}</Typography>
                <Typography color="white" variant="p">{item.country}</Typography>
              </Stack>
            </ListItemButton>

          )
        )}
      </List>

    </>
  )
}

export default LitleCityList
