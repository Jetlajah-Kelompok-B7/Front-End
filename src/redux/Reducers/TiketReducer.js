import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  lokasi: ["A", "B", "C", "AA", "AB", "AC"],
  lokasiTujuan: "A",
  LokasiKeberangkatan: "A",
  KelasPenerbangan: "",
};

const tiketSlicer = createSlice({
  name: "tiket",
  initialState,
  reducers: {
    setLokasiTujuan: (state, action) => {
      console.log("action.payload", action.payload);
      state.lokasiTujuan = action.payload;
    },
    setLokasiKeberangkatan: (state, action) => {
      state.LokasiKeberangkatan = action.payload;
    },
    swapLokasi: (state) => {
      const temp = state.lokasiTujuan;
      state.lokasiTujuan = state.LokasiKeberangkatan;
      state.LokasiKeberangkatan = temp;
    },
    setKelasPenerbangan: (state, action) => {
      state.KelasPenerbangan = action.payload;
    },
  },
});

export const {
  setLokasiKeberangkatan,
  setLokasiTujuan,
  swapLokasi,
  setKelasPenerbangan,
} = tiketSlicer.actions;

export default tiketSlicer.reducer;
