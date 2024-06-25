import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinasiPesawat,
  setLokasiKeberangkatan,
} from "../../../redux/Reducers/TiketReducer";
import { GetDataBandara } from "../../../redux/Action/TiketAction";

export default function ModalLokasi({
  visible,
  onClose,
  setKotaAwal,
  setDestinasi,
  id,
}) {
  const [selectedKota, setSelectedkota] = useState("");
  const [selectedDestinasi, setSelectedDestinasi] = useState("");
  const dispatch = useDispatch();
  // const DataLokasi = useSelector((state) => {
  //   return state?.tiket?.lokasi;
  // });

  // Fetch data bandara
  const allBandara = useSelector((state) => state?.tiket.lokasi);
  useEffect(() => {
    dispatch(GetDataBandara());
    if (allBandara) {
      // console.log("data pesawatku", allBandara);
    }
  }, [allBandara]);

  // const DataLokasi = ["bali", "surabaya"];

  if (!visible) return null;
  return (
    <div className="absolute z-50 inset-0 flex items-center justify-center top-[170px]">
      <div className="flex justify-center items-center z-50">
        <div className="bg-white py-3 px-6 border-4 rounded-2xl border-[#176B87] w-[700px]">
          <div className="flex justify-between">
            <p className=" text-lg font-bold text-[#176B87] ">
              {id === 1 ? (
                <span>Kota Keberangkatan</span>
              ) : (
                <span>Kota Destinasi</span>
              )}
            </p>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <img
                src="/images/X.png"
                alt=""
                className="h-4 w-4 my-[14px] mx-4 hover:cursor-pointer"
              />
            </button>
          </div>
          <div className="max-h-[262px] overflow-y-auto flex flex-col gap-2">
            {allBandara.map((lokasi, index) => (
              <div
                key={index}
                className="hover:cursor-pointer"
                onClick={() => {
                  if (id === 1) {
                    dispatch(setLokasiKeberangkatan(lokasi.id));
                    setKotaAwal(lokasi.kode_bandara);
                    setSelectedkota(lokasi.lokasi);
                  } else {
                    setDestinasi(lokasi.kode_bandara);
                    dispatch(setDestinasiPesawat(lokasi.id));
                    setSelectedDestinasi(lokasi.lokasi);
                  }
                }}
              >
                {lokasi === (id === 1 ? selectedKota : selectedDestinasi) ? (
                  <div className="border-b-2">
                    {lokasi.lokasi} <br />
                    <span className="text-gray-500">
                      {lokasi.kode_bandara} - {lokasi.nama_bandara}
                    </span>
                  </div>
                ) : (
                  <div className="border-b-2">
                    {lokasi.lokasi} <br />
                    <span className="text-gray-500">
                      {lokasi.kode_bandara} - {lokasi.nama_bandara}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
