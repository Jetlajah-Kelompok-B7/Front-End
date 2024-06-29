import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idTiket: 1,
  Halaman_Aktif: "",
  UserCondition: null,
  lokasiTujuan: "",
  LokasiKeberangkatan: "",
  KelasPenerbangan: "",
  TanggalKeberangkatan: "",
  TanggalKepulangan: "",
  TotalPenumpang: { Dewasa: 0, Anak: 0, Bayi: 0 },
  totalSemuaPenumpang: 0,
};

const tiketSlicer = createSlice({
  name: "tiket",
  initialState,
  reducers: {
    reset: () => initialState,
    setUserCondition: (state, action) => {
      state.UserCondition = action.payload;
    },
    setHalaman: (state, action) => {
      state.Halaman_Aktif = action.payload;
    },
    setkelas: (state, action) => {
      state.kelas = action.payload;
    },
    setSemua: (state, action) => {
      state.SemuaData = action.payload;
    },
    setLokasiKeberangkatan: (state, action) => {
      state.LokasiKeberangkatan = action.payload;
    },
    setDestinasiPesawat: (state, action) => {
      state.lokasiTujuan = action.payload;
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
  setUserCondition,
  setSemua,
  setKelasPenerbangan,
  setKeberangaktan,
  setKepulangan,
  setTotalPenumpang,
  setDestinasiPesawat,
  setkelas,
  hitungsemuapenumpang,
  reset,
  setHalaman,
} = tiketSlicer.actions;

export default tiketSlicer.reducer;
