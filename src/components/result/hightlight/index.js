import {Box} from "@mui/material"

function HightLight({filter,str}){
    if(!filter) return str
    const regExp=new RegExp(filter,"ig")
    const matchValue=str.match(regExp)
    if(matchValue){
return str.split(regExp).map((s,index,array)=>{
if(index<array.length-1){
  const c=matchValue.shift()
  return (<>{s}<Box component="span" sx={{borderRadius:"5px",backgroundColor:"yellow"}}>{c}</Box></>)
}
return s
})
    }
    return str
  } 

export default HightLight