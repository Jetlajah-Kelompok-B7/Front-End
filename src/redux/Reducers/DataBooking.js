import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingTiketPesawatPergi: [],
  bookingTiketPesawatPulang: [],
};

const bookingSlicer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingTiketPergi: (state, action) => {
      state.bookingTiketPesawatPergi = action.payload;
    },
    setBookingTiketPulang: (state, action) => {
      state.bookingTiketPesawatPulang = action.payload;
    },
   
  },
});

export const { setBookingTiketPergi, setBookingTiketPulang} =
  bookingSlicer.actions;

export default bookingSlicer.reducer;
