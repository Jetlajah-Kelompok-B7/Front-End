import React, { useEffect, useState } from "react";
import MyModal from "./ModalKalender";
import Dropdown from "../Modal/ModalJumlahPenumpang";
import { useDispatch, useSelector } from "react-redux";
import ModalLokasi from "../Modal/ModalLokasiAwal";
import PilihKelasPenerbangan from "../Modal/KelasPenerbangan";
import {
  setInputSearch,
  setTypePenerbangan,
  swapLokasi,
} from "../../../redux/Reducers/TiketReducer";
import { GetTiket, getTiketSearch } from "../../../redux/Action/TiketAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ModalPemesananTiket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [idTanggal, setIdTanggal] = useState(1);
  const list_Pilihan = ["Sekali Jalan", "Pergi - Pulang"];
  const [pilihanUser, setPilihanUser] = useState("Sekali Jalan");
  const [modalMaaf, setModalMaaf] = useState(false);
  const [modalNama, setModalNama] = useState("");
  const [kotaAwal, setKotaAwal] = useState("");
  const [destinasi, setDestinasi] = useState("");
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [total_penumpang, setTotal_penumpang] = useState(0);
  const [kelas_penerbangan, setKelas_penerbangan] = useState("");

  useEffect(() => {
    dispatch(GetTiket());
  }, [dispatch]);

  const totalperpenumpang = useSelector(
    (state) => state?.tiket?.TotalPenumpang
  );
  const { Dewasa } = totalperpenumpang;

  const handlePemesanan = () => {
    if (idTanggal === 1) {
      if (
        kotaAwal !== "" &&
        destinasi !== "" &&
        kelas_penerbangan !== "" &&
        total_penumpang !== 0 &&
        tanggalBerangkat !== ""
      ) {
        if (kotaAwal === destinasi) {
          toast.warning("Kotanya masih sama tuh", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return;
        }
        if (Dewasa <= 0) {
          toast.warning("Harus dalam pendampingan orang dewasa nih", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return;
        }
        dispatch(getTiketSearch());
        dispatch(setTypePenerbangan(pilihanUser));
        navigate("/resultSearch");
        return;
      } else {
        toast.warning("Ada yang kosong nih", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } else {
      toast.warning("Maaf, sistem Pergi - Pulang masih dalam perbaikan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  };

  const handleswap = () => {
    let temp = kotaAwal;
    setKotaAwal(destinasi);
    setDestinasi(temp);
    dispatch(swapLokasi());
  };

  useEffect(() => {
    dispatch(GetTiket());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTiketSearch());
  }, [dispatch]);

  return (
    <div className="w-[1060px] container">
      <div className="relative mx-auto max-xl:mx-5">
        <div className="bg-white pt-5  rounded-2xl border">
          <div className=" px-6">
            <p className="font-bold text-[20px] ml-[10px]">
              Pilih Jadwal Penerbangan spesial di
              <span className="text-[#176B87]"> Jetlajah.In</span>
            </p>
            <div className="flex gap-[15px] ">
              {list_Pilihan.map((e, i) => (
                <div
                  key={i}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    if (e === "Pergi - Pulang") {
                      toast.warning(
                        "Maaf, sistem Pergi - Pulang masih dalam perbaikan",
                        {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        }
                      );
                      return;
                    }
                    setPilihanUser(e);
                    setIdTanggal(i + 1);
                    setModalNama("");
                    dispatch(setTypePenerbangan(e));
                  }}
                >
                  {e === pilihanUser ? (
                    <button className="rounded-full text-white border-2 border-[#176B87] bg-[#64CCC5] px-6">
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
              <div className="flex flex-col flex-1">
                {/* pesawat */}
                <div className="flex items-center">
                  <div className="flex">
                    <img
                      src="/images/IconPesawat.png"
                      alt=""
                      className="h-6 w-6 -ml-[1px]"
                    />
                    <p className="mr-[67px] ml-4 text-base text-gray-500">
                      Dari
                    </p>
                  </div>
                  <div className="flex items-center py-4 flex-1">
                    <button
                      className="border-b font-medium text-[#176B87] text-[18px] text-start  py-3 flex-1"
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
                <div className="flex gap-4">
                  <div className="flex items-center ">
                    <img
                      src="/images/iconTanggal.png"
                      alt=""
                      className="h-6 w-6"
                    />
                    <p className=" mr-4 ml-4 text-base text-gray-500">
                      Tanggal
                    </p>
                  </div>
                  <div className=" flex flex-col flex-1">
                    <p className="text-base  text-gray-500">Tanggal Pergi</p>
                    <button
                      className=" flex-1 border-b font-medium text-[#176B87] text-[18px] text-start py-2 whitespace-nowrap"
                      onClick={() => {
                        if (modalNama === "tanggal") {
                          setModalNama("");
                          return;
                        }
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
                      pass_tanggal_pulang={tanggalPulang}
                      tanggalPulang={setTanggalPulang}
                      tanggalBerangkat={setTanggalBerangkat}
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="flex gap-2 flex-1">
                      {pilihanUser === "Pergi - Pulang" ? (
                        <div className="flex flex-col flex-1">
                          <p className="text-base text-gray-500 truncate">
                            Tanggal Pulang
                          </p>
                          <button
                            className=" border-b truncate font-medium text-[#176B87] text-[18px] text-start py-2"
                            onClick={() => {
                              if (modalNama === "tanggal") {
                                setModalNama("");
                                return;
                              }
                              setModalNama("tanggal");
                            }}
                          >
                            {tanggalPulang === "" ? (
                              <p>Pilih Tanggal</p>
                            ) : (
                              <div>{tanggalPulang}</div>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="  w-full bg-white  h-1"></div> // untuk placeholder saja supaya ukuran tidak berubah
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
              <div className="flex flex-col flex-1">
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
                  <div className="flex items-center py-4 flex-1">
                    <button
                      className="border-b font-medium text-[#176B87] text-[18px] text-start py-3 flex-1"
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
                  </div>
                </div>

                {/* Penumpang */}
                <div className="flex items-center">
                  <img src="/images/iconDuduk.png" alt="" className="w-6 h-6" />
                  <p className="mr-7 ml-4 text-base text-gray-500">untuk</p>
                  <div className=" flex flex-col flex-1">
                    <div className="flex gap-4 flex-1 ">
                      <div className=" relative flex flex-col items-start justify-start flex-1 ">
                        <p className="text-base text-gray-500">Penumpang</p>
                        <button
                          className=" border-b font-medium w-full text-[#176B87] text-[18px] text-start py-2"
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
                      <div className=" flex flex-col relative flex-1">
                        <p className="text-base text-gray-500 truncate">
                          Kelas Penerbangan
                        </p>
                        <button
                          className=" border-b font-medium text-[#176B87] text-[18px] text-start py-2"
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
          <button
            className="w-full text-center font-bold text-[16px] py-4 mt-7 text-white bg-[#176B87] rounded-b-2xl"
            onClick={() => {
              handlePemesanan();
            }}
          >
            Cari Penerbangan
          </button>
        </div>
      </div>
    </div>
  );
}
