import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import dataReducer from './reducers/data'

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["users/logIn/fulfilled"],
    },
  }),
})

