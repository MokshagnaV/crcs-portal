import { configureStore } from "@reduxjs/toolkit";
import regSlice from "./regSlice";

const store = configureStore({
  reducer: {
    reg: regSlice.reducer,
  },
});

export default store;