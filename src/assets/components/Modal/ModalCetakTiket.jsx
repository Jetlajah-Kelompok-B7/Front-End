import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function ModalCetakTiket({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div className=" absolute inset-0 flex justify-center items-center bg-black bg-opacity-30">
      <div className="rounded-2xl bg-white">
        <div className="flex bg-[#176B87] rounded-t-2xl pt-[30px] pb-[19px] px-[48px] justify-between">
          <div className="flex items-center gap-6">
            <img
              src="/images/logoPayment.png"
              alt=""
              className="h-[45px] w-[45px]"
            />
            <p className="text-3xl font-bold text-white">E - Bording Pass</p>
          </div>
          <ClearRoundedIcon
            style={{ fontSize: 44 }}
            className="text-white hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="px-[61px] pt-[73px] pb-10">
          <p className="text-start text-3xl font-semibold">Rozzi Recing</p>
          {/* Bawah Recing */}
          <div class="flex px-[74px] items-end gap-10 mt-[31px]">
            <div class="text-start flex-1 text-sm text-gray-500">
              <span className="font-semibold text-2xl text-black">
                Jakartar <span className="text-[#176B87]">(CGK)</span>
              </span>
              <br /> Soekarno Hatta Internasional Airport Terminal 1A
            </div>
            <div className="flex-1 self-start -mt-6">
              <div class="flex flex-col justify-center items-center">
                <img
                  src="/images/IconPesawatBiru.png"
                  alt=""
                  class="w-10 -ml-[1px] mt-1"
                />
                <p class="text-gray-500 border-b py-3 w-full">
                  <AccessTimeIcon style={{ fontSize: 18 }} /> 1j 0m
                </p>
              </div>
            </div>
            <div class="text-start flex-1 text-sm text-gray-500">
              <span className="font-semibold text-2xl text-black">
                Jakartar <span className="text-[#176B87]">(CGK)</span>
              </span>
              <br /> Soekarno Hatta Internasional Airport Terminal 1A
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mt-4 text-xl font-semibold">Scan Code</div>
          </div>
        </div>
      </div>
    </div>
  );
}
