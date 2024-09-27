import { configureStore } from "@reduxjs/toolkit";
import lockinsReducer from './lockin-slice'

const store = configureStore({
  reducer: {
    lockins : lockinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;