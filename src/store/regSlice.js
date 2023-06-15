import { createSlice } from "@reduxjs/toolkit";

const regSlice = createSlice({
  name: "reg",
  initialState: { reg: {} },
  reducers: {
    submit(state, action) {
      return state = action.payload;
    },
  },
});

export const regActions = regSlice.actions;

export default regSlice;
