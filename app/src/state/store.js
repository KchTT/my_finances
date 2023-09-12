import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'

export const store = configureStore({
  reducer: {
    main: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["users/logIn/fulfilled"],
    },
  }),
})

