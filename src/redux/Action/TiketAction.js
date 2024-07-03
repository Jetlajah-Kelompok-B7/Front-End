import axios from "axios";
import { setTiketPesawat } from "../Reducers/FilterHargaReducers";
import { ColorizeSharp } from "@mui/icons-material";
import {
  setHistroy,
  setLoginStatus,
  setPenerbangan,
} from "../Reducers/TiketReducerforSecure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const tikethistory = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/history`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setHistroy(response.data.data));
  } catch (error) {}
};

import {
  setDestinasiPesawat,
  setTiketPesawatPergi,
  setTiketPesawatPulang,
} from "../Reducers/TiketReducer";
import {
  setDataChekoutBerangkat,
  setDataHasilCheckot,
  setHasilPostCeckout,
  setHasilPostDataPenumpang,
  setHasilPostDataPenumpangPergi,
  setHasilPostDataPenumpangPulang,
} from "../Reducers/DataBooking";
import { setOrderId } from "../Reducers/DataBooking";

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/profile`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setLoginStatus(response.data.status));
  } catch (error) {
    dispatch(setLoginStatus(error.response.status));
  }
};

//DATA BANDA
export const GetTiket = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/airport");
    if (response.status === 200) {
      dispatch(setPenerbangan(response.data.data));
    }
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// Fetch Data Tiket
export const getTiketSearch = () => async (dispatch, getState) => {
  // console.log("GET STATE",getState().tiket)
  const {
    KelasPenerbangan,
    LokasiKeberangkatan,
    TanggalKeberangkatan,
    TanggalKepulangan,
    lokasiTujuan,
    totalSemuaPenumpang,
  } = getState().tiket;

  try {
    // Fetch data tiket pergi
    let apiEndpoint1 = `/api/ticket?bandara_keberangkatan=${LokasiKeberangkatan}&bandara_kedatangan=${lokasiTujuan}&tanggal_pergi=${TanggalKeberangkatan}&kelas=${KelasPenerbangan}&jumlah=${totalSemuaPenumpang}`;
    const response1 = await axios.get(apiEndpoint1);
    dispatch(setTiketPesawatPergi(response1.data));
    // console.log("CEK DATA PERGI", apiEndpoint1);

    // Fetch data tiket pulang jika tanggal_pulang ada
    if (TanggalKepulangan !== "") {
      let apiEndpoint2 = `/api/ticket?bandara_keberangkatan=${lokasiTujuan}&bandara_kedatangan=${LokasiKeberangkatan}&tanggal_pergi=${TanggalKepulangan}&kelas=${KelasPenerbangan}&jumlah=${totalSemuaPenumpang}`;
      const response2 = await axios.get(apiEndpoint2);
      dispatch(setTiketPesawatPulang(response2.data));
      // console.log("CEK DATA PULANG", response2.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error.message);
    } else {
      console.log("error", error.message);
    }
  }
};

//post order data
export const getPayment =
  (orderId, paramsData, navigate) => async (dispatch, getState) => {
    const tipePenumpang = getState().tiket?.typePenerbanngan;
    // console.log("Data ID PERGI", orderId);
    try {
      // Tampilkan paramsData sebelum permintaan POST
      // console.log("Data yang dikirim ke server:", paramsData);

      // Proses untuk penerbangan pertama (pergi)
      const response1 = await axios.post(
        `/api/order/${orderId[0]}`,
        paramsData.penumpang
      );
      console.log("Response Payment Sekali Jalan:", response1.data.checkoutId);
      dispatch(setHasilPostDataPenumpang(response1.data.checkoutId)); // Pastikan payload benar

      // Jika tipe penumpang adalah "Pergi - Pulang" dan ada ID untuk penerbangan pulang
      if (
        tipePenumpang === "Pergi - Pulang" &&
        orderId.length === 2 &&
        typeof orderId[1] === "number"
      ) {
        const response2 = await axios.post(
          `/api/order/${orderId[1]}`,
          paramsData.penumpang
        );
        // console.log("Response Payment Pulang Pergi:", response2);
        dispatch(setHasilPostDataPenumpang(response2.data)); // Pastikan payload benar
      }

      // Dispatch action Redux untuk meng-update status pengiriman data penumpang

      toast.success("Data Berhasil Tersimpan", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // Navigasi ke halaman pembayaran
      navigate("/Payment");
   
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Kamu harus login dulu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // alert("");
    }
  };

//Get DEtail Cekout
export const getDetailPesanan = (checkoutId) => async (dispatch) => {
  try {
    const repsonse = await axios.get(`/api/checkout/${checkoutId}`);
    // console.log("checkoutId", checkoutId);
    dispatch(setDataChekoutBerangkat(repsonse.data.data));
    console.log("seriesssss", repsonse);
    return repsonse;
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

//post order data
export const getPaymentCekout =
  (metode_pembayaran, checkoutId) => async (dispatch) => {
    // console.log("ckoitu IDD", checkoutId);
    // console.log("Data yang Server:", metode_pembayaran);
    try {
      // Tampilkan paramsData sebelum permintaan POST

      const response = await axios.post(
        `/api/checkout/${checkoutId}`,
        {
          metode_pembayaran,
        },
        {
          withCredentials: true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(
      //   "RESPON HSITORY",
      //   response?.data?.data?.History_Transaction?.id
      // );
      dispatch(
        setDataHasilCheckot(response?.data?.data?.History_Transaction?.id)
      );
      return response.status;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Kamu harus login dulu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
