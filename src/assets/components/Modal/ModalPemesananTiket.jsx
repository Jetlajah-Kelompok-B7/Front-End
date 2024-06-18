import React, { useEffect, useState } from "react";
import MyModal from "./ModalKalender";
import Dropdown from "../Modal/ModalJumlahPenumpang";
import { useDispatch, useSelector } from "react-redux";
import ModalKeberangkatan from "../Modal/ModalKeberangkatan";
import ModalLokasi from "../Modal/ModalLokasiAwal";
import PilihKelasPenerbangan from "../Modal/KelasPenerbangan";
import { swapLokasi } from "../../../redux/Reducers/TiketReducer";
import { GetTiket } from "../../../redux/Action/TiketAction";

export default function ModalPemesananTiket() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [kotaAwal, setKotaAwal] = useState("");
  const [destinasi, setDestinasi] = useState("");
  const [id, setId] = useState(null);
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [kelasPenerbangan, setKelasPenerbangan] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [modalTiketKebernagkatan, setModalTiketKeberangkatan] = useState(false);
  const [pilihanUser, setPilihanUser] = useState("Sekali Jalan");
  const pilihanUsers = ["Sekali Jalan", "Pergi - Pulang"];

  const Data_Kota_Awal = useSelector((state) => {
    return state?.tiket?.LokasiKeberangkatan;
  });
  const KelasPenerbanganUser = useSelector((state) => {
    return state.tiket.KelasPenerbangan;
  });
  const Data_Kota_Tujuan = useSelector((state) => {
    return state?.tiket?.lokasiTujuan;
  });
  const Tanggal_berangkat = useSelector((state) => {
    return state.tiket.TanggalKeberangkatan;
  });
  const Total_Penumpang = useSelector((state) => {
    return state.tiket.totalSemuaPenumpang;
  });

  useEffect(() => {
    dispatch(GetTiket());
  }, [dispatch]);

  return (
    <div className="relative">
      <div className="bg-white pt-5  rounded-2xl border">
        <div className=" px-6">
          <p className="font-bold text-[20px] ml-[10px]">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#176B87]"> Jetlajah.In</span>
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

          {/* tiket */}
          <div className="flex items-center">
            {/* col 1 */}
            <div className="flex flex-col">
              {/* pesawat */}
              <div className="flex justify-between items-center">
                <div className="flex">
                  <img
                    src="/images/IconPesawat.png"
                    alt=""
                    className="h-6 w-6 -ml-[1px]"
                  />
                  <p className="mr-12 ml-4 text-base text-gray-500">Dari</p>
                </div>
                <div className="flex items-center py-4">
                  <button
                    className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start  py-3"
                    onClick={() => {
                      setModalTiket(true);
                      setModalTiketKeberangkatan(false);
                      setId(1);
                    }}
                  >
                    {kotaAwal === "" ? (
                      <p>Pilih Kota</p>
                    ) : (
                      <div>{Data_Kota_Awal}</div>
                    )}
                  </button>
                  <ModalLokasi
                    onClose={() => setModalTiket(false)}
                    visible={modalTiket}
                    setKotaAwal={setKotaAwal}
                    setDestinasi={setDestinasi}
                    id={id}
                  />
                </div>
              </div>
              {/* tanggal */}
              <div className="flex gap-1">
                <div className="flex items-center">
                  <img
                    src="/images/iconTanggal.png"
                    alt=""
                    className="h-6 w-6"
                  />
                  <p className=" mr-4 ml-4 text-base text-gray-500">Tanggal</p>
                </div>
                <div className=" flex flex-col">
                  <p className="text-base text-gray-500">Tanggal Pergi</p>
                  <button
                    className="w-[145px] border-b font-medium text-[#176B87] text-[18px] text-start py-2 whitespace-nowrap"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    {tanggalBerangkat === "" ? (
                      <p>Pilih Tanggal</p>
                    ) : (
                      <div>{Tanggal_berangkat}</div>
                    )}
                  </button>
                  <MyModal onClose={() => setModal(false)} visible={modal} />
                </div>
                <div className="flex items-center">
                  <div className="flex gap-2">
                    {pilihanUser === "Pergi - Pulang" ? (
                      <div className="flex flex-col">
                        <p className="text-base text-gray-500">
                          Tanggal Pulang
                        </p>
                        <button
                          className="w-[145px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                          onClick={() => setModal(true)}
                        >
                          {tanggalPulang === "" ? (
                            <p>Pilih Tanggal</p>
                          ) : (
                            <div>{Tanggal_berangkat}</div>
                          )}
                        </button>
                        <MyModal
                          onClose={() => setModal(false)}
                          visible={modal}
                        />
                      </div>
                    ) : (
                      <div className="w-[145px] bg-white h-1"></div> // untuk placeholder saja supaya ukuran tidak berubah
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* col 2 */}
            <button
              className="mt-9 mx-5 mb-2 self-baseline"
              onClick={() => dispatch(swapLokasi())}
            >
              <img src="/images/return.png" alt="" className="h-8 w-8" />
            </button>

            {/* col3 */}
            <div className="flex flex-col">
              {/* pesawat */}
              <div className="flex items-center">
                <div className="flex">
                  <img
                    src="/images/IconPesawat.png"
                    alt=""
                    className="h-6 w-6 -ml-[1px]"
                  />
                  <p className="mr-10 ml-4 text-base text-gray-500">Dari</p>
                </div>
                <div className="flex items-center py-4">
                  <button
                    className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start  py-3"
                    onClick={() => {
                      setModalTiket(true);
                      setModalTiketKeberangkatan(false);
                      setId(2);
                    }}
                  >
                    {destinasi === "" ? (
                      <p>Pilih destinasi anda</p>
                    ) : (
                      <div>{destinasi}</div>
                    )}
                  </button>
                  <ModalLokasi
                    onClose={() => setModalTiket(false)}
                    visible={modalTiket}
                    setKotaAwal={setKotaAwal}
                    setDestinasi={setDestinasi}
                    id={id}
                  />
                </div>
              </div>

              {/* Penumpang */}
              <div className="flex items-center">
                <img src="/images/iconDuduk.png" alt="" className="w-6 h-6" />
                <p className="mr-7 ml-4 text-base text-gray-500">untuk</p>
                <div className=" flex flex-col">
                  <div className="flex gap-4">
                    <div className=" relative flex flex-col items-start justify-start">
                      <p className="text-base text-gray-500">Penumpang</p>
                      <button
                        className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                        onClick={() => {
                          setDropdown(true);
                        }}
                      >
                        {Total_Penumpang === 0
                          ? "Pilih Kursi"
                          : `${Total_Penumpang} Penumpang`}
                      </button>
                      <Dropdown
                        onClose={() => {
                          setDropdown(false);
                        }}
                        visible={dropdown}
                      />
                    </div>
                    <div className=" flex flex-col relative">
                      <p className="text-base text-gray-500">
                        Kelas Penerbangan
                      </p>
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
        <button className="w-full text-center font-bold text-[16px] py-4 mt-7 text-white bg-[#176B87] rounded-b-2xl">
          Cari Penerbangan
        </button>
      </div>
    </div>
  );
}
