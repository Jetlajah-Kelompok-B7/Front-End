import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = "awdawd";
  // const token = null;

  return (
    <nav className="flex items-center justify-between py-[14px] pl-[75px] pr-[49px] text-[24px]">
      <div className="flex items-center">
        <div className="mr-[78px]">
          <img src="/images/Logo.png" alt="" />
        </div>
        <div className="flex text-[#176B87] gap-4">
          <button className=" font-bold">Beranda</button>
          <button>Tiket</button>
          <button>Promo</button>
        </div>
      </div>
      {token !== null ? (
        <button className="flex text-[#176B87] gap-6 items-center">
          <img
            src="/images/fi_user.png"
            alt=""
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
          <img
            src="/images/fi_list.png"
            alt=""
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
          <img
            src="/images/fi_bell.png"
            alt=""
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
        </button>
      ) : (
        <button className="flex text-[#176B87] gap-4 items-center">
          <img src="/images/User_Image.png" alt="" />
          <p>Daftar / Masuk</p>
        </button>
      )}
    </nav>
  );
}
