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

  const Kelas = ["Economy", "Premium Economy", "Business", "First Class"];

  if (!visible) return null;
  return (
    <div className="absolute max-lg:fixed max-lg:inset-0 top-20 max-lg:top-0 max-lg:bg-black shadow-lg max-lg:bg-opacity-30 max-lg:h-screen max-lg:w-screen flex max-lg:items-end ">
      <div className="w-full">
        <div
          className="flex justify-end items-center border-b bg-white text-base rounded-t-2xl"
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
        <div className="bg-white w-[400px] max-lg:w-full ">
          <div className=" mx-2 font-medium text-sm">
            {Kelas.map((kelas, index) => (
              <div
                key={index}
                className=" hover:cursor-pointer"
                onClick={() => {
                  setSelectedclass(kelas);
                }}
              >
                {kelas === selectedclass ? (
                  <div className="bg-[#176B87]">
                    <div className="border-b mx-4 py-3 flex justify-between items-center">
                      <div className="text-white">{kelas}</div>
                      <img
                        src="/images/centang.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="border-b py-3 mx-4  items-center">
                      {kelas}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white flex justify-end py-3 rounded-b-2xl max-lg:rounded-none px-2">
          <button
            className="bg-[#176B87] py-3 px-11 rounded-2xl text-white font-medium max-lg:w-full"
            onClick={() => {
              dispatch(setKelasPenerbangan(selectedclass));
              kelas_penerbangan(selectedclass);
              onClose();
            }}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
