import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPin } from "../redux/Reducers/reducersLogin";
import { createPin } from "../redux/Action/actionLogin";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AddPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.login.pin);
  const theState = useSelector((state) => state);
  const [loading, setLoading] = useState("");
  console.log("theState", theState);

  // Fungsi untuk mengonversi string pin ke array
  const getPinArray = (pin) => {
    // Pastikan pin adalah string
    pin = pin || ""; // Menggunakan nilai default jika pin adalah null atau undefined
    return pin.split("").concat(new Array(6 - pin.length).fill(""));
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

  // useEffect(() => {
  //   dispatch(createPin());
  // }, [dispatch]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const response = await dispatch(createPin(pin, navigate));

  //   if (response.status === 200) {
  //     alert("Berhasil membuat PIN");
  //     window.location.reload(); // Reloading the page after successful PIN creation
  //     console.log("response", response);
  //   } else {
  //     alert("Gagal membuat PIN. Silakan coba lagi.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    const response = await dispatch(createPin(pin, navigate)); // Kirim email dan password ke action creator login
    setLoading(false);

    console.log("Response", response);
  };

  return (
    <div className="bg-white flex justify-center h-screen items-center">
      <div className="w-[737px] h-[482px] max-sm:w-[100px] max-sm:h-auto flex flex-col border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20">
        <h1 className="text-[24px] poppins-bold items-start ml-[84px] mt-[69px]">
          Buat PIN
        </h1>
        <div className="flex flex-col justify-center place-items-center mt-[40px]">
          <p className="text-sm">Buat PIN dengan 6 angka</p>
          <div className="flex gap-3 mt-[44px]">
            {getPinArray(pin).map((data, i) => (
              <input
                key={i}
                type="text"
                value={data}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                maxLength={1}
                className="input-pin"
              />
            ))}
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex mt-[81px] w-[568px] h-[48px] bg-[#176B87] hover:bg-[#114B5E] text-sm text-white rounded-2xl justify-center items-center"
          >
            {loading ? "Loading" : "Buat"}
          </button>
        </div>
      </div>
    </div>
  );
}
