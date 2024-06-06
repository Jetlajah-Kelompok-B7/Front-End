import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterHarga: "",
  tiketPesawat: [],
};

const filterSlicer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterHarga: (state, action) => {
      state.filterHarga = action.payload;
    },
    setTiketPesawat: (state, action) => {
      state.tiketPesawat = action.payload;
    },
    resetFilterHarga: (state) => {
      state.filterHarga = "";
    },
  },
});

export const { setFilterHarga, resetFilterHarga, setTiketPesawat } =
  filterSlicer.actions;

export default filterSlicer.reducer;
