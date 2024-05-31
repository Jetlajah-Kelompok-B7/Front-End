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
  const [ke_kota, setKe_kota] = useState("");
  const [tanggal_Pergi, setTanggal_Pergi] = useState("");
  const [modal, setModal] = useState(false);
  const [kelasPenerbangan, setKelasPenerbangan] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const [modalTiketKebernagkatan, setModalTiketKeberangkatan] = useState(false);

  const [dropdown, setDropdown] = useState(false);

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

  const handleInputKeChange = (e) => {
    return setKe_kota(e.target.value);
  };

  const handleInputTanggalChange = (e) => {
    return setTanggal_Pergi(e.target.value);
  };
  const handleSwap = () => {
    const temp = Data_Kota_Awal;
    setDari_kota(Data_Kota_Tujuan);
    setKe_kota(temp);
  };

  return (
    <div className=" h-screen bg-cover bg-center bg-[url('/images/bg1.png')] flex flex-col justify-center items-center gap-20">
      <div className="text-white text-center">
        <h1 className="italic font-extrabold text-[70px]">Jetlajah.In</h1>
        <p className="text-[32px] -mt-4">Terbang Menjelajah Angkasa</p>
      </div>
      <div className="bg-white pt-5  rounded-2xl border">
        <div className=" px-6">
          <p className="font-bold text-[20px] ml-[10px]">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#176B87]">Jetlajah.In</span>
          </p>
          <div className="flex gap-[15px] ">
            <button className="rounded-full border-2 border-[#176B87] px-6">
              Sekali Jalan
            </button>
            <button className="rounded-full border-2 border-[#176B87] px-6">
              Pergi - Pulang
            </button>
          </div>
          {/* bagian pilih pesawat */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-center justify-between">
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
              <button
                className=" self-end mb-2"
                onClick={() => dispatch(swapLokasi())}
              >
                <img src="/images/return.png" alt="" className="h-8 w-8" />
              </button>
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
            </div>
            {/* bagian pilih tanggal */}
            <div className="flex justify-between  items-center ">
              <div className="flex items-center">
                <img src="/images/iconTanggal.png" alt="" className="h-6 w-6" />
                <p className="mr-12 ml-4">Dari</p>
                <div className="flex gap-5">
                  <div className=" flex flex-col">
                    <p>Tanggal Pergi</p>
                    <input
                      type="text"
                      placeholder="Kota Asal ..."
                      className="py-2 outline-none w-[135px]  border-b font-medium text-[#176B87] text-[18px]"
                      value={tanggal_Pergi}
                      onChange={handleInputTanggalChange}
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
                    <MyModal onClose={() => setModal(false)} visible={modal} />
                  </div>
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
                          <div className="whitespace-nowrap">{KelasPenerbanganUser}</div>
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
        <button className="w-full text-center font-bold text-[16px] py-4 mt-7 text-white bg-[#176B87] rounded-b-2xl">
          Cari Penerbangan
        </button>
      </div>
    </div>
  );
}
