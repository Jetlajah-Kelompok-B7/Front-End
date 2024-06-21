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

export const getTiketSearch = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "/api/ticket?bandara_keberangkatan=CGK&bandara_kedatangan=DPS&tanggal_pergi=2024-06-19&tanggal_pulang=2024-06-19&kelas=Economy"
    );
    dispatch(setTiketPesawat(response.data));
    console.log("CEK DATA",response)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message)
  }
};


