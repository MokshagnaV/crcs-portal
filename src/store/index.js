import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import societiesSlice from "./societiesSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    societies: societiesSlice.reducer,
  },
});

export default store;
