import React, { useEffect, useState } from "react";
import MyModal from "./ModalKalender";
import Dropdown from "../Modal/ModalJumlahPenumpang";
import { useDispatch, useSelector } from "react-redux";
import ModalLokasi from "../Modal/ModalLokasiAwal";
import PilihKelasPenerbangan from "../Modal/KelasPenerbangan";
import { setTypePenerbangan, swapLokasi } from "../../../redux/Reducers/TiketReducer";
import { GetTiket, getTiketSearch } from "../../../redux/Action/TiketAction";
import { useNavigate } from "react-router-dom";


export default function ModalPemesananTiketMobile() {
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
  const [idTanggal, setIdTanggal] = useState(1);
  const list_Pilihan = ["Sekali Jalan", "Pergi - Pulang"];
  const [pilihanUser, setPilihanUser] = useState("Sekali Jalan");
  const [modalNama, setModalNama] = useState("");
  const [kotaAwal, setKotaAwal] = useState("");
  const [destinasi, setDestinasi] = useState("");
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  
  const navigate = useNavigate();

  const handlePemesanan = () => {
    if (idTanggal === 1) {
      if (
        kotaAwal !== "" &&
        destinasi !== "" &&
        tanggalBerangkat !== ""
      ) {
        if (kotaAwal === destinasi) {
          alert("Lokasi Awal dan Destinasi Tidak Boleh Sama");
          return;
        }
        dispatch(getTiketSearch())
        dispatch(setTypePenerbangan(pilihanUser))
        navigate("/resultSearch");
        return;
      } else {
        alert("Harap Lengkapi Semua Formulir");
        return;
      }
    } else {
      if (
        kotaAwal !== "" &&
        destinasi !== "" &&
        tanggalBerangkat !== "" &&
        tanggalPulang !== ""
      ) {
        if (kotaAwal === destinasi) {
          alert("Lokasi Awal dan Destinasi Tidak Boleh Sama");
          return;
        }
        dispatch(getTiketSearch())  
        dispatch(setTypePenerbangan(pilihanUser))
        navigate("/resultSearch");
        return;
      } else {
        alert("Harap Lengkapi Semua Formulir");
        return;
      }
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

  const DataBaru = useSelector((state) => state?.tiket);
  const {
    KelasPenerbangan,
    LokasiKeberangkatan,
    TanggalKeberangkatan,
    TanggalKepulangan,
    lokasiTujuan,
    totalSemuaPenumpang,
    idTiket,
  } = DataBaru || {};

  useEffect(() => {
  
   
    dispatch(getTiketSearch());
  
   
  }, [dispatch]);
 


  return (
    <div className="relative">
      <div className=" w-screen">
        <div className="bg-white mx-3 rounded-2xl border">
          <div className=" px-6 py-2">
            <div className="flex items-center flex-col">
              {/* lokasi */}
              <div className=" flex-col flex w-full -space-y-5">
                <Inputlokasiawal
                  kota_awal={kotaAwal}
                  setkota={setKotaAwal}
                  destinasi={destinasi}
                  setdestinasi={setDestinasi}
                  id={id}
                  setId={setId}
                  modal={modalNama}
                  setmodal={setModalNama}
                />
                <Inputdestinasi
                  kota_awal={kotaAwal}
                  setkota={setKotaAwal}
                  destinasi={destinasi}
                  setdestinasi={setDestinasi}
                  id={id}
                  setId={setId}
                  modal={modalNama}
                  setmodal={setModalNama}
                />
                <button
                  className="absolute top-20 right-10"
                  onClick={() => {
                    handleswap();
                  }}
                >
                  <img
                    src="/images/return.png"
                    alt=""
                    className="size-8 rotate-90"
                  />
                </button>
              </div>
              {/* Sekali Jalan */}
              <div className="w-full mb-6">
                <PilihanUser
                  pilihan={pilihanUser}
                  setPilihan={setPilihanUser}
                  list={list_Pilihan}
                  setId={setIdTanggal}
                />
              </div>
              {/* tanggal */}
              <div className="w-full flex">
                <Inputtanggal
                  idTanggal={idTanggal}
                  tanggal_berangkat={tanggalBerangkat}
                  tanggal_pulang={tanggalPulang}
                  setTanggalP={setTanggalPulang}
                  setTangalB={setTanggalBerangkat}
                  modal={modalNama}
                  setModal={setModalNama}
                  pilihan={pilihanUser}
                />
              </div>
              {/* penumpang */}
              <div className="w-full flex mt-6">
                <Inputpenumpang modal={modalNama} setmodal={setModalNama} />
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
function PilihanUser({ pilihan, setPilihan, list, setId }) {

  const dispatch = useDispatch();
  return (
    <div className="flex justify-center gap-4">
      {list.map((e, i) => (
        <div
          key={i}
          className="hover:cursor-pointer w-full"
          onClick={() => {
            setPilihan(e);
            setId(i + 1);
            dispatch(setTypePenerbangan(e))
          }}
        >
          {e === pilihan ? (
            <button className="py-1.5 w-full border-2 border-[#176B87] bg-[#64CCC5] px-6 rounded-full">
              {e}
            </button>
          ) : (
            <button className="py-1.5 w-full border-2 border-[#176B87] px-6 rounded-full">
              {e}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
function Inputlokasiawal({
  kota_awal,
  setkota,
  setdestinasi,
  id,
  setId,
  modal,
  setmodal,
}) {
  return (
    <div className="flex items-center flex-1">
      <div className="flex">
        <img
          src="/images/IconPesawat.png"
          alt=""
          className="h-6 w-6 -ml-[1px]"
        />
        <p className="mr-6 ml-3 text-base text-gray-500">Dari</p>
      </div>
      <div className="flex items-center py-4 flex-1">
        <button
          className="border-b font-medium text-[#176B87] text-[18px] text-start py-3 flex-1"
          onClick={() => {
            setmodal("tiket");
            setId(1);
          }}
        >
          {kota_awal === "" ? <p>Pilih Kota</p> : <p>{kota_awal}</p>}
        </button>
        <ModalLokasi
          onClose={() => setmodal("")}
          visible={modal === "tiket"}
          setKotaAwal={setkota}
          setDestinasi={setdestinasi}
          id={id}
        />
      </div>
    </div>
  );
}
function Inputdestinasi({
  setkota,
  destinasi,
  setdestinasi,
  id,
  setId,
  modal,
  setmodal,
}) {
  return (
    <div className="flex items-center">
      <div className="flex">
        <img
          src="/images/IconPesawat.png"
          alt=""
          className="h-6 w-6 -ml-[1px]"
        />
        <p className="mr-9 ml-3 text-base text-gray-500">Ke</p>
      </div>
      <div className="flex items-center py-4 flex-1">
        <button
          className="border-b font-medium text-[#176B87] text-[18px] text-start py-3 flex-1"
          onClick={() => {
            setmodal("tiket");
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
          onClose={() => setmodal("")}
          visible={modal === "tiket"}
          setKotaAwal={setkota}
          setDestinasi={setdestinasi}
          id={id}
        />
      </div>
    </div>
  );
}
function Inputtanggal({
  idTanggal,
  tanggal_berangkat,
  tanggal_pulang,
  setTanggalP,
  setTangalB,
  modal,
  setModal,
  pilihan,
}) {
  return (
    <div className="flex flex-1 items-center justify-center w-full  gap-2">
      <div className="flex items-center ">
        <img src="/images/iconTanggal.png" alt="" className="h-6 w-6" />
      </div>
      <div className="w-full justify-center  flex max-xs:flex-col  gap-2">
        <div className=" flex flex-1  flex-col ">
          <p className="text-base text-gray-500">Tanggal Pergi</p>
          <button
            className=" border-b font-medium text-[#176B87] text-[18px] text-start py-2 whitespace-nowrap"
            onClick={() => {
              setModal("tanggal");
            }}
          >
            {tanggal_berangkat === "" ? (
              <p>Pilih Tanggal</p>
            ) : (
              <div>{tanggal_berangkat}</div>
            )}
          </button>
          <MyModal
            onClose={() => setModal("")}
            visible={modal === "tanggal"}
            idTanggal={idTanggal}
            pass_tanggal_berangkat={tanggal_berangkat}
            pass_tanggal_pulang={tanggal_pulang}
            tanggalPulang={setTanggalP}
            tanggalBerangkat={setTangalB}
          />
        </div>

        <div className="flex items-center flex-1 ">
          <div className="flex gap-2 flex-1  ">
            {pilihan === "Pergi - Pulang" ? (
              <div className="flex flex-1  flex-col">
                <p className="text-base text-gray-500">Tanggal Pulang</p>
                <button
                  className=" border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                  onClick={() => {
                    setModal("tanggal");
                  }}
                >
                  {tanggal_pulang === "" ? (
                    <p>Pilih Tanggal</p>
                  ) : (
                    <div>{tanggal_pulang}</div>
                  )}
                </button>
              </div>
            ) : (
              <div className=" bg-white h-1 flex-1"></div> // untuk placeholder saja supaya ukuran tidak berubah
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function Inputpenumpang({ modal, setmodal }) {
  const [total_penumpang, setTotal_penumpang] = useState(0);
  const [kelas_penerbangan, setKelas_penerbangan] = useState("");

  return (
    <div className="flex items-center w-full">
      <img src="/images/iconDuduk.png" alt="" className="w-6 h-6 mr-2" />
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 max-xs:flex-col">
          <div className=" flex flex-col items-start justify-start flex-1">
            <p className="text-base text-gray-500">Penumpang</p>
            <button
              className="border-b w-full font-medium text-[#176B87] text-[18px] text-start py-2"
              onClick={() => {
                setmodal("kursi");
              }}
            >
              {total_penumpang === 0
                ? "Pilih Kursi"
                : `${total_penumpang} Penumpang`}
            </button>
            <Dropdown
              onClose={() => {
                setmodal("");
              }}
              total={total_penumpang}
              set_total={setTotal_penumpang}
              visible={modal === "kursi"}
            />
          </div>

          <div className="flex items-center flex-1">
            <div className="flex flex-col md:relative flex-1">
              <p className="text-base text-gray-500 truncate">
                Kelas Penerbangan
              </p>
              <button
                className="border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                onClick={() => {
                  setmodal("kelas");
                }}
              >
                {kelas_penerbangan === "" ? (
                  <div>Pilih Kelas</div>
                ) : (
                  <div className="whitespace-nowrap">{kelas_penerbangan}</div>
                )}
              </button>
              <PilihKelasPenerbangan
                onClose={() => {
                  setmodal("");
                }}
                kelas_penerbangan={setKelas_penerbangan}
                visible={modal === "kelas"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}