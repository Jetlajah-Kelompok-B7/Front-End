import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function SearchHistoryModal({ visible, onClose, setSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearch(e.target.value);
  };

  if (!visible) return null;

  return (
    <div className="container mx-auto flex items-center justify-between gap-1">
      <input
        type="text"
        value={inputValue.trimStart()}
        onChange={handleInputChange}
        pattern="^[a-zA-Z ]*$"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");
        }}
        placeholder="Masukan Nama Lokasi yang dicari..."
        className="bg-white outline-none border w-full border-gray-300 rounded-xl py-2 px-4 mt-2"
      />
      <div className=" flex">
        <ClearRoundedIcon
          style={{ fontSize: 28 }}
          className="text-[#176b87] hover:cursor-pointer -mr-1 mt-1"
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
}
