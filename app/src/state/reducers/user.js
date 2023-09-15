import moment from 'moment';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chkToken } from '../../services';

export const fetchCheck = createAsyncThunk(
  'users/check',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await chkToken()
      return response
    } catch (error) {
      return error.response
    }
  }
)

const initialState = {
  user: null,
  counter: 0,
  autenticate: false,
  profile: null,
  loading: false,
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
    
  },
  extraReducers: {
    [fetchCheck.pending.type]: (state, action) => {
      state.loading = true
    },
    [fetchCheck.fulfilled.type]: (state, action) => {
      console.log(action)
      if (action.payload.error || (action.payload.hasOwnProperty('status') && action.payload.status !== 200)) {
        console.log("descubrio el error")
        if(localStorage.getItem("MFT") !== null) localStorage.removeItem("MFT");
        if(localStorage.getItem("isAuthenticate") !== null) localStorage.removeItem("isAuthenticate")
        state.autenticate=false
        state.user = null
        state.profile = null
        state.loading = false
      } else {
        state.user=action.payload.data.user
        state.autenticate=true
        state.contador = moment().unix()
        state.loading = false
      }
    },
    [fetchCheck.rejected.type]: (state, action) => {
      console.log(action.payload)
      state.autenticate=false
      state.user = null
      state.profile = null
      state.contador = moment().unix();
      state.loading = true
    },
  },
})

export const { signOut,setLogIn,setProfile } = user.actions

export default user.reducer

