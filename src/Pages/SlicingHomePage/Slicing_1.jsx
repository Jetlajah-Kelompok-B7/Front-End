import React, { useState } from "react";
import MyModal from "../../assets/components/Modal/MyModal";
import Dropdown from "../../assets/components/Modal/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import ModalKeberangkatan from "../../assets/components/Modal/ModalKeberangkatan";
import ModalLokasi from "../../assets/components/Modal/ModalLokasi";

import PilihKelasPenerbangan from "../../assets/components/Modal/KelasPenerbangan";
import { swapLokasi } from "../../redux/Reducers/TiketReducer";

export default function Slicing_1() {
  const dispatch = useDispatch();
  const [tanggal_Pergi, setTanggal_Pergi] = useState("");
  const [modal, setModal] = useState(false);
  const [kelasPenerbangan, setKelasPenerbangan] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const [modalTiketKebernagkatan, setModalTiketKeberangkatan] = useState(false);
  const [pilihanUser, setPilihanUser] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const pilihanUsers = ["Sekali Jalan", "Pergi - Pulang"];

  const Data_Kota_Awal = useSelector((state) => {
    // console.log("state", state?.tiket?.LokasiKeberangkatan);
    return state?.tiket?.LokasiKeberangkatan;
  });

  const KelasPenerbanganUser = useSelector((state) => {
    // console.log('state.tiket', state.tiket.KelasPenerbangan)
    return state.tiket.KelasPenerbangan;
  });

  const Data_Kota_Tujuan = useSelector((state) => {
    // console.log("state Tujuan", state?.tiket?.lokasiTujuan);
    return state?.tiket?.lokasiTujuan;
  });

  const handleInputTanggalChange = (e) => {
    return setTanggal_Pergi(e.target.value);
  };

  return (
    <div className=" h-screen bg-cover bg-center bg-[url('/images/bg1.png')] flex flex-col justify-center items-center gap-20">
      <div className="text-white text-center">
        <h1 className="italic font-extrabold text-[70px]">Jetlajah.In</h1>
        <p className="text-[32px] -mt-4">Terbang Menjelajah Angkasa</p>
      </div>
      {/* Container tiket */}
      <div className="bg-white pt-5  rounded-2xl border w-[968px]">
        <div className=" px-6">
          <p className="font-bold text-[20px] ml-[10px]">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#176B87]">Jetlajah.In</span>
          </p>
          <div className="flex gap-[15px]">
            {pilihanUsers.map((e, i) => (
              <div
                key={i}
                className=" hover:cursor-pointer"
                onClick={() => {
                  setPilihanUser(e);
                }}
              >
                {e === pilihanUser ? (
                  <button className="rounded-full border-2 border-[#176B87] bg-[#64CCC5] px-6">
                    {e}
                  </button>
                ) : (
                  <button className="rounded-full border-2 border-[#176B87] px-6">
                    {e}
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* bagian isi data tiket pesawat */}
          <div className="flex pt-3">
            <div className="flex gap-4 items-center justify-between">
              {/* Bagian kiri gambar berputar */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center relative">
                  <img
                    src="/images/IconPesawat.png"
                    alt=""
                    className="h-6 w-6 -ml-[1px]"
                  />
                  <p className="mr-12 ml-4">Dari</p>

                  <button
                    className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start  py-3"
                    onClick={() => {
                      setModalTiket(true);
                      setModalTiketKeberangkatan(false);
                    }}
                  >
                    {Data_Kota_Awal}
                  </button>
                  <ModalLokasi
                    onClose={() => setModalTiket(false)}
                    visible={modalTiket}
                  />
                </div>
                <div className="flex items-center">
                  <img
                    src="/images/iconTanggal.png"
                    alt=""
                    className="h-6 w-6"
                  />
                  <p className="mr-12 ml-4">Dari</p>
                  <div className="flex gap-5">
                    <div className=" flex flex-col">
                      <p>Tanggal</p>
                      <button
                        className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                        onClick={() => {
                          setModal(true);
                        }}
                      >
                        Pilih Tanggal
                      </button>
                      <MyModal
                        onClose={() => setModal(false)}
                        visible={modal}
                      />
                    </div>
                    <div className=" flex flex-col">
                      <p>Tanggal</p>
                      <button
                        className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                        onClick={() => {
                          setModal(true);
                        }}
                      >
                        Pilih Tanggal
                      </button>
                      <MyModal
                        onClose={() => setModal(false)}
                        visible={modal}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* gambar berputar */}
              <button
                className="self-start mt-5 mb-2"
                onClick={() => dispatch(swapLokasi())}
              >
                <img src="/images/return.png" alt="" className="h-8 w-8" />
              </button>

              {/* bagian kanan image putar */}
              <div className=" flex flex-col gap-5">
                <div className="flex items-center relative ">
                  <div className="flex items-center ">
                    <img
                      src="/images/IconPesawat.png"
                      alt=""
                      className="h-6 w-6"
                    />
                    <p className="mr-12 ml-4">Dari</p>
                    <button
                      className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start  py-3"
                      onClick={() => {
                        setModalTiketKeberangkatan(true), setModalTiket(false);
                      }}
                    >
                      {Data_Kota_Tujuan}
                    </button>
                    <ModalKeberangkatan
                      onClose={() => setModalTiketKeberangkatan(false)}
                      visible={modalTiketKebernagkatan}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/images/iconDuduk.png" alt="" className="w-6 h-6" />
                  <p className="mr-12 ml-4">Dari</p>
                  <div className=" flex flex-col">
                    <div className="flex gap-4">
                      <div className=" relative flex flex-col items-start justify-start">
                        <p>Penumpang</p>
                        <button
                          className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                          onClick={() => {
                            setDropdown(true);
                          }}
                        >
                          Jumlah Kursi
                        </button>
                        <Dropdown
                          onClose={() => {
                            setDropdown(false);
                          }}
                          visible={dropdown}
                        />
                      </div>
                      <div className=" flex flex-col relative">
                        <p>Kelas Penerbangan</p>
                        <button
                          className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                          onClick={() => {
                            setKelasPenerbangan(true);
                          }}
                        >
                          {KelasPenerbanganUser === "" ? (
                            <div>Pilih Kelas</div>
                          ) : (
                            <div className="whitespace-nowrap">
                              {KelasPenerbanganUser}
                            </div>
                          )}
                        </button>
                        <PilihKelasPenerbangan
                          onClose={() => {
                            setKelasPenerbangan(false);
                          }}
                          visible={kelasPenerbangan}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full text-center font-bold text-[16px] py-4 mt-7 text-white bg-[#176B87] rounded-b-2xl">
          Cari Penerbangan
        </button>
      </div>
    </div>
  );
}
