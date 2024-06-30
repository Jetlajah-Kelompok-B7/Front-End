import React, { useState } from "react";
import "../App.css";
import background from "../assets/images/bglogin.png";
import jetlajah from "../assets/images/logojetlajah.png";
import { setEmail, setPassword } from "../redux/Reducers/reducersLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ConfirmPassword() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [passwordType1, setPasswordType1] = useState("password");

  const handleClick1 = () => {
    setIsClicked1(!isClicked1);
    setPasswordType1(passwordType1 === "password" ? "text" : "password");
  };

  const [isClicked2, setIsClicked2] = useState(false);
  const [passwordType2, setPasswordType2] = useState("password");

  const handleClick2 = () => {
    setIsClicked2(!isClicked2);
    setPasswordType2(passwordType2 === "password" ? "text" : "password");
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.login?.email);
  const password = useSelector((state) => state.login?.password);
  const theState = useSelector((state) => state);
  console.log("theState", theState);

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket.UserCondition;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Password Baru dan Konfirmasi Password Baru tidak sama.");
      return;
    }

    dispatch(setPassword(newPassword)); // Perbarui password di state Redux

    alert("Berhasil");
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
            Password
          </h1>
          <div className="flex flex-col justify-center mt-7">
            <div>
              {/* Email */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Password Baru
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={passwordType1}
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Masukkan Password Baru"
                  onChange={handleNewPasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                  <button>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClick1}
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke={isClicked1 ? "#176B87" : "#8A8A8A"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke={isClicked1 ? "#176B87" : "#8A8A8A"}
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
          <div className="flex flex-col justify-center mt-5">
            <div>
              {/* Password */}
              <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
                Konfirmasi Password Baru
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={passwordType2}
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Masukkan Konfirmasi Password Baru"
                  onChange={handleConfirmPasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                  <button>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClick2}
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke={isClicked2 ? "#176B87" : "#8A8A8A"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke={isClicked2 ? "#176B87" : "#8A8A8A"}
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
            onClick={handleChange}
            className="hover:scroll-p-8 flex justify-center text-sm text-white py-3 bg-[#176B87] hover:bg-[#114B5E] rounded-full mt-5"
          >
            Ganti
          </button>
        </div>
      </div>
    </div>
  );
}
