import axios from "axios";
import { setTiketPesawat } from "../Reducers/FilterHargaReducers";
import { ColorizeSharp } from "@mui/icons-material";
import { setLokasi } from "../Reducers/TiketReducer";

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
    const response = await axios.get(
      "/api/airport"
    );
    dispatch(setLokasi(response.data.data));
    //  console.log("CEK DATA BARU",response.data.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // alert(error.message);
      console.log("error", error.message)
      return;
    }
    // alert(error.message)
    console.log("error", error.message)
  }
};

//Fetch Data Tiket
export const getTiketSearch = (params) => async (dispatch) => {

  console.log("data paarams", params)
  const {
    bandara_keberangkatan,
    bandara_kedatangan,
    tanggal_pergi,
    tanggal_pulang,
    kelas,
    jumlah,
  } = params;

  try {
    let apiEndpoint = `/api/ticket?bandara_kedatangan=${bandara_kedatangan}&bandara_keberangkatan=${bandara_keberangkatan}&tanggal_pergi=${tanggal_pergi}&tanggal_pulang=${ tanggal_pulang}&kelas=${kelas}&jumlah=${jumlah}`;

    if (tanggal_pulang) {
      
      // Jika tanggal_pulang ada (berarti mode pulang pergi)
      apiEndpoint += `&tanggal_pulang=${tanggal_pulang}`;
    }

    const response = await axios.get(apiEndpoint);

    dispatch(setTiketPesawat(response.data)); // Menyimpan data tiket ke Redux state
    // console.log("CEK DATA", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
    } else {
      alert(error.message);
    }
  }
};

