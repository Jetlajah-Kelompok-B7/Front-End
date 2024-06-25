import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { pinValidate } from "../redux/Action/actionLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function confirmPin() {
  const [pin, setPin] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;
    setPin([
      ...pin.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);

    // Move focus to the next input field
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && pin[index] === "") {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  }

  // function handleSubmit() {
  //   const pinValue = pin.join("");
  //   if (pinValue === "222222") {
  //     toast.success("PIN Terkonfirmasi", {
  //       position: "bottom-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } else {
  //     toast.error("PIN Salah", {
  //       position: "bottom-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // }

  const handleSubmit = async () => {
    const response = await dispatch(pinValidate(pin)); // Kirim email dan password ke action creator login
    console.log("response", response);
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
            {pin.map((data, i) => {
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
