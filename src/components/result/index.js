import React, {useState, useEffect, useDeferredValue} from "react";
import {Typography, Grid, Button,Stack,Box} from "@mui/material";
import {useSelector,useDispatch} from "react-redux"
import {putCollection} from "../../redux/slice/slice"
import SwipDrawer from "../swipDrawer"
import Papa from "papaparse"
import ListItem from '@mui/material/ListItem';
//import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import {putFavoriteCities} from "../../redux/slice/slice"
import { FixedSizeList} from 'react-window';
import ShowFavorite from "../result/showFavorite"

function Result(){
  const [countries,setCountries]=useState([{},{}])
  const [showModal,setShowModal]=useState(false)
  const [showFavor,setShowFavor]=useState(false)
  const searchingValue=useSelector((state)=>state.counter.searchValue)
  const allCollection=useSelector((state)=>state.counter.collection)
  const defferedValue=useDeferredValue(searchingValue)
  const dispatch=useDispatch()
  const favoriteCities=useSelector((state)=>state.counter.favoriteCollection)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  function renderRow({index,style}) {

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={()=>dispatch(putFavoriteCities(countries[index]))} >
          <Stack direction="column">
            <Stack direction="row">
          <Typography variant="h4">{countries[index].city}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5">{countries[index].population}</Typography>
              <Typography variant="h5">{countries[index].country}</Typography>
            </Stack>
          </Stack>
        </ListItemButton>
      </ListItem>
    );
  }

  function filtered(array,value){
    const tempArray=[]
    array.map((arr)=>{
      if((arr.city.indexOf(value)!==-1)||(arr.country.indexOf(value)!==-1)) {
       tempArray.push(arr)
      }
    })
    return(tempArray)

  }


  const getCountries=async()=>{
    const response = await fetch("https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv")
    const data = await response.text()
const parsedData=Papa.parse(data,{header:true})
    dispatch(putCollection(parsedData.data))
  }
  useEffect(()=>{
getCountries()
  },[])
  useEffect(()=>{
    setCountries(filtered(allCollection,defferedValue))
  },[defferedValue])

  useEffect(()=>{
    console.log(favoriteCities)
  },[favoriteCities])

  return(
    <>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={8}>
              <Box
              sx={{ width: '100%', height: 640, maxWidth:700, bgcolor: 'background.paper' }}
              >
              <FixedSizeList
              height={640}
              width={700}
              itemSize={80}
              itemCount={countries.length}
              overscanCount={5}
              >
            {countries && renderRow}
              </FixedSizeList>
              </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack direction="column" spacing={2}>
            <Button onClick={()=>setShowModal(true)}  variant="contained">see on maps</Button>
            <Button onClick={()=>setShowFavor(!showFavor)} variant="contained">i want to visit</Button>
          </Stack>
          {showFavor && <ShowFavorite/>}
        </Grid>
      </Grid>
<SwipDrawer showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}
export default Result
