import axios from "axios";
import { setTiketPesawat } from "../Reducers/FilterHargaReducers";
import { ColorizeSharp } from "@mui/icons-material";
import { setLokasi, setTiketPesawatPergi, setTiketPesawatPulang } from "../Reducers/TiketReducer";

export const GetTiket = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/ticket?page=1&page_size=10");
    if (response.status === 200) {
      dispatch(setLokasi(response?.data?.data));
      // console.log("semuaAPI", response?.data?.data);
    }
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// Fetch Data Bandara
export const GetDataBandara = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/airport");
    dispatch(setLokasi(response.data.data));
    //  console.log("CEK DATA BARU",response.data.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // alert(error.message);
      console.log("error", error.message);
      return;
    }
    // alert(error.message)
    console.log("error", error.message);
  }
};

// Fetch Data Tiket
export const getTiketSearch = (params) => async (dispatch) => {
  console.log("data params", params);
  const {
    bandara_keberangkatan,
    bandara_kedatangan,
    tanggal_pergi,
    tanggal_pulang,
    kelas,
    jumlah,
  } = params;

  try {
    // Fetch data tiket pergi
    let apiEndpoint1 = `/api/ticket?bandara_kedatangan=${bandara_kedatangan}&bandara_keberangkatan=${bandara_keberangkatan}&tanggal_pergi=${tanggal_pergi}&kelas=${kelas}&jumlah=${jumlah}`;
    const response1 = await axios.get(apiEndpoint1);
    dispatch(setTiketPesawatPergi(response1.data));
    console.log("CEK DATA PERGI", response1.data);

    // Fetch data tiket pulang jika tanggal_pulang ada
    if (tanggal_pulang !== "") {
      let apiEndpoint2 = `/api/ticket?bandara_keberangkatan=${bandara_kedatangan}&bandara_kedatangan=${bandara_keberangkatan}&tanggal_pergi=${tanggal_pulang}&kelas=${kelas}&jumlah=${jumlah}`;
      const response2 = await axios.get(apiEndpoint2);
      dispatch(setTiketPesawatPulang(response2.data));
      console.log("CEK DATA PULANG", response2.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error.message);
    } else {
      console.log("error", error.message);
    }
  }
};