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
import { getTiketSearch } from "../redux/Action/TiketAction";
import { useNavigate } from "react-router-dom";
import {
  setBookingTiketPergi,
  setBookingTiketPulang,
} from "../redux/Reducers/DataBooking";

const ResultSearchFilm = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null); //Accoridon buka tutup
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [filterHargaVisible, setFilterHargaVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [iconRotasi, setIconRotasi] = useState({});
  const [searchDate, setSearchDate] = useState(null); // State untuk tanggal pencarian
  const [selectedPergi, setSelectedPergi] = useState(null);
  const [selectedPulang, setSelectedPulang] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Define params here
  const params = useSelector((state) => state.tiket.dataInputanSearch);
  // console.log("parm", params);

  const { bandara_keberangkatan, bandara_kedatangan, jumlah, kelas } = params;

  //Accoridon buka tutup
  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  // const handleButtonClick = (index) => {
  //   setSelectedButton(index);
  //   setCurrentPage(Math.floor(index / datesPerPage));
  // };

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
    const tanggal = `${year}/${month}/${date}`;
    return { hari, tanggal };
  };

  // Generate dates for the next 50 days
  const dates = Array.from({ length: 50 }, (_, i) => CurrentDate(i));

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
  const filterHargaUser = useSelector((state) => {
    return state.filter.filterHarga;
  });

  useEffect(() => {
    // Reset filterHargaUser when component mounts
    dispatch(resetFilterHarga());
  }, [dispatch]);

  const toggleDetails = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
    setIconRotasi((prevRotasi) => ({
      ...prevRotasi,
      [index]: prevRotasi[index] === "180" ? "0" : "180",
    }));
  };



  // Fetch DAta Tiket Pesawat
  const tiketData = useSelector((state) => state.filter.tiketPesawat.data);
  // console.log("allPesawat", tiketData);

  //Menapilkan tiket pergi
  const tiketPergi = useSelector((state) => state.tiket.dataPesawatPergi.data);
  console.log("tiket pergi", tiketPergi);

  //Menampilkan tikel pulang
  const tiketPulang = useSelector(
    (state) => state.tiket.dataPesawatPulang.data
  );
  console.log("tiket pulang", tiketPulang);

  const ambiltype = useSelector(
    (state) => state.tiket.dataInputanSearch.jenisPenerbangan
  );
  console.log("TYPE", ambiltype);

  const handleSelectPergi = (flight) => {
    setSelectedPergi(flight);
    dispatch(setBookingTiketPergi(flight));

    if (ambiltype === "Sekali Jalan") {
      // Jika tidak ada tiket pulang, langsung ke halaman isi data penumpang
      navigate("/travelDokumen");
    }
  };

  const handleSelectPulang = (flight) => {
    setSelectedPulang(flight);
    dispatch(setBookingTiketPulang(flight));
    navigate("/travelDokumen");
  };

  // function ubah waktu
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date?.getUTCHours()).padStart(2, "0");
    const minutes = String(date?.getUTCMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // function durasi
  const calculateFlightDuration = (takeoffTime, landingTime) => {
    const takeoffDate = new Date(takeoffTime);
    const landingDate = new Date(landingTime);

    const durationInMinutes = (landingDate - takeoffDate) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}j${minutes}m`;
  };

  //function format tanggal
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[date.getUTCMonth()]; // getUTCMonth() is zero-based
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };

  const handleDateSelect = (selectedDate) => {
    // Perbarui state searchDate
    setSearchDate(selectedDate);

    // Perbarui params dengan tanggal_pergi yang baru
    const updatedParams = {
      ...params,
      tanggal_pergi: selectedDate,
      tanggal_pulang: selectedDate,
    };

    // Dispatch action untuk memperbarui pencarian berdasarkan tanggal baru
    dispatch(getTiketSearch(updatedParams));
  };
  const buttonText = `${bandara_keberangkatan} - ${bandara_kedatangan} - ${jumlah} Penumpang - ${kelas}`;

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="mx-5 md:mx-20 md:px-40">
        {/* Content Atas */}
        <div>
          <p className="text-2xl py-10 font-bold">Pilih Penerbangan</p>
          <div className="md:flex md:gap-2 gap-10">
            <button
              onClick={() => navigate("/")} // Navigasi ke root ("/")
              className="flex items-center md:pl-5 md:gap-5 md:w-[860px] md:h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl"
            >
              <ArrowLongLeftIcon className="text-sm h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center" />
              {buttonText}
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

            {dates.slice(startIndex, endIndex).map((date, index) => {
              const isSelected = selectedButton === index + startIndex;
              const isSearchDate = searchDate === date.tanggal;

              return (
                <button
                  key={index}
                  className={`border-2 border- text-center rounded-lg ${
                    isSelected || isSearchDate
                      ? "bg-[#176B87] text-white"
                      : "hover:bg-[#77dad3] duration-200"
                  }`}
                  onClick={() => handleDateSelect(date.tanggal)}
                >
                  <p className="font-bold">{date.hari}</p>
                  <p>{date.tanggal}</p>
                </button>
              );
            })}
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
            <h2 className="text-2xl font-bold mb-4 mt-8">Pilih Tiket Pergi</h2>
            <div className="container mx-auto">
              {" "}
              {tiketPergi.length > 0 ? (
                tiketPergi.map((flight, index) => (
                  <div
                    key={index}
                    className="p-5 shadow-lg border-2 border-slate-100 rounded-xl mb-4"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div className="flex gap-5">
                          <img
                            src={flight.plane.logo}
                            alt={flight.plane.airline_name}
                            className="h-10 w-10"
                          />
                          <div>
                            <p className="font-semibold">
                              {flight.plane.airline_name}
                            </p>
                            <p className="font-extralight">{flight.class}</p>
                          </div>
                        </div>
                        <div
                          className="flex flex-col items-end"
                          onClick={() => toggleDetails(index)}
                        >
                          <ChevronDownIcon
                            className={`h-6 w-6 text-[#176b87aa] text-bold text-center rounded-full border-2 border-[#176b87aa] p-1 flex items-center transform ${
                              openDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      <div className="pl-16 mt-5 flex justify-between items-center">
                        <div className="flex gap-20">
                          <div className="flex flex-col items-center">
                            <p className="font-bold">
                              {formatTime(flight.schedule.takeoff.time)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.schedule.takeoff.airport_code}
                            </p>
                          </div>
                          <div>
                            <div className="border-b-2 px-20">
                              <p className="text-xs text-gray-500">
                                {calculateFlightDuration(
                                  flight.schedule.takeoff.time,
                                  flight.schedule.landing.time
                                )}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                              {flight.transit}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="font-bold">
                              {formatTime(flight.schedule.landing.time)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.schedule.landing.airport_code}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-10 justify-end">
                          <div className="flex flex-col justify-end">
                            <p className="font-semibold text-red-600">
                              Rp. {flight.price}/ Pax
                            </p>
                            <button
                              className="bg-[#176B87] rounded-lg py-2 px-5 text-white font-semibold"
                              onClick={() => handleSelectPergi(flight)}
                            >
                              Pilih
                            </button>
                          </div>
                        </div>
                      </div>
                      {openDropdown === index && (
                        <div className="mt-5 border-t-2">
                          <div className="px-5">
                            <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                              Detail Penerbangan
                            </p>
                            <div>
                              <div className="flex justify-between">
                                <p className="font-bold text-xl">
                                  {formatTime(flight.schedule.takeoff.time)}
                                </p>
                                <p className="font-semibold text-[#64CCC5]">
                                  Keberangkatan
                                </p>
                              </div>
                              <p>{formatDate(flight.schedule.takeoff.time)}</p>
                              <p>
                                {flight.schedule.takeoff.airport_name} -{" "}
                                {flight.terminalKeberangkatan}
                              </p>
                            </div>
                            <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                              <div className="flex items-center">
                                <img
                                  src={flight.plane.logo}
                                  alt={flight.plane.airline_name}
                                  className="h-6 w-6"
                                />
                              </div>
                              <div>
                                <div className="font-bold pb-3">
                                  <p>{flight.plane.airline_name}</p>
                                  <p>{flight.plane.model}</p>
                                </div>
                                <p className="font-bold">Informasi:</p>
                                <p>{flight.class}</p>
                                <p>Bagasi {flight.plane.baggage} Kg</p>
                                <p>
                                  Bagasi Kabin {flight.plane.cabin_baggage} Kg
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between">
                                <p className="font-bold text-xl">
                                  {formatTime(flight.schedule.landing.time)}
                                </p>
                                <p className="font-semibold text-[#64CCC5]">
                                  Kedatangan
                                </p>
                              </div>
                              <p>{formatDate(flight.schedule.landing.time)}</p>
                              <p>
                                {flight.schedule.landing.airport_name} -{" "}
                                {flight.terminalKedatangan}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center text-center py-10">
                  <img
                    src="/images/notFoundData.png"
                    alt=""
                    className="w-60 h-auto"
                  />
                  <p className="text-lg font-semibold">
                    Maaf, pencarian Anda tidak ditemukan
                  </p>
                  <p className="text-sm text-[#176B87] font-semibold">
                    Coba cari perjalanan lainnya!
                  </p>
                </div>
              )}
              {ambiltype == "Pergi - Pulang" && (
                <>
                  {tiketPulang.length > 0 && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 mt-8">
                        Pilih Tiket Pulang
                      </h2>
                      {tiketPulang.map((flight, index) => (
                        <div
                          key={index}
                          className="p-5 shadow-lg border-2 border-slate-100 rounded-xl mb-4"
                        >
                          <div>
                            <div className="flex justify-between">
                              <div className="flex gap-5">
                                <img
                                  src={flight.plane.logo}
                                  alt={flight.plane.airline_name}
                                  className="h-10 w-10"
                                />
                                <div>
                                  <p className="font-semibold">
                                    {flight.plane.airline_name}
                                  </p>
                                  <p className="font-extralight">
                                    {flight.class}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="flex flex-col items-end"
                                onClick={() => toggleDetails(index)}
                              >
                                <ChevronDownIcon
                                  className={`h-6 w-6 text-[#176b87aa] text-bold text-center rounded-full border-2 border-[#176b87aa] p-1 flex items-center transform ${
                                    openDropdown === index ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="pl-16 mt-5 flex justify-between items-center">
                              <div className="flex gap-20">
                                <div className="flex flex-col items-center">
                                  <p className="font-bold">
                                    {formatTime(flight.schedule.takeoff.time)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {flight.schedule.takeoff.airport_code}
                                  </p>
                                </div>
                                <div>
                                  <div className="border-b-2 px-20">
                                    <p className="text-xs text-gray-500">
                                      {calculateFlightDuration(
                                        flight.schedule.takeoff.time,
                                        flight.schedule.landing.time
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-xs text-gray-500 text-center">
                                    {flight.transit}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <p className="font-bold">
                                    {formatTime(flight.schedule.landing.time)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {flight.schedule.landing.airport_code}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-10 justify-end">
                                <div className="flex flex-col justify-end">
                                  <p className="font-semibold text-red-600">
                                    Rp. {flight.price}/ Pax
                                  </p>
                                  <button
                                    className="bg-[#176B87] rounded-lg py-2 px-5 text-white font-semibold"
                                    onClick={() => handleSelectPulang(flight)}
                                  >
                                    Pilih
                                  </button>
                                </div>
                              </div>
                            </div>
                            {openDropdown === index && (
                              <div className="mt-5 border-t-2">
                                <div className="px-5">
                                  <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                                    Detail Penerbangan
                                  </p>
                                  <div>
                                    <div className="flex justify-between">
                                      <p className="font-bold text-xl">
                                        {formatTime(
                                          flight.schedule.takeoff.time
                                        )}
                                      </p>
                                      <p className="font-semibold text-[#64CCC5]">
                                        Keberangkatan
                                      </p>
                                    </div>
                                    <p>
                                      {formatDate(flight.schedule.takeoff.time)}
                                    </p>
                                    <p>
                                      {flight.schedule.takeoff.airport_name} -{" "}
                                      {flight.terminalKeberangkatan}
                                    </p>
                                  </div>
                                  <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                                    <div className="flex items-center">
                                      <img
                                        src={flight.plane.logo}
                                        alt={flight.plane.airline_name}
                                        className="h-6 w-6"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-bold pb-3">
                                        <p>{flight.plane.airline_name}</p>
                                        <p>{flight.plane.model}</p>
                                      </div>
                                      <p className="font-bold">Informasi:</p>
                                      <p>{flight.class}</p>
                                      <p>Bagasi {flight.plane.baggage} Kg</p>
                                      <p>
                                        Bagasi Kabin{" "}
                                        {flight.plane.cabin_baggage} Kg
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between">
                                      <p className="font-bold text-xl">
                                        {formatTime(
                                          flight.schedule.landing.time
                                        )}
                                      </p>
                                      <p className="font-semibold text-[#64CCC5]">
                                        Kedatangan
                                      </p>
                                    </div>
                                    <p>
                                      {formatDate(flight.schedule.landing.time)}
                                    </p>
                                    <p>
                                      {flight.schedule.landing.airport_name} -{" "}
                                      {flight.terminalKedatangan}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSearchFilm;
