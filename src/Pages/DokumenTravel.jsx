import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Select from "react-select";
import {
  ChevronRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const travelDokumen = () => {
  const [penumpangData, setPenumpangData] = useState([]);

  // formatRupiah
  const formatRupiah = (price) => {
    return price
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace(/\,00$/, "");
  };

  const DataBooking = useSelector((state) => state.booking.bookingTiketPesawat);
  console.log("Data", DataBooking);

  const DataPenumpang = useSelector((state) => state.tiket);
  console.log("Data penum", DataPenumpang);

  // fungsi Perhitungan Harga
  const totalHargaPenumpang =
    DataPenumpang.totalSemuaPenumpang * DataBooking.price;
  const pajak = totalHargaPenumpang * 0.1;
  const totalHargaDenganPajak = totalHargaPenumpang + pajak;

  //Fungsi Option Negara
  const options = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

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
                <div>
                  <p className="bg-[#176B87] text-white rounded-t-md py-2 px-4">
                    Data Diri Penumpang 1 - Dewasa
                  </p>
                  <form action="" className="py-3"></form>
                  <p className="text-[#176B87] font-semibold">Title</p>
                  <select className="border border-slate-300 w-[520px] p-2 my-2">
                    <option value="Mr">Tuan</option>
                    <option value="Mrs">Nyonya</option>
                    <option value="Ms">Nona</option>
                  </select>
                  <p className="text-[#176B87] font-semibold">Nama Lengkap</p>
                  <input
                    type="text"
                    placeholder="Inputkan Nama Lengkap"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Tanggal Lahir</p>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">
                    Kewarganegaraan
                  </p>
                  <input
                    type="text"
                    placeholder="Indonesia"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">KTP/Paspor</p>
                  <input
                    type="text"
                    placeholder="3374308451435991"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">
                    Negara Penerbit
                  </p>
                  <Select
                    options={options}
                    className="border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Berlaku Sampai</p>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                </div>
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
                            {DataBooking.schedule.takeoff.time}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Keberangkatan
                          </p>
                        </div>

                        <p>{DataBooking.schedule.takeoff.time}</p>
                        <p>
                          {DataBooking.schedule.takeoff.airport_name} -{" "}
                          {DataBooking.schedule.takeoff.terminal}
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
                            {DataBooking.schedule.landing.time}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Kedatangan
                          </p>
                        </div>

                        <p>{DataBooking.schedule.landing.time}</p>
                        <p>
                          {DataBooking.schedule.landing.airport_name} -{" "}
                          {DataBooking.schedule.landing.terminal}
                        </p>
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
                                    ? "Gratis"
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
