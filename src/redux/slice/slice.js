import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    collection:[{city:"p"}],
    searchValue: "aaa"
  },
  reducers: {
    putCollection:(state,action)=>{
      state.collection=action.payload
    },
    putSearchValue: (state,action) => {
      state.searchValue=action.payload
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { putCollection,putSearchValue, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
