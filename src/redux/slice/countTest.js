import {createSlice} from "@reduxjs/toolkit"

export const counterTestSlice=createSlice({
  name:"countTest",
  initialState:{
    isLoading:false,
    postCollection:[],
    isLoad:false,
    value:0,
  },
  reducers:{
    dataLoading:(state)=>{
      state.isLoading=true
    },
    tryGetValue:(state)=>{
      state.isLoad=true
    },
    putTestCollection: (state, action) => {
      state.postCollection = action.payload;
      state.isLoading=false
    },
    putTestValue:(state,action)=>{
      state.value=action.payload;
    },
  },
})

export const {dataLoading,putTestCollection,tryGetValue,putTestValue}=counterTestSlice.actions
export default counterTestSlice.reducer

