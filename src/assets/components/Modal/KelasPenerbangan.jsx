import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKelasPenerbangan } from "../../../redux/Reducers/TiketReducer";

export default function PilihKelasPenerbangan({
  visible,
  onClose,
  kelas_penerbangan,
}) {
  const dispatch = useDispatch();
  const [selectedclass, setSelectedclass] = useState("");

  const Data_Tiket = useSelector((state) => {
    return state.tiket.lokasi;
  });

  const KelasPenerbangan = useSelector((state) => {
    return state.tiket.KelasPenerbangan;
  });

  if (!visible) return null;

  return (
    <div className="absolute top-20 shadow-lg rounded-2xl ">
      <div
        className="flex justify-end border-b bg-white text-base rounded-t-2xl"
        onClick={() => {
          onClose();
        }}
      >
        <img
          src="/images/X.png"
          alt=""
          className="h-4 w-4 my-[14px] mx-4 hover:cursor-pointer"
        />
      </div>
      <div className="bg-white w-[400px]">
        <div className=" mx-2 font-medium text-sm">
          {Data_Tiket.map((kelas, index) => (
            <div
              key={index}
              className=" hover:cursor-pointer"
              onClick={() => {
                setSelectedclass(kelas.class);
              }}
            >
              {kelas.class === selectedclass ? (
                <div className="bg-[#176B87]">
                  <div className="border-b mx-4 py-3 flex justify-between items-center">
                    <div className="text-white">
                      {kelas.class} <br />
                      <span className="text-sm">
                        Rp. {kelas.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <img src="/images/centang.png" alt="" className="w-6 h-6" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border-b py-3 mx-4  items-center">
                    {kelas.class} <br />
                    <span>Rp. {kelas.price.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white flex justify-end py-3 px-2">
        <button
          className="bg-[#176B87] py-3 px-11 rounded-2xl text-white font-medium"
          onClick={() => {
            dispatch(setKelasPenerbangan(selectedclass));
            kelas_penerbangan(selectedclass)
            onClose();
          }}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
