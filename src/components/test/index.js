import React,{useState} from 'react'
import {tryGetValue} from "../../redux/slice/countTest"
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
      <p>{val}</p>
    </>
  )
}
export default Test
