import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  nama: "",
  no_telp: "",
  pin: "",
  tanggal_lahir: "",
  alamat: "",
  file: null,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setNama: (state, action) => {
      state.nama = action.payload;
    },
    setNo_telp: (state, action) => {
      state.no_telp = action.payload;
    },
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    setTanggal_lahir: (state, action) => {
      state.tanggal_lahir = action.payload;
    },
    setAlamat: (state, action) => {
      state.alamat = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setNama,
  setNo_telp,
  setPin,
  setTanggal_lahir,
  setAlamat,
  setFile,
} = login.actions;

export default login.reducer;
