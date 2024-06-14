import React from "react";
import Navbar from "../assets/components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function Payment() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="bg-white h-screen">
      {/* Isi data Pembayaran */}
      <div className="container mx-auto">
        <div className="mx-[276px] flex">
          <div className="flex flex-col gap-4 flex-1 p-8">
            <p className="text-[20px] font-bold">Isi Data Pembayaran</p>
            <Accordion open={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full  -mr-4 px-4 font-medium text-lg text-white">
                  Gopay <Icon id={1} open={open} />
                </div>
              </AccordionHeader>
              <AccordionBody>Logic</AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full  -mr-4 px-4 font-medium text-lg text-white">
                  Gopay <Icon id={2} open={open} />
                </div>
              </AccordionHeader>
              <AccordionBody>Logic</AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full  -mr-4 px-4 font-medium text-lg text-white">
                  Gopay <Icon id={3} open={open} />
                </div>
              </AccordionHeader>
              <AccordionBody>Logic</AccordionBody>
            </Accordion>
            <button
              className=" text-xl font-medium w-full bg-[#176B87] rounded-2xl text-white py-4 mt-3"
              onClick={() => {}}
            >
              Bayar
            </button>
          </div>
          {/* Booking Code */}
          <div className="py-8">
            <p className="w-full font-bold text-lg pb-[10px]">
              Booking Code: <span className="text-[#176B87]">6723y2GHK</span>
            </p>
            <div className=" text-sm">
              {/* Keberangkatan */}
              <div className="flex justify-between">
                <p className="text-base">
                  <span className="font-bold"> 07:00 </span>
                  <br />3 Maret 2023
                </p>
                <p className=" text-xs text-[#64ccc5] font-bold">
                  Keberangkatan
                </p>
              </div>
              <p className="font-medium">
                Soekarno Hatta - Terminal 1A Domestik
              </p>
              {/* Jet Air */}
              <div className="flex items-center gap-2 border-b border-t py-2 mt-4 mb-3">
                <img src="/images/logoPayment.png" alt="" className="h-6 w-6" />
                <div className="flex flex-1 flex-col justify-between gap-5">
                  <p className=" text-sm font-bold">
                    Jet Air - Economy <br />
                    JT - 203
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Informasi:</span> <br />
                    Baggage 20 kg <br />
                    Cabin baggage 7 kg <br />
                    In Flight Entertainment
                  </p>
                </div>
              </div>
              {/* Kedatangan */}
              <div className="flex justify-between border-b pb-4">
                <p className="text-base">
                  <span className="font-bold"> 11:00 </span>
                  <br />3 Maret 2023 <br />
                  <span className="font-medium">
                    Melbourne International Airport
                  </span>
                </p>
                <p className=" text-xs text-[#64ccc5] font-bold">Kedatangan</p>
              </div>
              {/* Promo */}
              <div className="flex justify-between border-b border-t py-2 mb-2 ">
                <button className="text-[#FE5D02] font-bold text-sm">
                  Add Promo
                </button>
              </div>
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
              <div className="flex justify-between font-bold border-b border-t py-4 items-center">
                <p className=" text-base">Total</p>
                <p className=" text-lg text-[#176B87]">IDR 9.850.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
