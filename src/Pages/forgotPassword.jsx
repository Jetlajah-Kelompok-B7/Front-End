import React, { useState } from "react";
import "../App.css";
import background from "../assets/images/bglogin.png";
import jetlajah from "../assets/images/logojetlajah.png";
import logogoogle from "../assets/images/logo-google.png";
import { setEmail, setPassword } from "../redux/Reducers/reducersLogin";
import { login } from "../redux/Action/actionLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.login?.email);
  const password = useSelector((state) => state.login?.password);
  const theState = useSelector((state) => state);
  console.log("theState", theState);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handleLogin = async () => {
    const response = await dispatch(login(email, password, navigate)); // Kirim email dan password ke action creator login
    if (response.status === 200) {
      window.location.reload();
    } else {
      alert("Gagal login. Silakan coba lagi."); // Handle error jika login gagal
    }
  };

  return (
    <div className="flex justify-between bg-[#FFFFFF] h-screen">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="max-sm:hidden mx-auto bg-gradient-to-r from-cyan-500 to-black bg-cover bg-center w-[50%] h-auto flex justify-center items-center rounded-e-3xl relative "
      >
        <img src={jetlajah} alt="Logo Jetlajah" width="30%" />
      </div>
      <div className="mx-auto w-[50%] h-[631px] flex justify-center items-center flex-col relative">
        <div className="flex flex-col justify-center ">
          <h1 className="flex justify-center text-[#176B87] poppins-bold text-3xl ">
            Lupa Password
          </h1>
          <div className="flex flex-col justify-center mt-7">
            <div>
              {/* Email */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Email/ No. Telpon
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Example: john.doe@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="hover:scroll-p-8 flex justify-center text-sm text-white py-3 bg-[#176B87] hover:bg-[#114B5E] rounded-full mt-5"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
