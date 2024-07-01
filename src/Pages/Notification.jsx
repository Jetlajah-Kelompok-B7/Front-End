import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../assets/components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../redux/Action/actionLogin";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInMinutes } from "date-fns";
import { id } from "date-fns/locale"; // Import locale ID

export default function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih
  const [isFiltered, setIsFiltered] = useState(false); // State untuk status filter

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  const theState = useSelector((state) => state);
  console.log("theState", theState);
  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch]);

  const data = useSelector((state) => state.login?.dataNotif);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setIsFiltered(true); // Set status filter menjadi true
  };

  const handleUnfilter = () => {
    setSelectedCategory("");
    setIsFiltered(false); // Set status filter menjadi false
  };

  const filteredData = selectedCategory
    ? data.filter((item) => item.kategori === selectedCategory)
    : data;

  const categories = data
    ? [...new Set(data.map((item) => item.kategori))]
    : [];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex w-full h-auto mt-[15px]">
          <div className="w-full flex lg:mx-auto">
            <div className="w-full flex flex-col justify-center mx-10 max-sm:mx-2 pb-5">
              <h1 className="poppins-bold ml-5 text-4xl">Notifikasi</h1>
              <div className=" mt-[22px]">
                <div className="flex flex-col w-full">
                  {/* BUTTON BERANDA */}
                  <button onClick={() => navigate("/")} className="w-full">
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
                  <div className="flex flex-col justify-center items-center">
                    {/* MAIN DATA */}
                    <div className="flex flex-col mt-3 py-3 w-full">
                      {/* FILTER */}
                      <div className="flex flex-col items-center gap-3">
                        <button
                          className="flex items-center justify-center gap-1 border-2 px-2 border-[#053B50] rounded-full w-[20%] max-sm:w-[50%]"
                          onClick={() => setIsFiltered(!isFiltered)} // Toggle filter status
                        >
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
                        {isFiltered && (
                          <div className="flex flex-col mt-3">
                            <h2 className="text-[#053B50] mb-2">
                              Pilih Kategori
                            </h2>
                            <select
                              onChange={(e) =>
                                handleFilterChange(e.target.value)
                              }
                              className="border-2 px-2 border-[#053B50] rounded-full"
                            >
                              <option value="">Semua Kategori</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={handleUnfilter}
                              className="mt-2 px-2 py-1 border-2 border-[#053B50] rounded-full text-[#053B50]"
                            >
                              Tutup Filter
                            </button>
                          </div>
                        )}
                      </div>
                      {/* DATA NOTIFIKASI */}
                      <div className="flex items-center w-full h-auto border-b-2 px-10 max-sm:px-0">
                        {data === undefined ? (
                          <p>Loading...</p>
                        ) : data.length === 0 ? (
                          <p>Belum ada notifikasi</p>
                        ) : (
                          <div className="flex flex-col gap-4 w-full">
                            {filteredData.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:gap-5 items-center sm:justify-between w-full h-auto border-b-2 mt-3 py-3"
                              >
                                <div className="flex flex-1 gap-5 ">
                                  {/* LOGO LONCENG */}
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
                                  <div className="flex-1 w-full">
                                    <h1 className="text-black text-xl w-full">
                                      {item.judul}
                                    </h1>
                                    <h2 className="text-[#8A8A8A] text-sm poppins-regular w-full">
                                      {item.deskripsi}
                                    </h2>
                                  </div>
                                </div>
                                <div className="flex justify-start items-center gap-2 max-sm:mt-5 max-sm:w-full text-end">
                                  <h2 className="text-[#8A8A8A] text-sm poppins-regular w-full">
                                    {new Intl.DateTimeFormat("id", {
                                      dateStyle: "full",
                                      timeStyle: "long",
                                      timeZone: "Asia/Jakarta",
                                    })
                                      .format(
                                        new Date(item.tanggal_waktu).getTime()
                                      )
                                      .split(" ")
                                      .filter((_, index) =>
                                        [1, 2, 5].includes(index)
                                      )
                                      .join(" ")}
                                  </h2>
                                  {item.kategori === "WARNING" && (
                                    <div className="size-2 rounded full bg-red-500"></div>
                                  )}
                                  {item.kategori === "INFO" && (
                                    <div className="size-2 rounded full bg-green-500"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
