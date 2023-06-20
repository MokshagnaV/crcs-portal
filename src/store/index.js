import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import socitiesSlice from "./socitiesSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    socities: socitiesSlice.reducer,
  },
});

export default store;
