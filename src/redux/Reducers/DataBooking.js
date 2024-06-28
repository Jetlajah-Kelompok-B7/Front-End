import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingTiketPesawatPergi: [],
  bookingTiketPesawatPulang: [],
  inputanDataPenumpang:[],
  metode_pembayaran: "",
  dokumenBooking: [],
  dataCheckoutBerangkat: [],

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
    setHasilPostDataPenumpang: (state, action) => {
      state.inputanDataPenumpang = action.payload;
    },
    setMetodePembayaran: (state, action) => {
      state.metode_pembayaran = action.payload;
    },
    setDokumenBooking: (state, action) => {
      state.dokumenBooking = action.payload;
    },

    setDataChekoutBerangkat: (state, action) => {
      state.dataCheckoutBerangkat = action.payload;
    },
  },
});

export const { setBookingTiketPergi, setBookingTiketPulang,setHasilPostDataPenumpang, setMetodePembayaran, setDokumenBooking, setDataChekoutBerangkat} =
  bookingSlicer.actions;

export default bookingSlicer.reducer;
