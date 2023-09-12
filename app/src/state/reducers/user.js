import moment from 'moment';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  msj: {
    content: '',
    type: '',
  },
  counter: 0,
  autenticate: false,
  profile: null
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMsj(state, action) {
      return {
        ...state,
        msj: {
          content: action.payload.content,
          type: action.payload.type,
        },
      }
    },
    signOut(state, action) {
      localStorage.removeItem("MFT");
      localStorage.removeItem("isAuthenticate");
      return {
        ...state, 
        user: null,
        autenticate:false
      }
    },
    sale(state, action) {
      if(localStorage.getItem("MFT") !== null) localStorage.removeItem("MFT");
      if(localStorage.getItem("isAuthenticate") !== null) localStorage.removeItem("isAuthenticate")
      return {
        ...state, user: {
          token: '',
          autenticate: false,
        }
      }
    },
    
  }
})

export const { setMsj,signOut } = user.actions

export default user.reducer

