import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: null,
  nama: "",
  no_telp: "",
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNama: (state, action) => {
      state.nama = action.payload;
    },
    setNo_telp: (state, action) => {
      state.no_telp = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.token = null;
    },
  },
});

export const { setEmail, setPassword, setToken, setNama, setNo_telp, logout } =
  login.actions;

export default login.reducer;
