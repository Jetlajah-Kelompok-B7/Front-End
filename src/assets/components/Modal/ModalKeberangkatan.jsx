import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLokasiTujuan } from "../../../redux/Reducers/TiketReducer"; 

export default function ModalKeberangkatan({ visible, onClose }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const dispatch = useDispatch();

  const DataLokasi = useSelector((state) => {
    return state?.tiket?.lokasi;
  });

  if (!visible) return null;
  return (
    <div className="absolute z-50 top-[55px] right-[86px]">
      <div className="flex justify-center items-center z-50">
        <div className="bg-white py-3 px-6 border-4 rounded-2xl border-[#176B87] w-[701px]">
          <div className="flex justify-between">
            <p className=" text-lg font-bold text-[#176B87] ">Kota Tujuan</p>
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
                  setSelectedLocation(lokasi);
                  dispatch(setLokasiTujuan(lokasi));
                }}
              >
                {lokasi === selectedLocation ? (
                  <div className="border-b border-[#176B87]">
                    <div className="">{lokasi}</div>
                    <div className=" text-gray-400">{lokasi}</div>
                  </div>
                ) : (
                  <div className="border-b">
                    <div className="">{lokasi}</div>
                    <div className="text-gray-400">{lokasi}</div>
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
