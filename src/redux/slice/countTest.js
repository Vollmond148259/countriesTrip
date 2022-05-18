import {createSlice} from "@reduxjs/toolkit"

export const counterTestSlice=createSlice({
  name:"countTest",
  initialState:{
    collection:[{name:"i"}],
    isLoad:false,
    value:0,
  },
  reducers:{
    tryGetValue:(state)=>{
      state.isLoad=true
    },
    putTestCollection: (state, action) => {
      state.collection = action.payload;
    },
    putTestValue:(state,action)=>{
      state.value=action.payload;
    },
  },
})

export const {putTestCollection,tryGetValue,putTestValue}=counterTestSlice.actions
export default counterTestSlice.reducer

