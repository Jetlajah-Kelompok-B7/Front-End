import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  nama: "",
  no_telp: "",
  pin: "",
  tanggal_lahir: "",
  alamat: "",
  file: "",
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
    setLogout: (state) => {
      state.nama = "";
      state.email = "";
      state.password = "";
      state.no_telp = "";
      state.pin = "";
      state.tanggal_lahir = "";
      state.alamat = "";
      state.file = "";
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
  setLogout,
} = login.actions;

export default login.reducer;
