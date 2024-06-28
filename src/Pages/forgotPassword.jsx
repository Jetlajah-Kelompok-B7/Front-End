import React, { useState, useEffect } from "react";
import "../App.css";
import background from "../assets/images/bglogin.png";
import jetlajah from "../assets/images/logojetlajah.png";
import { setEmail, clearMessage } from "../redux/Reducers/reducersLogin";
import { forgotPassword } from "../redux/Action/actionLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.login?.email);
  const pesan = useSelector((state) => state.login?.message);
  const [isActivePage, setIsActivePage] = useState(true);

  const theState = useSelector((state) => state);
  console.log("theState", theState);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value)); // Dispatch action untuk mengubah email di Redux state
  };

  const handleForgot = async () => {
    await dispatch(forgotPassword(email)); // Kirim email dan password ke action creator login
  };

  useEffect(() => {
    setIsActivePage(true); // Set the page as active on component mount
    return () => setIsActivePage(false); // Set the page as inactive on component unmount
  }, []);

  useEffect(() => {
    if (pesan && isActivePage) {
      const timer = setTimeout(() => {
        if (isActivePage) {
          dispatch(clearMessage());
        }
      }, 10000); // Clear message after 5 min

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [pesan, dispatch, isActivePage]);

  return (
    <div className="flex justify-between bg-[#FFFFFF] h-screen">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="max-sm:hidden mx-auto bg-gradient-to-r from-cyan-500 to-black bg-cover bg-center w-[50%] h-auto flex justify-center items-center rounded-e-3xl relative "
      >
        <img src={jetlajah} alt="Logo Jetlajah" width="30%" />
      </div>
      <div className="mx-auto w-[50%] h-[631px] flex justify-center items-center flex-col relative">
        <div className="flex flex-col justify-center p-10">
          <h1 className="flex justify-center text-[#176B87] poppins-bold text-3xl ">
            Lupa Password
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
                  className="block w-[400px] rounded-xl border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                  placeholder="Example: john.doe@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleForgot}
            className="hover:scroll-p-8 flex justify-center text-sm text-white py-3 bg-[#176B87] hover:bg-[#114B5E] rounded-full mt-5"
          >
            Reset Password
          </button>

          {pesan && (
            <p className="mt-4 text-[#176B87] text-center ">{pesan.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
