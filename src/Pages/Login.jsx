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
  const theState = useSelector((state) => state);


  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value)); // Dispatch action untuk mengubah password di Redux state
  };

  const handleLogin = async () => {
    dispatch(login(email, password, navigate)); // Kirim email dan password ke action creator login
  };

  const handleOAuth = () => {
    window.open(`https://jetlajahin.vercel.app/api/auth/google/`, "_self");
  };

  return (
    <div className="flex justify-between bg-[#FFFFFF] h-screen">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="flex-1 max-lg:hidden max-sm:hidden mx-auto bg-gradient-to-r from-cyan-500 to-black bg-cover bg-center w-[50%] h-auto flex justify-center items-center rounded-e-3xl relative "
      >
        <img src={jetlajah} alt="Logo Jetlajah" width="30%" />
      </div>
      <div className="flex-1 mx-auto w-full max-lg:w-full h-screen flex justify-center items-center flex-col relative">
        <div className="flex flex-col justify-center mx-auto w-full my-5 px-10">
          <h1 className="flex justify-center text-[#176B87] poppins-bold text-3xl ">
            Masuk
          </h1>
          <div className="flex flex-col justify-center mt-7">
            <div>
              {/* Email */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Email
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Example: john.doe@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-5">
            <div>
              {/* Password */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={passwordType}
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
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
            onClick={() => navigate("/forgot")}
            className="flex justify-end text-[12px] text-[#176B87] hover:text-[#1C88AC] hover:underline mt-5"
          >
            Lupa kata sandi?
          </button>
          <button
            onClick={handleLogin}
            className="hover:scroll-p-8 flex justify-center text-sm text-white py-3 bg-[#176B87] hover:bg-[#114B5E] rounded-full mt-5"
          >
            Masuk
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-[#D0D0D0] text-sm">atau login/daftar dengan</p>
        </div>
        <div className="flex flex-col mt-6 ">
          <button
            onClick={handleOAuth}
            className="flex items-center justify-center"
          >
            <img
              src={logogoogle}
              alt="Logo Google"
              className="size-10 border p-2 ring-1 ring-slate-100 rounded-lg hover:bg-slate-100"
            />
          </button>
          <div className="flex justify-center gap-2 mt-6 max-sm:flex-col max-sm:items-center max-sm:mb-5">
            <p>Belum punya akun?</p>
            <button
              onClick={() => navigate("/register")}
              className="poppins-bold text-[#176B87] hover:text-[#1C88AC] hover:underline"
            >
              Daftar disini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
