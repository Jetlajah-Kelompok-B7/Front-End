import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingTiketPesawat: [],
};

const bookingSlicer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingTiket: (state, action) => {
      state.bookingTiketPesawat = action.payload;
    },
   
  },
});

export const { setBookingTiket} =
  bookingSlicer.actions;

export default bookingSlicer.reducer;
