import React, { useCallback, useEffect, useRef, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useReactToPrint } from "react-to-print";
import { format, differenceInMinutes } from "date-fns";

export default function ModalCetakTiket({ visible, onClose, data_tiket, qr }) {
  const componentRef = useRef();
  const [first, setfirst] = useState(false);
  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const handlePrint = useReactToPrint({
    // content: () => componentRef.current,
    content: reactToPrintContent,
    // print: customToPrint,
  });
  const handleClose = (e) => {
    if (e.target.id === "container") return onClose();
  };

  const handleResize = () => {
    // Check if the screen width is less than or equal to lg (1024px)
    if (window.innerWidth <= 720) {
      setfirst(true);
    } else {
      setfirst(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (first === true) {
    handlePrint();
    onClose();
  }

  const Orders = data_tiket?.data?.checkout?.order?.Orders || [];
  const ticket = data_tiket?.data?.checkout?.order?.ticket || {};
  const flight = ticket?.schedule?.flight || {};

  const selisih = ticket?.schedule?.kedatangan
    ? differenceInMinutes(
        new Date(ticket.schedule.kedatangan),
        new Date(ticket.schedule.keberangkatan)
      )
    : 0;

  const jam = Math.floor(selisih / 60);
  const menit = selisih % 60;
  const durasi = `${jam}j ${menit}m`;

  if (!visible) return null;
  return (
    <div
      id="container"
      className="absolute inset-0 flex flex-col   justify-center items-center bg-black bg-opacity-30"
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <style type="text/css" media="print">
        {
          "\
   @page { size: 700px 375px; border: 16px solid #176B87; border-radius: 16px; margin: 0px  }\
"
        }
      </style>
      <div
        id="TableContainer"
        ref={componentRef}
        className=" bg-white relative"
      >
        <div className="flex bg-[#176B87] pt-[30px] pb-[19px] px-[48px] justify-between">
          <div className="flex items-center gap-6">
            <img
              src="/images/logoPayment.png"
              alt=""
              className="h-[45px] w-[45px]"
            />
            <p className="text-3xl font-bold text-white">E - Boarding Pass</p>
          </div>
        </div>
        <div className="bg-white p-4 flex w-[700px]  justify-center items-center">
          {/* kiri */}
          <div className="w-full text-start grid  grid-cols-2 gap-12 -mr-[250px] ml-2">
            <div>
              Nama Penumpang :
              <ul className="list-disc pl-5 font-bold">
                {Orders.map((order, i) => (
                  <li key={i}>
                    <div className="flex">
                      {order.nama}{" "}
                      <p className="font-normal">, seat: {order.no_kursi}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col mr-2.5">
              Tanggal {" : "}
              <span className="font-bold mb-1">
                {format(
                  new Date(ticket?.schedule?.keberangkatan),
                  "d MMMM yyyy"
                )}
              </span>
              Boarding Time{" : "}
              <span className="font-bold">
                {ticket?.schedule?.keberangkatan.split("T")[1].split(":")[0]}:
                {ticket?.schedule?.keberangkatan.split("T")[1].split(":")[1]}
              </span>
            </div>
            <div>
              <p>
                Maskapai :{" "}
                <span className="font-bold">
                  {flight?.Plane?.Airline?.nama_maskapai}
                </span>
              </p>
              <p>
                Gerbang :{" "}
                <span className="font-bold">
                  {flight?.terminal_keberangkatan}
                </span>
              </p>
            </div>
            <div>
              <p>
                Dari :{" "}
                <span className="font-bold">
                  {flight?.bandara_keberangkatan?.lokasi?.split(",")[0]}
                </span>
              </p>
              <p>
                Ke :{" "}
                <span className="font-bold">
                  {flight?.bandara_kedatangan?.lokasi?.split(",")[0]}
                </span>
              </p>
            </div>
          </div>
          {/* Kanan */}
          <div className="w-full items-center justify-end flex">
            <div className="flex flex-col">
              <p className="flex justify-center">Scan Code</p>
              <img src={qr} alt="" className="" />
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white w-[700px] -mt-1 flex items-center justify-center py-3">
        <button
          className="bg-[#176B87] px-10 rounded-xl py-3 text-white font-semi-bold"
          onClick={handlePrint}
        >
          Cetak tiket
        </button>
      </div>
    </div>
  );
}
