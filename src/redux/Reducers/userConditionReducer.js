import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggin: false,
};

const CSlicer = createSlice({
  name: "condition",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoginStatus: (state, action) => {
      state.isLoggin = action.payload;
      console.log('first', action.payload)
    },
  },
});

export const { setLoginStatus } = CSlicer.actions;

export default CSlicer.reducer;
