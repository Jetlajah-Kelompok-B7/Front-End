import axios from "axios";
import { setTiketPesawat } from "../Reducers/FilterHargaReducers";
import { ColorizeSharp } from "@mui/icons-material";
import { setLokasi, setUserCondition } from "../Reducers/TiketReducer";
import { setLoginStatus } from "../Reducers/userConditionReducer";

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/profile`, {
      withCredentials: true,
    });
    dispatch(setUserCondition(response.data.status)); // Dispatching the action
  } catch (error) {
    dispatch(setUserCondition(error.response.status)); // Dispatching the action
  }
};

export const GetTiket = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/airport");
    if (response.status === 200) {
      dispatch(setLokasi(response?.data?.data));
    }
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetDataBandara = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/airport");
    dispatch(setLokasi(response.data));
    console.log("CEK DATA BARU", response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getTiketSearch = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "/api/ticket?bandara_keberangkatan=CGK&bandara_kedatangan=DPS&tanggal_pergi=2024-06-19&tanggal_pulang=2024-06-19&kelas=Economy"
    );
    dispatch(setTiketPesawat(response.data));
    // console.log("CEK DATA",response)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
