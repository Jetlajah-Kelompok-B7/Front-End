import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function ModalFilterKeberangkatan({
  visible,
  onClose,
  setFilter,
}) {
  const [selectedclass, setSelectedclass] = useState("");
  const filter = ["Issued", "Unpaid"];
  if (!visible) return null;
  return (
    <div className="absolute top-[50px] shadow-lg rounded-2xl right-0">
      <div
        className="flex justify-end bg-[#176b87] text-base rounded-t-2xl px-2 py-2"
        onClick={() => {
          onClose();
        }}
      >
        <ClearRoundedIcon
          style={{ fontSize: 20 }}
          className="text-white hover:cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="bg-white w-[200px] rounded-2xl">
        <div className=" font-medium text-sm">
          {filter.map((kelas, index) => (
            <div
              key={index}
              className=" hover:cursor-pointer"
              onClick={() => {
                if (selectedclass !== "" && selectedclass === kelas) {
                  return setSelectedclass(""), setFilter("");
                }
                setSelectedclass(kelas);
                setFilter(kelas);
              }}
            >
              {kelas === selectedclass ? (
                kelas === "Unpaid" ? (
                  <div className=" bg-[#176B87] border-b px-2 py-3 flex justify-between items-center rounded-b-xl">
                    <div className="text-white">{kelas}</div>
                    <img src="/images/centang.png" alt="" className="w-6 h-6" />
                  </div>
                ) : (
                  <div className=" bg-[#176B87]  border-b px-2 py-3 flex justify-between items-center">
                    <div className="text-white">{kelas}</div>
                    <img src="/images/centang.png" alt="" className="w-6 h-6" />
                  </div>
                )
              ) : (
                <div className="border-b py-3 px-2 items-center">{kelas}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
