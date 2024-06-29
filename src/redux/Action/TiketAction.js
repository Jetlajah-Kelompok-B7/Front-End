import axios from "axios";
import { setTiketPesawat } from "../Reducers/FilterHargaReducers";
import { ColorizeSharp } from "@mui/icons-material";
import {
  setLokasi,
  setTiketPesawatPergi,
  setTiketPesawatPulang,
  setDestinasiPesawat,
} from "../Reducers/TiketReducer";
import { setDataChekoutBerangkat, setHasilPostCeckout, setHasilPostDataPenumpang } from "../Reducers/DataBooking";

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



//post order data
export const getPayment = (orderId, paramsData ,navigate) => async (dispatch) => {
  try {
    // Tampilkan paramsData sebelum permintaan POST
    console.log("Data yang dikirim ke server:", paramsData.penumpang);

    const response = await axios.post(`/api/order/${orderId}`, paramsData.penumpang);
    
    console.log("Response Payment:", response);
    // Dispatch action Redux untuk meng-update status pengiriman data penumpang
    alert('Data Berhasil Tersimpan');
    
    dispatch(setHasilPostDataPenumpang(response)); // Sesuaikan dengan action yang ada di Redux Anda
    navigate("/payment");
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    alert('Kamu harus login dulu!');
  }
};


//Get DEtail Cekout
export const getDetailPesanan = (checkoutId) => async (dispatch) => {
  // console.log("getstatesereis",checkoutId);
  try {
    console.log("getstatesereis",checkoutId);
    const repsonse = await axios.get(
      `/api/checkout/${checkoutId}`
    );
     
    dispatch(setDataChekoutBerangkat(repsonse.data.data));
    console.log("seriesssss", repsonse.data.data);
  } catch (error) {
    // console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};


//post order data
export const getPaymentCekout = (metode_pembayaran, checkoutId, navigate) => async (dispatch) => {
  try {
    // Tampilkan paramsData sebelum permintaan POST
    console.log("Data yang Server:", metode_pembayaran);
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
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    alert("Kamu harus login dulu!");
  }
};