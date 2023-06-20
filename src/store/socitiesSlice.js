import { createSlice } from "@reduxjs/toolkit";

const socitiesSlice = createSlice({
  name: "socities",
  initialState: { socities: [], year: "" },
  reducers: {
    setSocities(state, action) {
      state.socities = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
  },
});

export const socitiesActions = socitiesSlice.actions;

export default socitiesSlice;
