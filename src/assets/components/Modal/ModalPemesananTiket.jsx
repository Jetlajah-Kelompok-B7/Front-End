import React, { useEffect, useState } from "react";
import MyModal from "./ModalKalender";
import Dropdown from "../Modal/ModalJumlahPenumpang";
import { useDispatch, useSelector } from "react-redux";
import ModalLokasi from "../Modal/ModalLokasiAwal";
import PilihKelasPenerbangan from "../Modal/KelasPenerbangan";
import { swapLokasi } from "../../../redux/Reducers/TiketReducer";
import { GetTiket } from "../../../redux/Action/TiketAction";

export default function ModalPemesananTiket() {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [idTanggal, setIdTanggal] = useState(1);
  const list_Pilihan = ["Sekali Jalan", "Pergi - Pulang"];
  const [pilihanUser, setPilihanUser] = useState("Sekali Jalan");
  const [modalNama, setModalNama] = useState("");
  const [kotaAwal, setKotaAwal] = useState("");
  const [destinasi, setDestinasi] = useState("");
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [total_penumpang, setTotal_penumpang] = useState(0);
  const [kelas_penerbangan, setKelas_penerbangan] = useState("");

  // const DataLokasi = useSelector((state) => {
  //   console.log("------------------------------------------");
  //   console.log("kelas", state.tiket.KelasPenerbangan);
  //   console.log("kota", state.tiket.LokasiKeberangkatan);
  //   console.log("destinasi", state.tiket.lokasiTujuan);
  //   console.log("tanggalberangkat", state.tiket.TanggalKeberangkatan);
  //   console.log("tanggalpulang", state.tiket.TanggalKepulangan);
  //   console.log("totalpenumpang", state.tiket.totalSemuaPenumpang);
  //   return state?.tiket?.lokasi;
  // });
  // console.log("idTanggal", idTanggal);



  const handleswap = () => {
    let temp = kotaAwal;
    setKotaAwal(destinasi);
    setDestinasi(temp);
    dispatch(swapLokasi());
  };

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
            {list_Pilihan.map((e, i) => (
              <div
                key={i}
                className=" hover:cursor-pointer"
                onClick={() => {
                  setPilihanUser(e)
                  setIdTanggal(i+1);
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
                      setModalNama("tiket");
                      setId(1);
                    }}
                  >
                    {kotaAwal === "" ? (
                      <p>Pilih Kota</p>
                    ) : (
                      <div>{kotaAwal}</div>
                    )}
                  </button>
                  <ModalLokasi
                    onClose={() => setModalNama("")}
                    visible={modalNama === "tiket"}
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
                      setModalNama("tanggal");
                    }}
                  >
                    {tanggalBerangkat === "" ? (
                      <p>Pilih Tanggal</p>
                    ) : (
                      <div>{tanggalBerangkat}</div>
                    )}
                  </button>
                  <MyModal
                    onClose={() => setModalNama("")}
                    visible={modalNama === "tanggal"}
                    idTanggal={idTanggal}
                    pass_tanggal_berangkat={tanggalBerangkat}
                    tanggalPulang={setTanggalPulang}
                    tanggalBerangkat={setTanggalBerangkat}
                  />
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
                          onClick={() => {
                            setModalNama("tanggal");
                          }}
                        >
                          {tanggalPulang === "" ? (
                            <p>Pilih Tanggal</p>
                          ) : (
                            <div>{tanggalPulang}</div>
                          )}
                        </button>
                        <MyModal
                          onClose={() => setModalNama("")}
                          idTanggal={idTanggal}
                          visible={modalNama === "tanggal"}
                          pass_tanggal_berangkat={tanggalBerangkat}
                          tanggalPulang={setTanggalPulang}
                          tanggalBerangkat={setTanggalBerangkat}
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
              onClick={() => {
                handleswap();
              }}
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
                  <p className="mr-[54px] ml-4 text-base text-gray-500">Ke</p>
                </div>
                <div className="flex items-center py-4">
                  <button
                    className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start  py-3"
                    onClick={() => {
                      setModalNama("tiket");
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
                    onClose={() => setModalNama("")}
                    visible={modalNama === "tiket"}
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
                          setModalNama("kursi");
                        }}
                      >
                        {total_penumpang === 0
                          ? "Pilih Kursi"
                          : `${total_penumpang} Penumpang`}
                      </button>
                      <Dropdown
                        onClose={() => {
                          setModalNama("");
                        }}
                        total={total_penumpang}
                        set_total={setTotal_penumpang}
                        visible={modalNama === "kursi"}
                      />
                    </div>
                    <div className=" flex flex-col relative">
                      <p className="text-base text-gray-500">
                        Kelas Penerbangan
                      </p>
                      <button
                        className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                        onClick={() => {
                          setModalNama("kelas");
                        }}
                      >
                        {kelas_penerbangan === "" ? (
                          <div>Pilih Kelas</div>
                        ) : (
                          <div className="whitespace-nowrap">
                            {kelas_penerbangan}
                          </div>
                        )}
                      </button>
                      <PilihKelasPenerbangan
                        onClose={() => {
                          setModalNama("");
                        }}
                        kelas_penerbangan={setKelas_penerbangan}
                        visible={modalNama === "kelas"}
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
