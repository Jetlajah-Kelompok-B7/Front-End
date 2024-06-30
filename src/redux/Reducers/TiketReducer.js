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
  typePenerbanngan: "Sekali Jalan",
  TotalPenumpang: { Dewasa: 0, Anak: 0, Bayi: 0 },
  totalSemuaPenumpang: 0,
  dataPesawatPergi: [],
  dataPesawatPulang: [],
  dataInputanSearch: [],
  lokasi:[],
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
    reset: () => initialState,
    setUserCondition: (state, action) => {
      state.UserCondition = action.payload;
    },
    setHalaman: (state, action) => {
      state.Halaman_Aktif = action.payload;
    },
    setkelas: (state, action) => {
      state.Kelas = action.payload;
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

    setTiketPesawatPergi: (state, action) => {
      state.dataPesawatPergi = action.payload;
    },

    setTiketPesawatPulang: (state, action) => {
      state.dataPesawatPulang = action.payload;
    },

    setInputSearch: (state, action) => {
      state.dataInputanSearch = action.payload;
    },
    setTypePenerbangan: (state, action) => {
      state.typePenerbanngan = action.payload;
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
  setTiketPesawatPergi,
  setTiketPesawatPulang,
  setInputSearch,
  reset,
  setHalaman,
  setTypePenerbangan,
} = tiketSlicer.actions;

export default tiketSlicer.reducer;
