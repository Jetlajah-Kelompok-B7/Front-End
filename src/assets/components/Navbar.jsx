import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center py-[14px] pl-[75px] pr-[49px] text-[24px]">
      <div className="mr-[78px]">
        <img src="/images/Logo.png" alt="" />
      </div>
      <div className="flex flex-grow text-[#176B87] gap-4">
        <button className=" font-bold">Beranda</button>
        <button>Tiket</button>
        <button>Promo</button>
      </div>
      <button className="flex text-[#176B87] gap-4 items-center">
        <img src="/images/User_Image.png" alt="" />
        <p>Daftar / Masuk</p>
      </button>
    </nav>
  );
}
