import React, { useState } from "react";

export default function Dropdown({ visible, onClose }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  if (!visible) return null;

  return (
    <div className="absolute top-20">
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
      <div className="bg-white px-10 rounded-b-2xl shadow-lg pt-5 pb-3">
        <div className="flex flex-col gap-4">
          {/* dewasa */}
          <div className="flex justify-between gap-14 border-b pb-2">
            <div className="flex items-start gap-2 w-60">
              <img
                src="/images/VectorDewasa.png"
                alt=""
                className="w-full h-5"
              />
              <div className="flex flex-col gap-1">
                <p className="leading-none font-bold">Dewasa</p>
                <p className=" text-sm text-gray-400 whitespace-nowrap">
                  (12 tahun ke atas)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 w-full justify-end">
              <img
                src="/images/Minus.png"
                alt="Decrease"
                className="cursor-pointer h-10 w-10"
                onClick={handleDecrement}
              />
              <div className="px-5 py-[7px] border-2 rounded-md">{count}</div>
              <img
                src="/images/Plus.png"
                alt="Increase"
                className="cursor-pointer h-10 w-10"
                onClick={handleIncrement}
              />
            </div>
          </div>
          {/* Anak */}
          <div className="flex justify-between gap-14 border-b pb-2">
            <div className="flex items-start gap-2 w-60">
              <img src="/images/VectorAnak.png" alt="" className="w-full h-5" />
              <div className="flex flex-col gap-1">
                <p className="leading-none font-bold">Dewasa</p>
                <p className=" text-sm text-gray-400 whitespace-nowrap">
                  (12 tahun ke atas)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 w-full justify-end">
              <img
                src="/images/Minus.png"
                alt="Decrease"
                className="cursor-pointer h-10 w-10"
                onClick={handleDecrement}
              />
              <div className="px-5 py-[7px] border-2 rounded-md">{count}</div>
              <img
                src="/images/Plus.png"
                alt="Increase"
                className="cursor-pointer h-10 w-10"
                onClick={handleIncrement}
              />
            </div>
          </div>
          {/* dewasa */}
          <div className="flex justify-between gap-14 border-b pb-2">
            <div className="flex items-start gap-2 w-60">
              <img src="/images/VectorLaki.png" alt="" className="w-full h-5" />
              <div className="flex flex-col gap-1">
                <p className="leading-none font-bold">Dewasa</p>
                <p className=" text-sm text-gray-400 whitespace-nowrap">
                  (12 tahun ke atas)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 w-full justify-end">
              <img
                src="/images/Minus.png"
                alt="Decrease"
                className="cursor-pointer h-10 w-10"
                onClick={handleDecrement}
              />
              <div className="px-5 py-[7px] border-2 rounded-md">{count}</div>
              <img
                src="/images/Plus.png"
                alt="Increase"
                className="cursor-pointer h-10 w-10"
                onClick={handleIncrement}
              />
            </div>
          </div>
          <div className="   w-full flex justify-end">
            <button className="bg-[#176B87] py-3 px-11 rounded-2xl text-white font-medium">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
