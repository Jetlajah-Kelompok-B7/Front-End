import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { setPin } from "../redux/Reducers/reducersLogin";
import { pinValidate } from "../redux/Action/actionLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function confirmPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.login.pin);
  const theState = useSelector((state) => state);
  const [loading, setLoading] = useState("");
  console.log("theState", theState);

  // Fungsi untuk mengonversi string pin ke array
  const getPinArray = (c) => {
    // Pastikan pin adalah string
    c = pin?.toString() || ""; // Menggunakan nilai default jika pin adalah null atau undefined
    return c.split("").concat(new Array(6 - c.length).fill(""));
  };

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;
    const newPin = getPinArray(pin);
    newPin[index] = e.target.value;
    dispatch(setPin(newPin.join("")));

    // Pindah fokus ke input berikutnya
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  // Handles key down events in PIN input
  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      const newPin = getPinArray(pin);

      if (newPin[index] === "") {
        // Jika input saat ini kosong, pindah fokus ke input sebelumnya
        if (index > 0) {
          newPin[index - 1] = ""; // Kosongkan input sebelumnya
          dispatch(setPin(newPin.join("")));
          e.target.previousSibling.focus();
        }
      } else {
        // Hapus karakter di input saat ini
        newPin[index] = "";
        dispatch(setPin(newPin.join("")));
      }
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    const response = await dispatch(pinValidate(pin)); // Kirim pin ke action creator createPin
    setLoading(false);
    console.log("Response", response);
    if (response.status === 200) {
      toast.success("PIN Terkonfirmasi", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("PIN Salah", {
        position: "bottom-center",
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

  return (
    <div className="bg-white flex justify-center h-screen items-center">
      <div className="w-[737px] h-[482px] flex flex-col border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20">
        <h1 className="text-[24px] poppins-bold items-start ml-[84px] mt-[69px]">
          Konfirmasi PIN
        </h1>
        <div className="flex flex-col justify-center items-center mt-[40px]">
          <p className="text-sm">Masukkan PIN dengan 6 angka</p>
          <div className="flex gap-3 mt-[44px]">
            {getPinArray(pin).map((data, i) => {
              return (
                <input
                  key={i}
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={1}
                  className="input-pin"
                />
              );
            })}
          </div>
          <button
            onClick={handleSubmit}
            className="flex mt-[81px] w-[568px] h-[48px] bg-[#176B87] hover:bg-[#114B5E] text-sm text-white rounded-2xl justify-center items-center"
          >
            Simpan
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
