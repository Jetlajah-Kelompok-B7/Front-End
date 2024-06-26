import React, { useCallback, useRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useReactToPrint } from "react-to-print";

export default function ModalCetakTiket({ visible, onClose }) {
  const componentRef = useRef();
  const customToPrint = useCallback((printWindow) => {
    console.log(printWindow);
    const printContent =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    const printedScrollContainer =
      printContent.querySelector("#TableContainer");

    printedScrollContainer.style.maxHeight = "none";
    printedScrollContainer.style.overflow = "visible !important";
    printedScrollContainer.style.height = "fit-content !important";

    printWindow.contentWindow.print();

    // print must return a Promise
    return Promise.resolve();
  }, []);

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

  if (!visible) return null;

  return (
    <div
      id="container"
      className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30"
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <style type="text/css" media="print">
        {
          "\
   @page { size: 1077px 500px; border: 16px solid #176B87; border-radius: 16px; margin: 0px  }\
"
        }
      </style>
      <div id="TableContainer" ref={componentRef} className=" bg-white relative">
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
        <div className="px-[61px] pt-[73px] pb-10">
          <p className="text-start text-3xl font-semibold">Rozzi Recing</p>
          {/* Bawah Recing */}
          <div className="flex px-[74px] items-end gap-10 mt-[31px]">
            <div className="text-start flex-1 text-sm text-gray-500">
              <span className="font-semibold text-2xl text-black">
                Jakartar <span className="text-[#176B87]">(CGK)</span>
              </span>
              <br /> Soekarno Hatta Internasional Airport Terminal 1A
            </div>
            <div className="flex-1 self-start -mt-6">
              <div className="flex flex-col justify-center items-center">
                <img
                  src="/images/IconPesawatBiru.png"
                  alt=""
                  className="w-10 -ml-[1px] mt-1"
                />
                <p className="text-gray-500 border-b py-3 w-full flex justify-center items-center">
                  <AccessTimeIcon style={{ fontSize: 18 }} /> 1j 0m
                </p>
              </div>
            </div>
            <div className="text-start flex-1 text-sm text-gray-500">
              <span className="font-semibold text-2xl text-black">
                Jakartar <span className="text-[#176B87]">(CGK)</span>
              </span>
              <br /> Soekarno Hatta Internasional Airport Terminal 1A
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mt-4 text-xl font-semibold">Scan Code</div>
          </div>
        </div>
      </div>
      <div className="absolute">
        <button className=" bg-black inset-0" onClick={handlePrint}>
          Cetak tiket
        </button>
      </div>
    </div>
  );
}
