import moment from 'moment';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  counter: 0,
  autenticate: false,
  profile: null
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogIn(state, action) {
      localStorage.setItem("MFT", action.payload.t);
      localStorage.setItem("isAuthenticate",true);
      return {
        ...state, 
        user: action.payload.user,
        autenticate:true
      }
    },
    signOut(state, action) {
      localStorage.removeItem("MFT");
      localStorage.removeItem("isAuthenticate");
      return {
        ...state, 
        user: null,
        autenticate:false,
        profile: null
      }
    },
    setProfile(state, action) {
      return {
        ...state, 
        profile: action.payload,
      }
    },
    sale(state, action) {
      if(localStorage.getItem("MFT") !== null) localStorage.removeItem("MFT");
      if(localStorage.getItem("isAuthenticate") !== null) localStorage.removeItem("isAuthenticate")
      return {
        ...state, user: {
          token: '',
          autenticate: false,
          profile: null,
        }
      }
    },
    
  }
})

export const { signOut,setLogIn,setProfile } = user.actions

export default user.reducer

