import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPin, clearPin } from "../redux/Reducers/reducersLogin";
import { createPin } from "../redux/Action/actionLogin";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AddPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pin, setPinState] = useState("");
  const theState = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const pinRefs = useRef([]);

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  console.log("theState", theState);

  // Fungsi untuk mengonversi string pin ke array
  const getPinArray = (c) => {
    c = pin?.toString() || "";
    return c.split("").concat(new Array(6 - c.length).fill(""));
  };

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;
    const newPin = getPinArray(pin);
    newPin[index] = e.target.value;
    setPinState(newPin.join(""));

    // Pindah fokus ke input berikutnya
    if (e.target.value && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      const newPin = getPinArray(pin);

      if (newPin[index] === "") {
        // Jika input saat ini kosong, pindah fokus ke input sebelumnya
        if (index > 0) {
          newPin[index - 1] = ""; // Kosongkan input sebelumnya
          dispatch(clearPin());
          pinRefs.current[index - 1].focus();
        }
      } else {
        // Hapus karakter di input saat ini
        newPin[index] = "";
      }
      dispatch(setPin(newPin.join("")));
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    const response = await dispatch(createPin(pin, navigate)); // Kirim pin ke action creator createPin
    setLoading(false);
    console.log("Response", response);
  };

  return (
    <div className="bg-white flex justify-center h-screen items-center w-[70%] max-sm:w-full mx-auto max-sm:px-2">
      <div className="w-full h-[482px]  max-sm:h-auto flex flex-col border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20">
        <h1 className="text-[24px] poppins-bold items-start ml-[84px] mt-[69px] max-sm:text-center max-sm:ml-0">
          Buat PIN
        </h1>
        <div className="flex flex-col justify-center place-items-center mt-[40px]">
          <p className="text-sm">Buat PIN dengan 6 angka</p>
          <div className="flex gap-1 mt-[44px]">
            {getPinArray(pin).map((data, i) => (
              <input
                key={i}
                type="text"
                value={data}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                maxLength={1}
                className="input-pin"
                ref={(el) => (pinRefs.current[i] = el)}
              />
            ))}
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="max-sm:w-[70%] w-[40%] h-[48px] max-sm:mb-5 flex mt-[81px] bg-[#176B87] hover:bg-[#114B5E] text-sm text-white rounded-2xl justify-center items-center"
          >
            {loading ? "Loading" : "Buat"}
          </button>
        </div>
      </div>
    </div>
  );
}