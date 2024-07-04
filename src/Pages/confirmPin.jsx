import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setPin, clearPin } from "../redux/Reducers/reducersLogin";
import { pinValidate } from "../redux/Action/actionLogin";
import { useNavigate } from "react-router-dom";
import { setIsValidated } from "../redux/Reducers/DataBooking";
import "../App.css";
import { getPaymentCekout } from "../redux/Action/TiketAction";

export default function AddPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pin, setPinState] = useState("");
  const theState = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const pinRefs = useRef([]);

  // console.log("theState", theState);

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

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
    if (pin.length < 6) {
      toast.warning("Silahkan Inputkan Pin Anda!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    let params = new URLSearchParams(document.location.search);
    let checkoutId = params.get("checkoutId");
    // console.log("handleSubmit  checkoutId:", checkoutId);
    let metode_pembayaran = params.get("metode_pembayaran");
    // console.log("handleSubmit  metode_pembayaran:", metode_pembayaran);
    const response = await dispatch(
      pinValidate(pin, metode_pembayaran, checkoutId, navigate)
    ); // Kirim pin ke action creator createPin
    // console.log("RESPON", response);
    if (response.status === 200) {
      dispatch(getPaymentCekout(metode_pembayaran, checkoutId));

    }
    setLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="bg-white flex justify-center h-screen items-center w-[70%] max-sm:w-full mx-auto max-sm:px-2">
        <div className="w-full h-[482px]  max-sm:h-auto flex flex-col border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20">
          <h1 className="text-[24px] poppins-bold items-start ml-[84px] mt-[69px] max-sm:text-center max-sm:ml-0">
            Konfirmasi PIN
          </h1>
          <div className="flex flex-col justify-center place-items-center mt-[40px]">
            <p className="text-sm">Konfirmasi PIN dengan 6 angka</p>
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
                  ref={(el) => (pinRefs.current[i] = el)}
                />
              ))}
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="max-sm:w-[70%] w-[40%] h-[48px] max-sm:mb-5 flex mt-[81px] bg-[#176B87] hover:bg-[#114B5E] text-sm text-white rounded-2xl justify-center items-center"
            >
              {loading ? "Loading" : "Konfirmasi"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
