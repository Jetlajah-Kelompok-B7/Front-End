import React, { useEffect, useState } from "react";
import "../App.css";

export default function addPin() {
  const [pin, setPin] = useState(new Array(6).fill(""));
  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;
    setPin([
      ...pin.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);

    // Move focus to the next input field
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && pin[index] === "") {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  }

  return (
    <div className="bg-white flex justify-center h-screen items-center">
      <div className="w-[737px] h-[482px] max-sm:w-[100px] max-sm:h-auto flex flex-col border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20">
        <h1 className="text-[24px] poppins-bold items-start ml-[84px] mt-[69px]">
          Buat PIN
        </h1>
        <div className="flex flex-col justify-center place-items-center mt-[40px]">
          <p className="text-sm">Buat PIN dengan 6 angka</p>
          <div className="flex gap-3 mt-[44px]">
            {pin.map((data, i) => {
              return (
                <input
                  key={i}
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={1}
                  className="input-pin"
                />
              );
            })}
          </div>
          <button className="flex mt-[81px] w-[568px] h-[48px] bg-[#176B87] hover:bg-[#114B5E] text-sm text-white rounded-2xl justify-center items-center">
            Buat
          </button>
        </div>
      </div>
    </div>
  );
}
