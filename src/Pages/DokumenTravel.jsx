import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Select from "react-select";
import {
  ChevronRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const travelDokumen = () => {
  const [penumpangData, setPenumpangData] = useState([]);
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  // formatRupiah
  const formatRupiah = (price) => {
    return price
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace(/\,00$/, "");
  };

  const DataBooking = useSelector((state) => state.booking.bookingTiketPesawat);
  // console.log("Data", DataBooking);

  const DataPenumpang = useSelector((state) => state.tiket);
  // console.log("Data penum", DataPenumpang);

  // fungsi Perhitungan Harga
  const totalHargaPenumpang =
    DataPenumpang.totalSemuaPenumpang * DataBooking.price;
  const pajak = totalHargaPenumpang * 0.1;
  const totalHargaDenganPajak = totalHargaPenumpang + pajak;

  //Fungsi Option Negara

  useEffect(() => {
    // Fetch data dari API dan update options
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const data = response.data;
        const countryOptions = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));

        // Urutkan countryOptions berdasarkan label (nama negara)
        countryOptions.sort((a, b) => a.label.localeCompare(b.label));

        setOptions(countryOptions); // Update state options
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []); // Kosong array dependencies berarti useEffect hanya berjalan sekali saat komponen mount

  // Setting ageGroup by jumlah penumpang
  useEffect(() => {
    const initialPenumpangData = [];
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Dewasa; i++) {
      initialPenumpangData.push({
        ageGroup: "ADULT",
        id: `dewasa-${i}`,
        name: "Dewasa",
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Anak; i++) {
      initialPenumpangData.push({
        ageGroup: "CHILD",
        id: `anak-${i}`,
        name: "Anak",
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Bayi; i++) {
      initialPenumpangData.push({
        ageGroup: "BABY",
        id: `bayi-${i}`,
        name: "Bayi",
      });
    }
    setPenumpangData(initialPenumpangData);
  }, [DataPenumpang?.TotalPenumpang]);

  // Group passengers by type and count
  const groupPenumpangData = penumpangData.reduce((acc, penumpang) => {
    if (!acc[penumpang.name]) {
      acc[penumpang.name] = { count: 0, ageGroup: penumpang.ageGroup };
    }
    acc[penumpang.name].count += 1;
    return acc;
  }, {});

  // function ubah waktu
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date?.getUTCHours()).padStart(2, "0");
    const minutes = String(date?.getUTCMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
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

  const handleChange = (e) => {
    const value = e.target.value;
    const formattedDate = formatTanggal(value);
    // console.log("tangale",formattedDate)
    setDate(formattedDate);
  };
  const formatTanggal = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const initialPenumpangData = [];
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Dewasa; i++) {
      initialPenumpangData.push({
        ageGroup: "ADULT",
        id: `dewasa-${i}`,
        name: "Dewasa",
        title: "",
        fullName: "",
        birthDate: "",
        nationality: "Indonesia",
        idNumber: "",
        issuingCountry: "",
        expiryDate: "",
        isBaby: false,
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Anak; i++) {
      initialPenumpangData.push({
        ageGroup: "CHILD",
        id: `anak-${i}`,
        name: "Anak",
        title: "",
        fullName: "",
        birthDate: "",
        nationality: "Indonesia",
        idNumber: "",
        issuingCountry: "",
        expiryDate: "",
        isBaby: false,
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Bayi; i++) {
      initialPenumpangData.push({
        ageGroup: "BABY",
        id: `bayi-${i}`,
        name: "Bayi",
        title: "",
        fullName: "",
        birthDate: "",
        nationality: "Indonesia",
        idNumber: "",
        issuingCountry: "",
        expiryDate: "",
        isBaby: true,
      });
    }
    setPenumpangData(initialPenumpangData);
  }, [DataPenumpang?.TotalPenumpang]);

  const handleInputChange = (id, field, value) => {
    setPenumpangData((prevData) =>
      prevData.map((penumpang) =>
        penumpang.id === id ? { ...penumpang, [field]: value } : penumpang
      )
    );
  };

  const toggleBaby = (id) => {
    setPenumpangData((prevData) =>
      prevData.map((penumpang) =>
        penumpang.id === id
          ? { ...penumpang, isBaby: !penumpang.isBaby }
          : penumpang
      )
    );
  };


  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="">
          {/* Header Atas */}
          <div className="bg-white shadow-md  w-full px-36">
            <div className="mx-20  pt-5 ">
              <div className="flex">
                <button className="flex items-center ml-4 text-lg font-bold text-[#176B87] ">
                  Isi Data diri
                  <ChevronRightIcon className="h-6 w-6 text-[#176B87] mr-1" />
                </button>
                <button className="flex items-center ml-4 text-lg font-semibold text-slate-500 ">
                  Bayar
                  <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />
                </button>
                <button className="flex items-center ml-4 text-lg font-semibold text-slate-500 ">
                  Selesai
                  <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />{" "}
                </button>
              </div>
            </div>
            <div className="  mx-20 p-3">
              <button className="flex items-center pl-5 gap-5 w-[800px] h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl">
                <ArrowLongLeftIcon className="h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center" />
                Kembali
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-10 mx-10 px-20">
            <div>
              {/* Data Pemesanan */}
              <div className="mt-10 border rounded-xl border-slate-300 p-10 w-[600px] text-xl">
                <p className="text-[#176B87] font-semibold pb-5">
                  Isi Data Pemesanan
                </p>
                <div>
                  <p className="bg-[#176B87] text-white rounded-t-md py-2 px-4">
                    Data Diri Pemesanan
                  </p>
                  <form action="" className="py-3 "></form>
                  <p className="text-[#176B87] font-semibold">Nama Lengkap</p>
                  <input
                    type="text"
                    placeholder="Inputkan Nama"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Nomor Telepon</p>
                  <input
                    type="text"
                    placeholder="Inputkan No Hp"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Email</p>
                  <input
                    type="email"
                    placeholder="Contoh : johndoe@gmail.com"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                </div>
              </div>

              {/* Isi Data Penumpang */}
              <div className="mt-10 border rounded-xl border-slate-300 p-10 w-[600px] text-xl">
                <p className="text-[#176B87] font-semibold pb-5">
                  Isi Data Penumpang
                </p>
                {penumpangData.map((penumpang, index) => (
                  <div
                    key={penumpang.id}
                    className="mt-5 border rounded-xl border-slate-300 p-10 w-[520px] text-xl"
                  >
                    <div>
                      <p className="bg-[#176B87] text-white rounded-t-md py-2 px-4">
                        Data Diri Penumpang {index + 1} - {penumpang.name}
                      </p>
                      <form action="" className="py-3"></form>
                      <label className="text-[#176B87] font-semibold">
                        Title
                      </label>
                      <select
                        value={penumpang.title}
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "title",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      >
                        <option value="Mr">Tuan</option>
                        <option value="Mrs">Nyonya</option>
                        <option value="Ms">Nona</option>
                      </select>
                      <label className="text-[#176B87] font-semibold">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={penumpang.fullName}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "fullName",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={penumpang.birthDate}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "birthDate",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        Kewarganegaraan
                      </label>
                      <input
                        type="text"
                        value={penumpang.nationality}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "nationality",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        KTP/Paspor
                      </label>
                      <input
                        type="text"
                        value={penumpang.idNumber}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "idNumber",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        Negara Penerbit
                      </label>
                      <Select
                        required
                        value={options.find(
                          (option) => option.value === penumpang.issuingCountry
                        )}
                        onChange={(selectedOption) =>
                          handleInputChange(
                            penumpang.id,
                            "issuingCountry",
                            selectedOption.value
                          )
                        }
                        options={options}
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        Berlaku Sampai
                      </label>
                      <input
                        type="date"
                        value={penumpang.expiryDate}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "expiryDate",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold flex-col items-end justify-end">
                        Apakah Penumpang ini Bayi?
                      </label>
                      <input
                        type="checkbox"
                        checked={penumpang.isBaby}
                        required
                        onChange={() => toggleBaby(penumpang.id)}
                        className=" mt-5 w-6 h-6 ml-5"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="bg-[#176B87] text-white text-xl text-center py-2 px-10 rounded-xl mt-5 w-[300px] mb-10">
                  Simpan
                </button>
              </div>
            </div>

            {/* Detail Penerbangan */}
            <div className="w-[400px] mt-10">
              <div className="p-5 border-2 border-slate-200 rounded-xl">
                <div>
                  <div className="mt-5">
                    <div className="px-5">
                      <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                        Detail Penerbangan
                      </p>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-bold text-xl">
                            {formatTime(DataBooking.schedule.takeoff.time)}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Keberangkatan
                          </p>
                        </div>

                        <p>{formatDate(DataBooking.schedule.takeoff.time)}</p>
                        <p>{DataBooking.schedule.takeoff.airport_name}</p>
                        <p>Terminal {DataBooking.schedule.takeoff.terminal}</p>
                      </div>
                      <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                        <div className="flex items-center">
                          <img
                            src={DataBooking.plane.logo}
                            alt={DataBooking.plane.airline_name}
                            className="h-6 w-6"
                          />
                        </div>
                        <div>
                          <div className="font-bold pb-3">
                            <p>{DataBooking.plane.airline_name}</p>
                            <p>{DataBooking.plane.model}</p>
                          </div>
                          <p className="font-bold">Informasi :</p>
                          <p>{DataBooking.class}</p>
                          <p>Bagasi {DataBooking.plane.baggage} Kg</p>
                          <p>
                            Bagasi Kabin {DataBooking.plane.cabin_baggage} Kg
                          </p>
                          {/* <p>Fasilitas {DataBooking.Fasilitas}</p> */}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-bold text-xl">
                            {formatTime(DataBooking.schedule.landing.time)}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Kedatangan
                          </p>
                        </div>

                        <p>{formatDate(DataBooking.schedule.landing.time)}</p>
                        <p>{DataBooking.schedule.landing.airport_name}</p>
                        <p>Terminal {DataBooking.schedule.landing.terminal}</p>
                      </div>

                      {/* Rincian Bayar */}
                      <div className="my-3 py-2 border-t-2 border-b-2">
                        <p className="font-bold text-xl">Rincian Harga</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(groupPenumpangData).map(
                            ([name, { count, ageGroup }]) => (
                              <div
                                className="flex justify-between col-span-2"
                                key={name}
                              >
                                <div className="flex gap-2">
                                  <p>{count}</p>
                                  <p>{name}</p>
                                </div>
                                <p className="">
                                  {ageGroup === "BABY"
                                    ? "0"
                                    : formatRupiah(DataBooking.price * count)}
                                </p>
                              </div>
                            )
                          )}
                          <div className="flex justify-between col-span-2">
                            <p>Tax 10%</p>
                            <p>{formatRupiah(pajak)}</p>
                          </div>
                          <div className="flex justify-between col-span-2 font-bold text-xl">
                            <p>Total</p>
                            <p className="text-[#176B87]">
                              {formatRupiah(totalHargaDenganPajak)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold text-xl">Total</p>
                        <p className="font-bold text-xl text-[#176B87]">
                          {formatRupiah(totalHargaDenganPajak)}
                        </p>
                      </div>
                      <div className="py-5 border-t-2">
                        <button className="bg-[#176B87] text-white text-xl font-semibold py-2 px-5 flex justify-center items-center rounded-xl w-[350px]">
                          Lanjut Bayar
                        </button>
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
};

export default travelDokumen;
