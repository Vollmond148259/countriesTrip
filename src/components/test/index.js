import React,{useState} from 'react'
import {dataLoading, tryGetValue} from "../../redux/slice/countTest"
import {TextField,Button} from "@mui/material";
import {useSelector,useDispatch} from "react-redux"
function Test() {
  const dispatch=useDispatch()
  const val=useSelector((state)=>state.countTest.value)
  const [value,setValue]=useState(null)
  return(
    <>
      <TextField onChange={()=>setValue(event.target.value)} variant="standard"/>
      <Button onClick={()=>dispatch(tryGetValue())}  variant="contained">add value</Button>
      <Button onClick={()=>dispatch(dataLoading())}  variant="contained">get all planets</Button>
      <p>{val}</p>

    </>
  )
}
export default Test
