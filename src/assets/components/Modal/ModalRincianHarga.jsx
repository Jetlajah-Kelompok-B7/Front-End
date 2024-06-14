import React from "react";

export default function ModalRincianHarga({ visible }) {
  if (!visible) return null;
  return (
    <div className="mx-[276px] mt-4 border shadow px-[72px] py-2 rounded-[4px]">
      {/* Rincian Harga */}
      <div className="flex- flex-col gap-2">
        <p className=" font-bold">Rincian Harga</p>
        <div className="flex justify-between">
          <p>2 Adults</p>
          <p>IDR 9.550.000</p>
        </div>
        <div className="flex justify-between">
          <p>1 Baby</p>
          <p>IDR 0</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>IDR 300.000</p>
        </div>
      </div>
      {/* total */}
      <div className="flex justify-between font-bold border-t py-4 items-center">
        <p className=" text-base">Total</p>
        <p className=" text-lg text-[#176B87]">IDR 9.850.000</p>
      </div>
    </div>
  );
}
