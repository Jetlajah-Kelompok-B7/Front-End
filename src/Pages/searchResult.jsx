import React, { useState, useEffect } from "react";
import {
  ArrowLongLeftIcon,
  ArrowsUpDownIcon,
  RocketLaunchIcon,
  HeartIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../assets/components/Navbar";
import Filter from "../assets/components/Modal/Filter";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterHarga } from "../redux/Reducers/FilterHargaReducers";
import TiketPesanan from "../assets/components/Modal/TiketPesanan";
import { getTiketSearch, GetDataBandara } from "../redux/Action/TiketAction";

const ResultSearchFilm = () => {
  const dispatch = useDispatch();
  //Accoridon buka tutup
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const CurrentDate = (daysToIncrement = 0) => {
    const today = new Date();

    today.setDate(today.getDate() + daysToIncrement);

    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const indexHari = today.getDay();
    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const hari = namaHari[indexHari];

    const tanggal = `${date}/${month}/${year}`;

    return { hari, tanggal };
  };

  // Generate dates for the next 50 days
  const dates = Array.from({ length: 50 }, (_, i) => CurrentDate(i));

  // State for current page
  const [currentPage, setCurrentPage] = useState(0);

  // Constants for pagination
  const datesPerPage = 8;
  const totalPages = Math.ceil(dates.length / datesPerPage);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * datesPerPage;
  const endIndex = startIndex + datesPerPage;

  // Handle previous and next page clicks
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  // Modal Filter Harga
  const [filterHargaVisible, setFilterHargaVisible] = useState(false);
  const filterHargaUser = useSelector((state) => {
    return state.filter.filterHarga;
  });

  // Modal Tiket Peswat
  const [filterTiketPesawat, setTiketPesawatVisible] = useState(false);
  const filterTiketPesawatUser = useSelector((state) => {
    // console.log("pesawat", state);
    return state.filter.tiketPesawat;
  });

  const dataPenerbangan = [
    {
      Logo: "../public/images/garuda.png",
      namaMaskapai: "Garuda Indonesia",
      jamKeberangkatan: "07:00",
      jamKedatangan: "11:00",
      durasiPenerbangan: "4j0m",
      transit: "Direct",
      harga: "495000",
      tanggalKedatangan: "03/07/2024",
      tanggalKeberangakatan: "03/07/2024",
      bandaraKeberangkatan: "Soekarno Hatta",
      terminalKeberangkatan: "1A Domestik",
      kelasPenerbangan: "Ekonomi",
      kodeFlightKeberangkatan: "JKT",
      kodeFlightKedatangan: "SUB",
      jumlahPenumpang: "1",
      keteranganDatang: "KeDatangan",
      keteranganBerangkat: "Keberangkatan",
      jenisPesawat: "AirBus - 203",
      bagasi: "20",
      bagasiKabin: "7",
      Fasilitas: "Entertaimnet",
      bandaraKedatangan: "Djuanda Surabaya",
      terminalKedatangan: "1A Domestik",
    },
    {
      Logo: "../public/images/lionAir.png",
      namaMaskapai: "Lion Air",
      jamKeberangkatan: "07:00",
      jamKedatangan: "11:00",
      durasiPenerbangan: "4j0m",
      transit: "Direct",
      harga: "495000",
      tanggalKedatangan: "03/07/2024",
      tanggalKeberangakatan: "03/07/2024",
      bandaraKeberangkatan: "Soekarno Hatta",
      terminalKeberangkatan: "1A Domestik",
      kelasPenerbangan: "Ekonomi",
      jumlahPenumpang: "1",
      keteranganDatang: "KeDatangan",
      keteranganBerangkat: "Keberangkatan",
      jenisPesawat: "AirBus - 203",
      bagasi: "20",
      bagasiKabin: "7",
      Fasilitas: "Entertaimnet",
      bandaraKedatangan: "Djuanda Surabaya",
      terminalKedatangan: "1A Domestik",
    },
  ];

  useEffect(() => {
    // Reset filterHargaUser when component mounts
    dispatch(resetFilterHarga());
  }, [dispatch]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [iconRotasi, setIconRotasi] = useState({});

  const toggleDetails = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
    setIconRotasi((prevRotasi) => ({
      ...prevRotasi,
      [index]: prevRotasi[index] === "180" ? "0" : "180",
    }));
  };

  // Fetch DAta Tiket Pesawat
  const allPesawat = useSelector((state) => state);
  console.log("allpesawat",allPesawat)
  useEffect(() => {
    dispatch(getTiketSearch());
  }, []);

    // Fetch DAta Tiket Pesawat
    const allBnadar = useSelector((state) => state);
 
    useEffect(() => {
      dispatch(GetDataBandara());
    }, []);


  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="mx-5 md:mx-20 md:px-40">
        {/* Content Atas */}
        <div>
          <p className="text-2xl py-10 font-bold">Pilih Penerbangan</p>
          <div className="md:flex md:gap-2 gap-10">
            <button className="flex items-center md:pl-5 md:gap-5 md:w-[860px] md:h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl">
              <ArrowLongLeftIcon className="text-sm h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center" />
              JKT - SUB - 1 Penumpang - Ekonomi
            </button>
      
            <TiketPesanan
              visible={filterHargaVisible}
              onClose={() => setFilterHargaVisible(false)}
            />
          </div>
          <div className="mt-5 p-5 grid grid-cols-10 gap-3">
            <div className="flex  justify-start">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="bg-[#053B50] text-white font-semibold flex justify-center items-center rounded-xl disabled:opacity-50 w-10"
              >
                <ChevronLeftIcon className="h-6 w-6 text-white mr-1" />
              </button>
            </div>

            {dates.slice(startIndex, endIndex).map((date, index) => (
              <button
                key={index}
                className={`border-2 border-[#176B87] text-center rounded-lg ${
                  selectedButton === index + startIndex
                    ? "bg-[#77dad3]"
                    : "hover:bg-[#77dad3] duration-200"
                }`}
                onClick={() => handleButtonClick(index + startIndex)}
              >
                <p className="font-bold">{date.hari}</p>
                <p>{date.tanggal}</p>
              </button>
            ))}
            <div className="flex  justify-end">
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="bg-[#053B50] text-white font-semibold flex justify-center items-center rounded-xl disabled:opacity-50 w-10"
              >
                <ChevronRightIcon className="h-6 w-6 text-white mr-1" />
              </button>
            </div>
          </div>
          <div className="flex justify-between"></div>
        </div>

        {/* Tombol Filter atas */}
        <div className="py-5 flex justify-end relative ">
          <button
            className="p-2 h-[40px] border border-[#176B87] rounded-full py-2 flex items-center justify-center"
            onClick={() => setFilterHargaVisible(true)}
          >
            {filterHargaUser === "" ? (
              <div className="flex items-center text-[#176B87]">
                <ArrowsUpDownIcon className="h-6 w-6 text-[#176B87] mr-1" />
                <p className="text-[#176B87]">Lainnya</p>
              </div>
            ) : (
              <div className="whitespace-nowrap">{filterHargaUser}</div>
            )}
          </button>
          <Filter
            visible={filterHargaVisible}
            onClose={() => setFilterHargaVisible(false)}
          />
        </div>

        {/* Content bawah */}
        <div className="flex">
          {/* Accordion Filter Samping */}
          <div className="w-[300px] h-[auto] border-2 border-slate-100 p-5 rounded-xl shadow-xl">
            <p className="py-5 text-lg font-semibold text-[#176B87]">Filter</p>

            {/* Filter Transit */}
            <div>
              <button
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(1)}
              >
                <span className="flex justify-center items-center gap-2">
                  <RocketLaunchIcon className="h-6 w-6 text-slate-300 mr-1 pl-1 flex items-center" />
                  Transit
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 shrink-0 text-[#176B87] ${
                    openAccordion === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAccordion === 1 && (
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Transit
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      1 Transit
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      2+ Transit
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Fasilitas */}
            <div>
              <button
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(2)}
              >
                <span className="flex justify-center items-center gap-2">
                  <HeartIcon className="h-6 w-6 text-slate-300 mr-1 pl-1 flex items-center" />
                  Fasilitas
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 shrink-0 text-[#176B87] ${
                    openAccordion === 2 ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAccordion === 2 && (
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Bagasi 30 Kg
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Makanan
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      In-Flight Entertainment
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      USB Port
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Harga */}
            <div>
              <button
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(3)}
              >
                <span className="flex justify-center items-center gap-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-slate-300 mr-1 pl-1 flex items-center" />
                  Harga
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 shrink-0 text-[#176B87] ${
                    openAccordion === 3 ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAccordion === 3 && (
                <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <p>Content Harga</p>
                </div>
              )}
            </div>
          </div>

          {/* Result Penerbangan */}
          <div className="ml-4 flex-grow">
            <div className="container mx-auto">
              {dataPenerbangan.map((flight, index) => (
                <div
                  key={index}
                  className="p-5 shadow-lg border-2 border-slate-100 rounded-xl"
                >
                  <div>
                    {/* List penerbangan */}
                    <div>
                      <div className="flex justify-between">
                        <div className="flex gap-5">
                          <img
                            src={flight.Logo}
                            alt={flight.namaMaskapai}
                            className="h-10 w-10"
                          />
                          <div>
                            <p className="font-semibold">
                              {flight.namaMaskapai}
                            </p>
                            <p className="font-extralight">
                              {flight.kelasPenerbangan}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex flex-col items-end"
                          onClick={() => toggleDetails(index)}
                        >
                          <ChevronDownIcon
                            className={`h-6 w-6 text-[#176b87aa] text-bold  text-center rounded-full border-2 border-[#176b87aa]  p-1 flex items-center transform rotate-${iconRotasi[index]}`}
                          />
                        </div>
                      </div>
                      <div className="pl-16 mt-5 flex justify-between items-center">
                        <div className="flex gap-20">
                          <div className="flex flex-col items-center">
                            <p className="font-bold">
                              {flight.jamKeberangkatan}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.kodeFlightKeberangkatan}
                            </p>
                          </div>
                          <div>
                            <div className="border-b-2 px-20 ">
                              <p className="text-xs text-gray-500">
                                {flight.durasiPenerbangan}
                              </p>
                            </div>
                            <p className="text-xs  text-gray-500 text-center">
                              {flight.transit}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="font-bold">{flight.jamKedatangan}</p>
                            <p className="text-sm text-gray-500">
                              {flight.kodeFlightKedatangan}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-10">
                          <div>
                            <p className="font-semibold">{`IDR ${flight.harga}`}</p>
                            <button className="bg-[#176B87] rounded-lg py-2 px-5 text-white font-semibold">
                              Pilih
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Detail Penerbangan*/}
                    {openDropdown === index && (
                      <div className="mt-5 border-t-2">
                        <div className="px-5">
                          <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                            Detail Penerbangan
                          </p>
                          <div>
                            <div className="flex justify-between">
                              <p className="font-bold text-xl">
                                {flight.jamKeberangkatan}
                              </p>
                              <p className="font-semibold text-[#64CCC5]">
                                Keberangakatan
                              </p>
                            </div>

                            <p>{flight.tanggalKeberangakatan}</p>
                            <p>
                              {flight.bandaraKeberangkatan} -
                              {flight.terminalKeberangkatan}
                            </p>
                          </div>
                          <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                            <div className="flex items-center">
                              <img
                                src={flight.Logo}
                                alt={flight.namaMaskapai}
                                className="h-6 w-6"
                              />
                            </div>
                            <div>
                              <div className="font-bold pb-3">
                                <p>{flight.namaMaskapai}</p>
                                <p>{flight.jenisPesawat}</p>
                              </div>
                              <p className="font-bold">Informasi :</p>
                              <p>
                                {flight.kelasPenerbangan} -{" "}
                                {flight.jumlahPenumpang} Penumpang
                              </p>
                              <p>Bagasi {flight.bagasi} Kg</p>
                              <p>Bagasi Kabin {flight.bagasiKabin} Kg</p>
                              <p>Fasilitas {flight.Fasilitas}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <p className="font-bold text-xl">
                                {flight.jamKedatangan}
                              </p>
                              <p className="font-semibold text-[#64CCC5]">
                                Kedatangan
                              </p>
                            </div>

                            <p>{flight.tanggalKedatangan}</p>
                            <p>
                              {flight.bandaraKedatangan} -
                              {flight.terminalKedatangan}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSearchFilm;
