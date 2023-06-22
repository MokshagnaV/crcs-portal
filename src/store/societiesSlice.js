import { createSlice } from "@reduxjs/toolkit";

const societiesSlice = createSlice({
  name: "societies",
  initialState: { societies: [], year: "" },
  reducers: {
    setSocieties(state, action) {
      state.societies = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
  },
});

export const societiesActions = societiesSlice.actions;

export default societiesSlice;
