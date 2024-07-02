import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  hitungsemuapenumpang,
  setTotalPenumpang,
} from "../../../redux/Reducers/TiketReducer";
import { toast } from "react-toastify";

export default function Dropdown({ visible, onClose, total, set_total }) {
  const dispatch = useDispatch();
  const [dewasa, setDewasa] = useState(0);
  const [anak, setAnak] = useState(0);
  const [bayi, setBayi] = useState(0);
  const totalDewasa = dewasa + anak;

  const handleIncrementDewasa = () => {
    if (totalDewasa >= 7) {
      toast.warning("Maksimal 7 kursi untuk Dewasa dan Anak", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setDewasa(dewasa + 1);
  };
  const handleDecrementdewasa = () => {
    if (dewasa > 0) {
      setDewasa(dewasa - 1);
    }
  };
  const handleIncrementAnak = () => {
    if (totalDewasa >= 7) {
      toast.warning("Maksimal 7 kursi untuk Dewasa dan Anak", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setAnak(anak + 1);
  };
  const handleDecrementAnak = () => {
    if (anak > 0) {
      setAnak(anak - 1);
    }
  };
  const handleIncrementBayi = () => {
    if (bayi >= 4) {
      toast.warning("Maksimal 4 kursi untuk Bayi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setBayi(bayi + 1);
  };
  const handleDecrementBayi = () => {
    if (bayi > 0) {
      setBayi(bayi - 1);
    }
  };

  const handleSave = () => {
    const totalPenumpang = {
      Dewasa: dewasa,
      Anak: anak,
      Bayi: bayi,
    };
    set_total(dewasa + anak + bayi);
    dispatch(setTotalPenumpang(totalPenumpang));
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="absolute max-lg:fixed right-0 max-lg:bg-black max-lg:bg-opacity-30 flex item-end max-lg:justify-center max-lg:inset-0 z-50 max-lg:h-screen top-20">
      <div className="max-lg:absolute  w-full max-lg:bottom-0">
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
        <div className="bg-white px-10 max-sm:px-6 rounded-b-2xl  max-lg:rounded-none shadow-lg pt-5 pb-3">
          <div className="flex flex-col gap-4 ">
            {/* dewasa */}
            <div className="flex justify-between gap-14 border-b pb-2">
              <div className="flex items-start gap-2 w-60">
                <img src="/images/VectorDewasa.png" alt="" className=" h-5" />
                <div className="flex flex-col gap-1">
                  <p className="leading-none font-bold ">Dewasa</p>
                  <p className=" text-sm text-gray-400 whitespace-nowrap max-sm:text-xs text-wrap">
                    {`(> 12 tahun)`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 w-full justify-end">
                <img
                  src="/images/Minus.png"
                  alt="Decrease"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleDecrementdewasa}
                />
                <div className="px-5 py-[7px] border-2 rounded-md w-[55px]">
                  {dewasa}
                </div>
                <img
                  src="/images/Plus.png"
                  alt="Increase"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleIncrementDewasa}
                />
              </div>
            </div>
            {/* Anak */}
            <div className="flex justify-between gap-14 border-b pb-2">
              <div className="flex items-start gap-2 w-60">
                <img src="/images/VectorAnak.png" alt="" className=" h-5" />
                <div className="flex flex-col gap-1">
                  <p className="leading-none font-bold">Anak</p>
                  <p className=" text-sm max-sm:text-xs text-wrap text-gray-400 whitespace-nowrap">
                    (2-11 tahun)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 w-full justify-end">
                <img
                  src="/images/Minus.png"
                  alt="Decrease"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleDecrementAnak}
                />
                <div className="px-5 py-[7px] border-2 rounded-md w-[55px]">
                  {anak}
                </div>
                <img
                  src="/images/Plus.png"
                  alt="Increase"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleIncrementAnak}
                />
              </div>
            </div>
            {/* Bayi */}
            <div className="flex justify-between gap-14 border-b pb-2">
              <div className="flex items-start gap-2 w-60">
                <img src="/images/VectorLaki.png" alt="" className="h-5" />
                <div className="flex flex-col gap-1">
                  <p className="leading-none font-bold">Bayi</p>
                  <p className=" text-sm text-gray-400 whitespace-nowrap">
                    {`(< 2 tahun)`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 w-full justify-end">
                <img
                  src="/images/Minus.png"
                  alt="Decrease"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleDecrementBayi}
                />
                <div className="px-5 py-[7px] border-2 rounded-md w-[55px]">
                  {bayi}
                </div>
                <img
                  src="/images/Plus.png"
                  alt="Increase"
                  className="cursor-pointer h-10 w-10"
                  onClick={handleIncrementBayi}
                />
              </div>
            </div>
            <div className="   w-full flex justify-end max-lg:mt-16">
              <button
                className="bg-[#176B87] max-lg:w-full py-3 px-11 rounded-2xl text-white font-medium"
                onClick={() => handleSave()}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
