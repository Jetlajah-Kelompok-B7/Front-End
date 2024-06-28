import React, { useState } from "react";
import "../App.css";
import background from "../assets/images/bgregister.png";
import jetlajah from "../assets/images/logojetlajah.png";
import {
  setEmail,
  setPassword,
  setNama,
  setNo_telp,
} from "../redux/Reducers/reducersLogin";
import { register } from "../redux/Action/actionLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isClicked, setIsClicked] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleClick = () => {
    setIsClicked(!isClicked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.login?.email);
  const password = useSelector((state) => state.login?.password);
  const nama = useSelector((state) => state.login?.nama);
  const no_telp = useSelector((state) => state.login?.no_telp);
  const theState = useSelector((state) => state);
  console.log("theState", theState);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value)); // Dispatch action untuk mengubah password di Redux state
  };
  const handleNamaChange = (event) => {
    dispatch(setNama(event.target.value)); // Dispatch action untuk mengubah password di Redux state
  };
  const handleNo_telpChange = (event) => {
    dispatch(setNo_telp(event.target.value)); // Dispatch action untuk mengubah password di Redux state
  };

  const handleRegister = async () => {
    const response = await dispatch(
      register(email, password, nama, no_telp, navigate)
    ); // Kirim email dan password ke action creator login
    if (response.status === 200) {
      window.location.reload();
    } else {
      alert("Gagal login. Silakan coba lagi."); // Handle error jika login gagal
    }
  };

  return (
    <div className="flex justify-between bg-[#FFFFFF] relative h-screen w-screen">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="max-sm:hidden mx-auto bg-gradient-to-r from-cyan-500 to-black bg-cover bg-center w-[50%] h-auto flex justify-center items-center rounded-e-3xl relative "
      >
        <img src={jetlajah} alt="Logo Jetlajah" width="30%" />
      </div>
      <div className="mx-auto w-[50%] h-[631px] flex justify-center items-center flex-col relative max-sm:p-auto">
        <div className="flex flex-col justify-center ">
          <h1 className="flex justify-center text-[#176B87] poppins-bold text-3xl ">
            Daftar
          </h1>
          <div className="flex flex-col justify-center mt-7">
            <div>
              {/* Input Nama */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Nama
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Example: John Doe"
                  onChange={handleNamaChange}
                />
              </div>
            </div>
            <div>
              {/* Input Email */}
              <label className="block mt-3 poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Email
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
            <div>
              {/* Input Nomor tilpun */}
              <label className="block mt-3 poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Nomor Telepon
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Example: +621234567890"
                  onChange={handleNo_telpChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              {/* Input Password */}
              <label className="block mt-3 poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={passwordType}
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Masukkan password"
                  onChange={handlePasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                  <button>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClick}
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke={isClicked ? "#176B87" : "#8A8A8A"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke={isClicked ? "#176B87" : "#8A8A8A"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleRegister}
            className="hover:scroll-p-8 flex justify-center text-sm text-white py-3 bg-[#176B87] hover:bg-[#114B5E] rounded-full mt-5"
          >
            Daftar
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <p>Sudah punya akun?</p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="poppins-bold text-[#176B87] hover:text-[#1C88AC] hover:underline"
          >
            Masuk di sini
          </button>
        </div>
      </div>
    </div>
  );
}
