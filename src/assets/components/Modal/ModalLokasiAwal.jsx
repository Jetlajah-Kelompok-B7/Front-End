import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinasiPesawat,
  setLokasiKeberangkatan,
} from "../../../redux/Reducers/TiketReducer";

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
  const DataLokasi = ["bali", "surabaya"];

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
          <div className="max-h-[262px] overflow-y-auto flex flex-col gap-2 ">
            {DataLokasi.map((lokasi, index) => (
              <div
                key={index}
                className=" hover:cursor-pointer"
                onClick={() => {
                  if (id === 1) {
                    dispatch(setLokasiKeberangkatan(lokasi));
                    setKotaAwal(lokasi);
                    setSelectedkota(lokasi);
                  } else {
                    setDestinasi(lokasi);
                    dispatch(setDestinasiPesawat(lokasi));
                    setSelectedDestinasi(lokasi);
                  }
                }}
              >
                {lokasi === (id === 1 ? selectedKota : selectedDestinasi) ? (
                  <div className="border-b-2">
                    {lokasi} <br />
                    <span className="text-gray-500">
                      {lokasi} - {lokasi}
                    </span>
                  </div>
                ) : (
                  <div className="border-b-2">
                    {lokasi}
                    <br />
                    <span className="text-gray-500">
                      {lokasi} - {lokasi}
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
