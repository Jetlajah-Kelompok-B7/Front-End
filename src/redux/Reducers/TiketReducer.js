import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lokasi: ["A", "B", "C", "AA", "AB", "AC"],
  lokasiTujuan: "A",
  LokasiKeberangkatan: "A",
  KelasPenerbangan: "",
  TanggalKeberangkatan: "Pilih Tanggal",
  TanggalKepulangan: "",
  TotalPenumpang: { Dewasa: 0, Anak: 0, Bayi: 0 },
  totalSemuaPenumpang: 0,
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
    setKeberangaktan: (state, action) => {
      state.TanggalKeberangkatan = action.payload;
    },
    setKepulangan: (state, action) => {
      state.TanggalKepulangan = action.payload;
    },
    setTotalPenumpang: (state, action) => {
      if (!state.TotalPenumpang) {
        state.TotalPenumpang = { Dewasa: 0, Anak: 0, Bayi: 0 };
      }
      const { Dewasa, Anak, Bayi } = action.payload;
      state.TotalPenumpang.Dewasa = Dewasa;
      state.TotalPenumpang.Anak = Anak;
      state.TotalPenumpang.Bayi = Bayi;
      state.totalSemuaPenumpang = Dewasa + Anak + Bayi;
    },
    hitungsemuapenumpang: (state, action) => {
      state.totalSemuaPenumpang = action.payload;
    },
  },
});

export const {
  setLokasiKeberangkatan,
  setLokasiTujuan,
  swapLokasi,
  setKelasPenerbangan,
  setKeberangaktan,
  setKepulangan,
  setTotalPenumpang,
  hitungsemuapenumpang,
} = tiketSlicer.actions;

export default tiketSlicer.reducer;
