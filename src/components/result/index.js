import React,{useState,useEffect} from "react";
import {Typography, Grid, Button,Stack,Box} from "@mui/material";
import Papa from "papaparse"

function Result(){
  const [countries,setCountries]=useState([{},{}])

  function filtered(array,value){
    const tempArray=[null]
    array.map((arr,key)=>{
      console.log("start map")
      if(arr.city.indexOf(value)!==-1) {
       tempArray.push(arr)
      }
    })
    return(tempArray)

  }


  const getCountries=async()=>{
    const response = await fetch("https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv")
    const data = await response.text()
const parsedData=Papa.parse(data,{header:true})
    console.log(filtered(parsedData.data,"se"))
  }
  useEffect(()=>{
getCountries()
  },[])

  return(
    <>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={8}>
          <Box>
            {countries.map((country,key)=>
              <Box>
                <Box pl={3} key={key}>
                  <Typography variant="h5">{country.city}</Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <Typography variant="h6">{country.population}</Typography>
                    </Box>
                  <Box>
                    <Typography variant="h6">{country.country}</Typography>
                  </Box>
                </Stack>
              </Box>

            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack direction="column" spacing={2}>
            <Button  variant="contained">see on maps</Button>
            <Button  variant="contained">i want to visit</Button>
          </Stack>
        </Grid>
      </Grid>

    </>
  )
}
export default Result
