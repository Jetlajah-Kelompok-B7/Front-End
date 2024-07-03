import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white  text-gray-800 mx-2">
      <img src="/images/not_found.png" alt="" className="w-60 h-auto" />
      <h1 className="text-6xl font-bold mb-4 py-10">404</h1>
      <p className="text-2xl md:text-3xl font-light mb-8 text-wrap text-center">
        Kayaknya kamu menjelajah terlalu jauh nih, balik lagi yuk !
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#176B87] text-white text-lg rounded-md hover:bg-[#52a6c3] transition duration-300"
      >
        Kembali Ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
