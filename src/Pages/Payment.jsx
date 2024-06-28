import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMetodePembayaran } from "../redux/Reducers/DataBooking";
import Navbar from "../assets/components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getDetailPesanan } from "../redux/Action/TiketAction";
import {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
} from "@heroicons/react/24/outline";

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
  const [selectedMethod, setSelectedMethod] = useState("");
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    cardCVV: "",
    expiredDate: "",
  });

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  const handleSubmit = () => {
    // if (selectedMethod === "creditCard") {
    //   console.log("Credit Card Info:", creditCardInfo);
    // } else {
    //   console.log("Selected Payment Method:", selectedMethod);
    // }
    console.log("Selected Payment Method:", selectedMethod);
    dispatch(setMetodePembayaran(selectedMethod));
  };

  //Mengambil data booking tiket hasil post
  const DataPayment = useSelector(
    (state) => state.booking.inputanDataPenumpang.data.data
  );
  console.log("Data penum", DataPayment);

  //Mengambil data ID User
  const userCkId = useSelector(
    (state) => state.booking.inputanDataPenumpang.data.data.checkoutId
  );
  console.log("Data penumckout", userCkId);

  useEffect(() => {
    if (userCkId) {
      dispatch(getDetailPesanan(userCkId));
    }
  }, [dispatch, userCkId]);

  const DetailPenumpangCekout = useSelector(
    (state) => state.booking.dataCheckoutBerangkat
  );
  // console.log("detailckout", DetailPenumpangCekout);

  return (
    <div className="bg-white ">
      <Navbar />
      <div className="container mx-auto">
        {/* Header PIlihan */}
        <div className="bg-white shadow-md w-full px-36">
          <div className="mx-20 pt-5 ">
            <div className="flex">
              <button
                className="flex items-center ml-4 text-lg font-semibold text-slate-500 "
                onClick={() => navigate("/travelDokumen")}
              >
                Isi Data diri
                <ChevronRightIcon className="h-6 w-6 text-[#176B87] mr-1" />
              </button>
              <button className="flex items-center ml-4 text-lg font-bold text-[#176B87] ">
                Bayar
                <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />
              </button>
              <button className="flex items-center ml-4 text-lg font-semibold text-slate-500 ">
                Selesai
                <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />
              </button>
            </div>
          </div>
          <div className="mr-20 pl-52 py-5">
            <button className="items-center pl-5 py-4 gap-5 w-[800px] h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl">
              Selesaikan Pembayaran Dalam
            </button>
          </div>
        </div>

        {/* FORM PENBAYARAN*/}
        <div className="mx-[276px] flex">
          <div className="flex flex-col gap-4 flex-1 p-8">
            <p className="text-[20px] font-bold">Isi Data Pembayaran</p>
            {/* GOPAY*/}
            <Accordion open={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full -mr-4 px-4 font-medium text-lg text-white">
                  GoPay <Icon id={1} open={open} />
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div>
                  <label
                    className={`flex items-center border-2 rounded-md p-4 cursor-pointer mt-4 ${
                      selectedMethod === "gopay"
                        ? "bg-[#64CCC5] font-semibold border-[#176B87]"
                        : "border-[#176B87] hover:border-[#64CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="gopay"
                      onChange={() => setSelectedMethod("gopay")}
                    />
                    <span className="ml-2">GoPay</span>
                  </label>
                </div>
              </AccordionBody>
            </Accordion>
            {/* Virtual Account*/}
            <Accordion open={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full -mr-4 px-4 font-medium text-lg text-white">
                  Virtual Account <Icon id={2} open={open} />
                </div>
              </AccordionHeader>

              <AccordionBody>
                <div>
                  <label
                    className={`flex items-center border-2 rounded-md p-4 cursor-pointer ${
                      selectedMethod === "bca"
                        ? "bg-[#64CCC5] font-semibold border-[#176B87]"
                        : "border-[#176B87] hover:border-[#64CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bca"
                      onChange={() => setSelectedMethod("bca")}
                    />
                    <span className="ml-2">BCA Virtual Account</span>
                  </label>
                  <label
                    className={`flex items-center border-2 rounded-md p-4 cursor-pointer mt-4 ${
                      selectedMethod === "bni"
                        ? "bg-[#64CCC5] font-semibold border-[#176B87]"
                        : "border-[#176B87] hover:border-[#64CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bni"
                      onChange={() => setSelectedMethod("bni")}
                    />
                    <span className="ml-2">BNI Virtual Account</span>
                  </label>
                  <label
                    className={`flex items-center border-2 rounded-md p-4 cursor-pointer mt-4 ${
                      selectedMethod === "bri"
                        ? "bg-[#64CCC5] font-semibold border-[#176B87]"
                        : "border-[#176B87] hover:border-[#64CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bri"
                      onChange={() => setSelectedMethod("bri")}
                    />
                    <span className="ml-2">BRI Virtual Account</span>
                  </label>
                </div>
              </AccordionBody>
            </Accordion>
            {/* Credit Card*/}
            <Accordion open={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full -mr-4 px-4 font-medium text-lg text-white">
                  Credit Card <Icon id={3} open={open} />
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col gap-4">
                  <p className="font-semibold teks-md">Card Number</p>

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={creditCardInfo.cardNumber}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <p className="font-semibold teks-md">Card Holder Name</p>
                  <input
                    type="text"
                    name="cardHolderName"
                    placeholder="Card Holder Name"
                    value={creditCardInfo.cardHolderName}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <p className="font-semibold teks-md">CVV</p>
                  <input
                    type="text"
                    name="cardCVV"
                    placeholder="CVV"
                    value={creditCardInfo.cardCVV}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <p className="font-semibold teks-md">Expired Date</p>
                  <input
                    type="date"
                    name="expiredDate"
                    placeholder="Expired Date (MM/YY)"
                    value={creditCardInfo.expiredDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="radio"
                    id="confirmCreditCard"
                    name="confirmCreditCard"
                    value="confirm"
                    onChange={() => setSelectedMethod("creditCard")}
                    checked={selectedMethod === "creditCard"}
                    className="mr-2"
                  />
                  <label htmlFor="confirmCreditCard" className="font-semibold">
                    Konfirmasi penggunaan Credit Card
                  </label>
                </div>
              </AccordionBody>
            </Accordion>
            <button
              className="text-xl font-medium w-full bg-[#176B87] rounded-2xl text-white py-4 mt-3"
              onClick={handleSubmit}
            >
              Bayar
            </button>
          </div>

          {/* Booking Code */}
          <div className="py-8">
            <p className="w-full font-bold text-lg pb-[10px]">
              Booking Code :{" "}
              <span className="text-[#176B87]">
                {DetailPenumpangCekout.booking_code}
              </span>
            </p>
            <div className=" text-sm border-2 rounded-lg w-[300px]">
              {/* Keberangkatan */}
              <p className=" text-lg text-white font-bold border bg-[#176B87] py-1 text-center rounded-t-lg">
                Pergi
              </p>
              <div className="px-2">
                <p className="text-base">
                  <span className="font-semibold flex items-center gap-2">
                    {" "}
                    <ArrowUpRightIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                    {DetailPenumpangCekout.bandara_keberangkatan.lokasi}
                  </span>
                </p>
                <p className="font-bold text-[#64ccc5]"> To</p>

                <p className="text-base">
                  <span className="font-semibold flex items-center gap-2">
                    {DetailPenumpangCekout.bandara_kedatangan.lokasi}
                    <ArrowDownLeftIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                  </span>
                </p>
              </div>

              {/* Jet Air */}
              <div className="flex items-start gap-2 border-b border-t py-2 mt-4 mb-3">
                <img
                  src={DetailPenumpangCekout.maskapai.logo_maskapai}
                  alt=""
                  className="h-6 w-6"
                />
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <p className=" text-sm font-bold ">
                    {DetailPenumpangCekout.maskapai.nama_maskapai}
                  </p>

                  <p className="text-sm">
                    <span className="font-bold">Informasi :</span> <br />
                    Baggage : {DetailPenumpangCekout.informasi.bagasi} kg <br />
                    Cabin baggage :{" "}
                    {DetailPenumpangCekout.informasi.bagasi_kabin} kg <br />
                  </p>
                </div>
              </div>
              {/* DEtail Penerbangan */}
              <div className="flex justify-between border-b pb-4">
                <p className="text-base">Detail Penerbangan</p>
                
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
