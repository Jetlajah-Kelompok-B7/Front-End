import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingTiketPesawatPergi: [],
  bookingTiketPesawatPulang: [],
  inputanDataPenumpang: [],
  metode_pembayaran: "",
  checkoutId: "",
  isValidated: false,
  dokumenBooking: [],
  dataCheckoutBerangkat: [],
  dataCheckoutPulang: [],
  dataPostCheckout: [],
  dataHasilCheckout: null,
  orderId: [],
  orderIdPergi:[],
  orderIdPulang:[]
};

const bookingSlicer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setIsValidated: (state, action) => {
      state.isValidated = action.payload;
    },
    setBookingTiketPergi: (state, action) => {
      state.bookingTiketPesawatPergi = action.payload;
    },
    setBookingTiketPulang: (state, action) => {
      state.bookingTiketPesawatPulang = action.payload;
    },

    //hasil inutan post isi data penumpang
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
    setDataChekoutPulang: (state, action) => {
      state.dataCheckoutPulang = action.payload;
    },
    setHasilPostCeckout: (state, action) => {
      state.dataPostCheckout = action.payload;
    },
    setDataHasilCheckot: (state, action) => {
      state.dataHasilCheckout = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setHasilPostDataPenumpangPergi: (state, action) => {
      state.orderIdPergi = action.payload;
    },
    setHasilPostDataPenumpangPulang: (state, action) => {
      state.orderIdPulang = action.payload;
    },
  },
});

export const {
  setIsValidated,
  setBookingTiketPergi,
  setBookingTiketPulang,
  setHasilPostDataPenumpang,
  setMetodePembayaran,
  setDokumenBooking,
  setDataChekoutBerangkat,
  setHasilPostCeckout,
  setDataChekoutPulang,
  setDataHasilCheckot,
  setOrderId,
  setHasilPostDataPenumpangPergi,
  setHasilPostDataPenumpangPulang,
  
} = bookingSlicer.actions;

export default bookingSlicer.reducer;
