import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggin: false,
  lokasi: [],
};

const TSlicer = createSlice({
  name: "condition",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoginStatus: (state, action) => {
      state.isLoggin = action.payload;
    },
    setPenerbangan: (state, action) => {
      state.lokasi = action.payload;
    },
  },
});

export const { setLoginStatus, setPenerbangan } = TSlicer.actions;

export default TSlicer.reducer;
