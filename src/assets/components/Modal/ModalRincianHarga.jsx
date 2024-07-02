import React, { useEffect, useState } from "react";

export default function ModalRincianHarga({ visible, data_tiket }) {
  const [dewasa, setDewasa] = useState(0);
  const [bayi, setBayi] = useState(0);

  const Orders = data_tiket?.data?.checkout?.order?.Orders || [];
  console.log("ModalRincianHarga  Orders:", Orders);
  const Harga = data_tiket?.data?.checkout?.order?.ticket?.harga;
  const total = data_tiket?.data?.price?.total;
  const tax = data_tiket?.data?.price?.tax;

  useEffect(() => {
    let dewasaCount = 0;
    let bayiCount = 0;

    Orders.forEach((e) => {
      if (e.is_baby === false) {
        dewasaCount++;
      } else {
        bayiCount++;
      }
    });

    setDewasa(dewasaCount);
    setBayi(bayiCount);
  }, []);

  if (!visible) return null;
  return (
    <div className="mx-[276px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-0 max-xs:mx-2 max-sm:px-3 mt-4 border shadow px-[72px] py-2 rounded-[4px]">
      {/* Rincian Harga */}
      <div className="flex- flex-col gap-2">
        <p className=" font-bold">Rincian Harga</p>
        <div className="flex justify-between">
          {dewasa > 0 && (
            <>
              <p>{dewasa} Dewasa</p>
              <p>IDR {(Harga * dewasa).toLocaleString("id-ID")}</p>
            </>
          )}
        </div>
        <div className="flex justify-between">
          {bayi > 0 && (
            <>
              <p>{bayi} Bayi</p>
              <p>IDR 0</p>
            </>
          )}
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>IDR {tax.toLocaleString("id-ID")}</p>
        </div>
      </div>
      {/* total */}
      <div className="flex justify-between font-bold border-t py-4 items-center">
        <p className=" text-base">Total</p>
        <p className=" text-lg text-[#176B87]">
          IDR {total.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
