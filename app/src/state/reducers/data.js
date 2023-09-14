import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  msj:{
    cont: "",
		tipo: "success",
		time: 0
  }
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategories(state, action) {
      return {
        ...state,
        categories: action.payload,
      }
    },
    setMsj(state, action) {
      return {
        ...state,
        msj: {
          cont: action.payload.cont,
          tipo: action.payload.tipo,
          time: action.payload.time,
        },
      }
    }
  }
})

export const { setCategories,setMsj } = data.actions

export default data.reducer

