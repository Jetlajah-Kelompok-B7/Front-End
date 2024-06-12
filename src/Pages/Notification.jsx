import react from "react";
import "../App.css";
import Navbar from "../assets/components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex w-full h-auto mt-[15px]">
          <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full pb-5">
              <h1 className="poppins-bold ml-5">Notifikasi</h1>
              <div className=" mt-[22px]">
                {/* Toogle Beranda dan Form */}
                <div className="flex">
                  <div className="flex flex-col justify-center items-center">
                    {/* Toogle Beranda */}
                    <button onClick={() => navigate("/")} className="w-[777px]">
                      <div className="flex items-center text-white text-left px-[16px] mx-5 w-auto h-[55px] bg-[#176B87] hover:bg-[#2b5b6b] rounded-xl gap-[8px]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 12H5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 19L5 12L12 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h1>Beranda</h1>
                      </div>
                    </button>
                    {/* Form */}
                    <div className="flex items-center justify-between w-[95%] max-w-[95%] h-auto border-b-2 mt-3 py-3">
                      <div className="flex gap-5">
                        {/* Bell */}
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 18.5C12.4167 18.5 12.7707 18.354 13.062 18.062C13.354 17.7707 13.5 17.4167 13.5 17H10.5C10.5 17.4167 10.646 17.7707 10.938 18.062C11.2293 18.354 11.5833 18.5 12 18.5ZM7 16H17V14H16V11.4C16 10.3833 15.7377 9.454 15.213 8.612C14.6877 7.77067 13.95 7.23333 13 7V5.5H11V7C10.05 7.23333 9.31267 7.77067 8.788 8.612C8.26267 9.454 8 10.3833 8 11.4V14H7V16ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22Z"
                              fill="#176B87"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </div>
                        {/* Main */}
                        <div className="">
                          <h2 className="text-[#8A8A8A] text-sm poppins-regular">
                            Kategori
                          </h2>
                          <h1 className="text-black text-xl">Lorem ipsum</h1>
                          <h2 className="text-[#8A8A8A] text-sm poppins-regular bg-red-200">
                            Lorem ipsum dolor
                          </h2>
                        </div>
                      </div>
                      <div className="flex justify-start items-start ">
                        {/* Tanggal */}
                        <h2 className="text-[#8A8A8A] text-sm poppins-regular">
                          Tanggal
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* filter */}
                  <div className="flex justify-start items-start">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <button className="flex items-center gap-1 border-2 px-2 border-[#053B50] rounded-full">
                        <div>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_252_3076)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.66602 2.49935C1.66602 2.03911 2.03911 1.66602 2.49935 1.66602H17.4993C17.9596 1.66602 18.3327 2.03911 18.3327 2.49935V4.65417C18.3327 5.0962 18.1571 5.52012 17.8445 5.83268L12.4993 11.1779V15.8327C12.4993 16.1483 12.321 16.4369 12.0387 16.578L8.70536 18.2447C8.44704 18.3739 8.14025 18.3601 7.89457 18.2082C7.64889 18.0564 7.49935 17.7882 7.49935 17.4994V11.1779L2.15417 5.83268C1.84161 5.52012 1.66602 5.0962 1.66602 4.65417V2.49935ZM3.33268 3.33268V4.65417L8.92194 10.2434C9.07822 10.3997 9.16602 10.6117 9.16602 10.8327V16.151L10.8327 15.3177V10.8327C10.8327 10.6117 10.9205 10.3997 11.0768 10.2434L16.666 4.65417V3.33268H3.33268Z"
                                fill="#053B50"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_252_3076">
                                <rect
                                  width="16.6667"
                                  height="16.6667"
                                  fill="white"
                                  transform="translate(1.66602 1.66602)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <h2 className="text-[#053B50]">Filter</h2>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
