import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../assets/components/Navbar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalRincianHarga from "../assets/components/Modal/ModalRincianHarga";
import ModalCetakTiket from "../assets/components/Modal/ModalCetakTiket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetTiket } from "../redux/Action/TiketAction";

export default function DetailTiket() {
  const [modal, setModal] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="shadow">
        <div className="container mx-auto">
          <div className="fixed top-0 w-full bg-white z-10">
            <Navbar />
          </div>
        </div>
      </div>
      {/* Detail Penerbangan */}
      <div className=" shadow">
        <div className="container mx-auto">
          <div className="mx-[260px] max-lg:mx-[20px] flex flex-col gap-3 pb-3 pt-[47px]">
            <div className=" text-xl font-bold">Detail Penerbangan</div>
            <div className="flex ml-4 items-center mt-6 gap-4">
              <button
                className="bg-[#176b87] py-3 rounded-xl text-start px-4 text-base text-white font-semibold flex-1"
                onClick={() => {
                  navigate("/History");
                }}
              >
                <ArrowBackIcon className="font-bold mr-3" />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Detail Tiket */}
      <div className="container mx-auto">
        <div
          className="flex items-start gap-[10px] mx-[276px] px-[69px] py-[31px] rounded-[4px] shadow border mt-[41px] hover:cursor-pointer "
          onClick={() => {
            setModal(true);
            if (modal === true) {
              setModal(false);
            }
          }}
        >
          <img
            src="/images/IconPesawatBiru.png"
            alt=""
            className="h-5 -ml-[1px] mt-1"
          />
          <div className="flex flex-col w-full ">
            <div className="flex justify-between  pb-[13px] ">
              <p className="text-2xl font-semibold">Jakarta -&gt; Surabaya</p>
              <p className="text-lg">
                Order ID :
                <span className="font-bold text-[#176B87]">6723y2GHK</span>
              </p>
            </div>
            <div className="flex justify-between items-center py-[13px] border-t">
              <p className="text-base font-bold">Total</p>
              <p className="text-lg font-bold text-[#176B87] flex items-center transition-transform">
                IDR 9.850.000
                <KeyboardArrowUpIcon
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    modal ? "rotate-180" : ""
                  }`}
                />
              </p>
            </div>
          </div>
        </div>
        <ModalRincianHarga onClose={() => setModal(false)} visible={modal} />
        {/* Detail Pemesanan */}
        <div className="px-[69px] mt-4 py-3 border shadow mx-[276px] mb-7 rounded-[4px]">
          <div className="flex justify-between">
            <p className="w-full font-bold text-lg">Detail Pesanan</p>
            <p className="text-sm text-white flex rounded-2xl py-1 px-3 items-center bg-[#73CA5C] whitespace-nowrap">
              Sudah di Terbitkan
            </p>
          </div>

          <p className="w-full text-lg pb-[10px]">
            Booking Code:
            <span className="text-[#176B87] font-bold">6723y2GHK</span>
          </p>
          <div className=" text-sm">
            {/* Keberangkatan */}
            <div className="flex gap-[13px] items-center">
              <p className="text-sm">
                <span className="font-bold text-base"> 07:00 </span>
                <br />3 Mar
              </p>
              <div className="flex border-b justify-between flex-1 items-center">
                <div className="flex gap-[39px]">
                  <p className="font-medium">
                    Soekarno Hatta <br />
                    Terminal 1A Domestik
                  </p>
                  <p className="self-start mt-1 ml-[23px]">
                    <AccessTimeIcon style={{ fontSize: 18 }} /> 1j 0m
                  </p>
                </div>
                <p className=" text-xs text-[#64ccc5] font-bold">
                  Keberangkatan
                </p>
              </div>
            </div>
            {/* Jet Air */}
            <div className="flex items-center gap-2  py-2 mb-3 mx-[60px]">
              <img src="/images/logoPayment.png" alt="" className="h-6 w-6" />
              <div className="flex flex-1 flex-col justify-between gap-5">
                <p className=" text-sm font-bold">
                  Jet Air - Economy <br />
                  JT - 203
                </p>
                <p className="text-sm">
                  <span className="font-bold">Informasi:</span> <br />
                  <span className="text-[#64ccc5] font-medium">
                    Penumpang 1: Mr. Harry Potter
                  </span>
                  <br />
                  ID: 1234567 <br />
                  Kursi : QZ1345 |{" "}
                  <span className="text-[#176B87] font-semibold">
                    Ekonomi
                  </span>{" "}
                  <br />
                  Kabin : 7 Kg <br />
                  Bagasi : 20 Kg
                </p>
              </div>
            </div>
            {/* Kedatangan */}
            <div className="flex gap-[13px] items-center">
              <p className="text-sm">
                <span className="font-bold text-base"> 07:00 </span>
                <br />3 Mar
              </p>
              <div className="flex border-b border-t py-[13px] justify-between flex-1 items-center">
                <div className="flex gap-[39px]">
                  <p className="font-medium">
                    Soekarno Hatta <br />
                    Terminal 1A Domestik
                  </p>
                </div>
                <p className=" text-xs text-[#64ccc5] font-bold">
                  Keberangkatan
                </p>
              </div>
            </div>
            {/* cetak tiket */}
            <div className="text-center pt-[18px] pb-[13px]">
              <button
                className=" text-white bg-[#176B87] text-sm px-[85px] py-3 rounded-lg"
                onClick={() => {
                  setModalTiket(true);
                }}
              >
                Cetak Tiket
              </button>
              <ModalCetakTiket
                onClose={() => setModalTiket(false)}
                visible={modalTiket}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
