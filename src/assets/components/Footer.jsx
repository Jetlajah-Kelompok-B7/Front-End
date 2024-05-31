import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col  bg-[#176B87]  pt-[30px] pb-6 px-[236px] mt-[68px]">
      <div className="flex items-baseline gap-16 text-white">
        <div className="flex-1 self-center">
          <p className=" text-[40px] font-bold">Jetlajah.In</p>
          <p className=" text-xs text-justify">
            Jetlajah.In merupakan website penerbahan, dengan slogan terbang
            menembus angkas. bersama kami terbang aman dan nyaman.
          </p>
        </div>
        <div className="flex flex-col flex-1 text-xs">
          <p className="text-base font-semibold mb-2">Navigasi</p>
          <div className="flex flex-col gap-0.5">
            <a href="/" className="footer-link">
              Home
            </a>
            <a href="/" className="footer-link">
              Destinasi Favorit
            </a>
            <a href="/" className="footer-link">
              Riwayat Transaksi
            </a>
            <a href="/" className="footer-link">
              Notifikasi
            </a>
            <a href="/" className="footer-link">
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-xs ">
          <p className="text-base font-semibold mb-2">Follow Kami di</p>
          <div className="flex flex-col gap-0.5">
            <a href="/" className="footer-link">
              Instagram
            </a>
            <a href="/" className="footer-link">
              Twitter
            </a>
            <a href="/" className="footer-link">
              Facebook
            </a>
            <a href="/" className="footer-link">
              Email
            </a>
            <a href="/" className="footer-link">
              Youtube
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-xs ">
          <p className="text-base font-semibold mb-2">Bantuan</p>
          <div className="flex flex-col gap-0.5">
            <a href="/" className="footer-link">
              Hubungi Kami
            </a>
            <a href="/" className="footer-link">
              FAQ
            </a>
            <a href="/" className="footer-link">
              Promo
            </a>
            <a href="/" className="footer-link">
              Cara Pesan
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-xs">
          <p className="text-base font-semibold mb-2">Tentang Kami</p>
          <div className="flex flex-col gap-0.5">
            <a href="/" className="footer-link">
              Tentang Jetlajah.In
            </a>
            <a href="/" className="footer-link">
              Member Kami
            </a>
          </div>
        </div>
      </div>
      <p className="w-full text-center text-white text-xs mt-10">
        Copyright &copy; 2024 Jetlajah.In All rights reserved
      </p>
    </footer>
  );
}
