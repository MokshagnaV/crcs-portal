import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "token",
  initialState: { token: "" },
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      return (state = { token: action.payload });
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
