import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Select from "react-select";
import {
  ChevronRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPayment } from "../redux/Action/TiketAction";
import { setDokumenBooking } from "../redux/Reducers/DataBooking";

const travelDokumen = () => {
  const [penumpangData, setPenumpangData] = useState([]);
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState("");
  const [param, setparams] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // formatRupiah
  const formatRupiah = (price) => {
    return price
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace(/\,00$/, "");
  };

  //AMBIL TYPE PESAWAT
  const ambiltype = useSelector(
    (state) => state.tiket.dataInputanSearch.jenisPenerbangan
  );
  console.log("TYPE", ambiltype);



  //MENAMPILKAN DATA TIKET PERGI
  const DataBooking = useSelector(
    (state) => state?.booking?.bookingTiketPesawatPergi
  );
  console.log("DATA PERGI", DataBooking);

  //MENAMPILKAN DATA TIKET PULANG
  const DataBookingPulang = useSelector(
    (state) => state.booking.bookingTiketPesawatPulang
  );
  console.log("DATA PULANG", DataBookingPulang);

  const DataPenumpang = useSelector((state) => state.tiket);
  console.log("Data penumpangoONE", DataPenumpang);

  // fungsi Perhitungan Harga

  const totalHargaPenumpang =
    (DataPenumpang.totalSemuaPenumpang - DataPenumpang.TotalPenumpang.Bayi) *
    DataBooking.price;
  let pajak = totalHargaPenumpang * 0.1;
  let totalHargaDenganPajak = totalHargaPenumpang + pajak;

  let totalHargaSemua = totalHargaDenganPajak;

  if (ambiltype === "Pergi - Pulang") {
    const totalHargaPulang =
      (DataPenumpang.totalSemuaPenumpang - DataPenumpang.TotalPenumpang.Bayi) *
        DataBookingPulang.price +
      (DataPenumpang.totalSemuaPenumpang - DataPenumpang.TotalPenumpang.Bayi) *
        DataBooking.price;
    const pajakPulang = totalHargaPulang * 0.1;
    const totalHargaDenganPajakPulang = totalHargaPulang + pajakPulang;

    pajak = +pajakPulang;
    totalHargaDenganPajak = +totalHargaDenganPajakPulang;
    totalHargaSemua = +totalHargaDenganPajakPulang;
    console.log("HARGA PErgi", totalHargaPenumpang);
    console.log("HARGA PULANG", totalHargaPulang);
  }

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

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   const formattedDate = formatTanggal(value);
  //   // console.log("tangale",formattedDate)
  //   setDate(formattedDate);
  // };

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
        titel: "",
        nama: "",
        tanggal_lahir: "",
        kewarganegaraan: "",
        ktp_pasport: "",
        negara_penerbit: "",
        berlaku_sampai: "",
        is_baby: false,
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Anak; i++) {
      initialPenumpangData.push({
        ageGroup: "CHILD",
        id: `anak-${i}`,
        name: "Anak",
        titel: "",
        nama: "",
        tanggal_lahir: "",
        kewarganegaraan: "",
        ktp_pasport: "",
        negara_penerbit: "",
        berlaku_sampai: "",
        is_baby: false,
      });
    }
    for (let i = 0; i < DataPenumpang.TotalPenumpang.Bayi; i++) {
      initialPenumpangData.push({
        ageGroup: "BABY",
        id: `bayi-${i}`,
        name: "Bayi",
        titel: "",
        nama: "",
        tanggal_lahir: "",
        kewarganegaraan: "",
        ktp_pasport: "",
        negara_penerbit: "",
        berlaku_sampai: "",
        is_baby: true,
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
          ? { ...penumpang, is_baby: !penumpang.is_baby }
          : penumpang
      )
    );
  };


  // AMBIL ID PERGI
  const dataInputPesanan = useSelector(
    (state) => state.booking.bookingTiketPesawatPergi
  );

  // AMBIL ID PULANG
  const dataInputanPesananPulang = useSelector(
    (state) => state.booking.bookingTiketPesawatPulang
  );
 

  const handleSimpanDataPenumpang = () => {
    const isValid = penumpangData.every(
      (penumpang) =>
        penumpang.titel &&
        penumpang.nama &&
        penumpang.tanggal_lahir &&
        penumpang.kewarganegaraan &&
        penumpang.ktp_pasport &&
        penumpang.negara_penerbit &&
        penumpang.berlaku_sampai
    );

    if (isValid) {
      const dataToSave = penumpangData.map((penumpang, tipePenumpang) => ({
        titel: penumpang.titel,
        nama: penumpang.nama,
        tanggal_lahir: penumpang.tanggal_lahir,
        kewarganegaraan: penumpang.kewarganegaraan,
        ktp_pasport: penumpang.ktp_pasport,
        negara_penerbit: penumpang.negara_penerbit,
        // Format tanggal berlaku
        berlaku_sampai: new Date(penumpang.berlaku_sampai).toISOString(),
        is_baby: penumpang.is_baby,
      }));

      // Simpan dataToSave ke dalam state atau lakukan dispatch ke action lain sesuai kebutuhan
      console.log("Data to save:", dataToSave);

      const paramsData = {
        penumpang: dataToSave,
        tipePenumpang: ambiltype,
      };

      dispatch(getPayment([dataInputPesanan.id, dataInputanPesananPulang.id], paramsData, navigate)); // Pastikan dataInputPesanan.id tersedia
      dispatch(setDokumenBooking(paramsData));
    } else {
      alert("Semua form wajib diisi!");
    }
    console.log("data Inputan Pergi", dataInputPesanan.id);
    console.log("data Inputan Pulang", dataInputanPesananPulang.id);
  };

  const dataPemesan = useSelector((state) => state.login);
  //  console.log("Data Pemesan user", dataPemesan);

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
              <button
                className="flex items-center pl-5 gap-5 w-[800px] h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl"
                onClick={() => navigate("/resultSearch")}
              >
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
                  {<form action="" className="py-3 "></form>}
                  <p className="text-[#176B87] font-semibold">Nama Lengkap</p>
                  <p className="border border-slate-300 w-[520px] p-2 my-2">
                    {dataPemesan.nama}
                  </p>
                  <p className="text-[#176B87] font-semibold">Nomor Telepon</p>
                  <p className="border border-slate-300 w-[520px] p-2 my-2">
                    {dataPemesan.no_telp}
                  </p>
                  <p className="text-[#176B87] font-semibold">Alamat</p>
                  <p className="border border-slate-300 w-[520px] p-2 my-2">
                    {dataPemesan.alamat}
                  </p>
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
                        titel
                      </label>
                      <select
                        value={penumpang.titel}
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "titel",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      >
                        <option value=""></option>
                        <option value="Tuan">Tuan</option>
                        <option value="Nyonya">Nyonya</option>
                        <option value="Nona">Nona</option>
                      </select>
                      <label className="text-[#176B87] font-semibold">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={penumpang.nama}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "nama",
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
                        value={penumpang.tanggal_lahir}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "tanggal_lahir",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        Kewarganegaraan
                      </label>
                      <Select
                        required
                        value={options.find(
                          (option) => option.value === penumpang.kewarganegaraan
                        )}
                        onChange={(selectedOption) =>
                          handleInputChange(
                            penumpang.id,
                            "kewarganegaraan",
                            selectedOption.value
                          )
                        }
                        options={options}
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                      <label className="text-[#176B87] font-semibold">
                        No KTP/Paspor
                      </label>
                      <input
                        type="text"
                        value={penumpang.ktp_pasport}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "ktp_pasport",
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
                          (option) => option.value === penumpang.negara_penerbit
                        )}
                        onChange={(selectedOption) =>
                          handleInputChange(
                            penumpang.id,
                            "negara_penerbit",
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
                        value={penumpang.berlaku_sampai}
                        required
                        onChange={(e) =>
                          handleInputChange(
                            penumpang.id,
                            "berlaku_sampai",
                            e.target.value
                          )
                        }
                        className="border border-slate-300 w-[440px] p-2 my-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="flex justify-center">
                <button
                  className="bg-[#176B87] text-white text-xl text-center py-2 px-10 rounded-xl mt-5 w-[300px] mb-10"
                 
                >
                  Simpan
                </button>
              </div> */}
            </div>

            {/* Detail Penerbangan */}
            <div className="w-[400px] mt-10">
              <div className="p-5 border-2 border-slate-200 rounded-xl">
                <div>
                  <div className="mt-5">
                    <div className="px-5">
                      {/* TIKET PERGI */}
                      <div>
                        <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                          Detail Penerbangan Pergi
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
                          <p>
                            Terminal {DataBooking.schedule.takeoff.terminal}
                          </p>
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
                          <p>
                            Terminal {DataBooking.schedule.landing.terminal}
                          </p>
                        </div>
                      </div>

                      {/* TIKET PULANG */}
                      {ambiltype == "Pergi - Pulang" && (
                        <>
                          {DataBookingPulang.schedule.takeoff.time && (
                            <div className="mt-5 border-t-4 border-[#FE5D02]">
                              <div className="">
                                <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                                  Detail Penerbangan Pulang
                                </p>
                                <div>
                                  <div className="flex justify-between">
                                    <p className="font-bold text-xl">
                                      {formatTime(
                                        DataBookingPulang.schedule.takeoff.time
                                      )}
                                    </p>
                                    <p className="font-semibold text-[#64CCC5]">
                                      Keberangkatan
                                    </p>
                                  </div>
                                  <p>
                                    {formatDate(
                                      DataBookingPulang.schedule.takeoff.time
                                    )}
                                  </p>
                                  <p>
                                    {
                                      DataBookingPulang.schedule.takeoff
                                        .airport_name
                                    }
                                  </p>
                                  <p>
                                    Terminal{" "}
                                    {
                                      DataBookingPulang.schedule.takeoff
                                        .terminal
                                    }
                                  </p>
                                </div>
                                <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                                  <div className="flex items-center">
                                    <img
                                      src={DataBookingPulang.plane.logo}
                                      alt={DataBookingPulang.plane.airline_name}
                                      className="h-6 w-6"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-bold pb-3">
                                      <p>
                                        {DataBookingPulang.plane.airline_name}
                                      </p>
                                      <p>{DataBookingPulang.plane.model}</p>
                                    </div>
                                    <p className="font-bold">Informasi :</p>
                                    <p>{DataBookingPulang.class}</p>
                                    <p>
                                      Bagasi {DataBookingPulang.plane.baggage}{" "}
                                      Kg
                                    </p>
                                    <p>
                                      Bagasi Kabin{" "}
                                      {DataBookingPulang.plane.cabin_baggage} Kg
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between">
                                    <p className="font-bold text-xl">
                                      {formatTime(
                                        DataBookingPulang.schedule.landing.time
                                      )}
                                    </p>
                                    <p className="font-semibold text-[#64CCC5]">
                                      Kedatangan
                                    </p>
                                  </div>
                                  <p>
                                    {formatDate(
                                      DataBookingPulang.schedule.landing.time
                                    )}
                                  </p>
                                  <p>
                                    {
                                      DataBookingPulang.schedule.landing
                                        .airport_name
                                    }
                                  </p>
                                  <p>
                                    Terminal{" "}
                                    {
                                      DataBookingPulang.schedule.landing
                                        .terminal
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Rincian Bayar */}
                      <div className="my-3 py-2 border-t-4 border-b-4 border-[#FE5D02]">
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
                                    : ambiltype === "Pergi - Pulang"
                                    ? formatRupiah(
                                        (DataBooking.price +
                                          DataBookingPulang.price) *
                                          count
                                      )
                                    : formatRupiah(DataBooking.price * count)}
                                </p>
                              </div>
                            )
                          )}

                          <div className="flex justify-between col-span-2">
                            <p className="text-sm flex items-center">
                              Pajak + Donasi Palestina 10%
                            </p>
                            <p>{formatRupiah(pajak)}</p>
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
                        <button
                          className="bg-[#176B87] text-white text-xl font-semibold py-2 px-5 flex justify-center items-center rounded-xl w-[350px]"
                          onClick={handleSimpanDataPenumpang}
                        >
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
