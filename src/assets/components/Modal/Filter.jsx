import React, { useState } from "react";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setFilterHarga } from "../../../redux/Reducers/FilterHargaReducers";

const FilterHarga = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [selectedFilterHarga, setSelectedFilterHarga] = useState("");
  const dataFilterHarga = [
    "Harga - Termurah",
    "Durasi - Terpendek",
    "Keberangkatan - Paling Awal",
    "Keberangkatan - Paling Akhir",
    "Kedatangan - Paling Awal",
    "Kedatangan - Paling Akhir",
  ];

  const filterHarga = useSelector((state) => state.filter.filterHarga);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 top-20 shadow-lg rounded-2xl bg-white w-[400px] max-sm:w-full">
      <div className="py-3 pr-3 flex justify-end border-b bg-white text-base rounded-t-2xl">
        <XMarkIcon
          className="h-6 w-6 text-black hover:cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div>
        <div className="z-50 mx-2 font-medium text-sm">
          {dataFilterHarga.map((filterHarga, index) => (
            <div
              className="hover:cursor-pointer"
              key={index}
              onClick={() => setSelectedFilterHarga(filterHarga)}
            >
              {filterHarga === selectedFilterHarga ? (
                <div className="bg-[#176B87]">
                  <div className="border-b mx-4 py-3 flex justify-between items-center">
                    <div className="text-white">{filterHarga}</div>
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="z-50 border-b py-3 mx-4 items-center">
                    {filterHarga}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end py-3 px-2">
        <button
          className="bg-[#176B87] py-3 px-11 rounded-2xl text-white font-medium"
          onClick={() => {
            dispatch(setFilterHarga(selectedFilterHarga));
            onClose();
          }}
        >
          Pilih
        </button>
      </div>
    </div>
  );
};

export default FilterHarga;
