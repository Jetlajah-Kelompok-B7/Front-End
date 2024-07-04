import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsValidated,
  setMetodePembayaran,
} from "../redux/Reducers/DataBooking";
import Navbar from "../assets/components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  useSelect,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  getDetailPesanan,
  getPaymentCekout,
} from "../redux/Action/TiketAction";
import {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
} from "@heroicons/react/24/outline";
import PaymentTimer from "./timerPage";
import BackToTop from "../assets/components/Modal/TombolBalikAtas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { differenceInYears } from "date-fns";

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
  // const theState = useSelector((state) => state);
  // // console.log("theState", theState);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  //ID CEKOUT PERGI
  const checkoutId = useSelector(
    (state) => state?.booking?.dataCheckoutBerangkat?.id
  );

  const isValidated = useSelector((state) => state?.booking?.isValidated);

  const handleSubmit = () => {
    if (!selectedMethod) {
      toast.warning("Harap Isi Jenis Pembayaran !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    navigate(
      `/confirm-pin?checkoutId=${checkoutId}&metode_pembayaran=${selectedMethod}`
    );
  };

  const DataPayment = useSelector(
    (state) => state?.booking?.inputanDataPenumpang?.data
  );
  const DetailPenumpangCekout = useSelector(
    (state) => state?.booking?.dataCheckoutBerangkat
  );
  const userCkIdPergi = useSelector(
    (state) => state?.booking?.inputanDataPenumpang
  );

  useEffect(() => {
    dispatch(getDetailPesanan(userCkIdPergi));
  }, []);

  let penumpangArray = [];
  let totalHarga = 0;
  let taxTiket = 0;
  let hargaTiket = 0;

  const [dewasa, setDewasa] = useState(0);
  const [anak, setAnak] = useState(0);
  const [bayi, setBayi] = useState(0);
  useEffect(() => {
    let dewasaCount = 0;
    let anakCount = 0;
    let bayiCount = 0;
    penumpangArray.forEach((e) => {
      if (e?.is_baby === false) {
        const umur = differenceInYears(new Date(), new Date(e?.tanggal_lahir));
        if (umur < 12) {
          anakCount++;
          return;
        } else {
          dewasaCount++;
          return;
        }
      } else {
        // console.log("e?.is_baby", e?.is_baby);
        bayiCount++;
      }
    });

    setDewasa(dewasaCount);
    setAnak(anakCount);
    setBayi(bayiCount);
  }, []);
  // console.log("Payment  bayiCount:", bayi);

  if (Object.values(DetailPenumpangCekout).length > 0) {
    penumpangArray = Object.values(DetailPenumpangCekout?.orders);
    totalHarga = DetailPenumpangCekout?.total;
    taxTiket = DetailPenumpangCekout?.tax;
    hargaTiket = (totalHarga - taxTiket) / (penumpangArray?.length - bayi);
  }
  const typePenerbanngan = useSelector(
    (state) => state?.tiket?.typePenerbanngan
  );
  return (
    <div className="bg-white ">
      <div className="fixed  w-full bg-white z-50 shadow">
        <Navbar />
      </div>
      {/* Header PIlihan */}
      <div className="bg-white shadow-md  w-full max-sm:px-0 lg:px-36 max-sm:w-full  ">
        <div className="mx-4 sm:mx-20 pt-5">
          <div className="flex mt-28">
            <button
              className="flex items-center lg:ml-4 text-lg font-semibold text-slate-500 "
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
        <div className="max-w-full mx-4 sm:mx-auto sm:max-w-none sm:mr-0 sm:pl-2  md:mr-20 md:pl-24 py-5 text-center">
          <PaymentTimer />
        </div>
      </div>
      <div className="container mx-auto ">
        {/* FORM PENBAYARAN*/}
        <div className="lg:mx-[220px] sm:mx-[80px] max-sm:w-full flex max-lg:flex-col-reverse ">
          <div className="flex flex-col gap-4 flex-1 max-sm:p-5 p-8 md:px-2">
            <p className="text-[20px] font-bold">Pembayaran</p>
            {/* GOPAY*/}
            <Accordion open={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="bg-[#176B87] rounded-[4px]"
              >
                <div className="flex justify-between items-center w-full -mr-4 px-4 font-medium text-lg text-white">
                  Gopay <Icon id={1} open={open} />
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
          {Object.values(DetailPenumpangCekout).length > 0 && (
            <div className="pt-20 max-sm:pt-10 max-sm:m-5">
              <div className=" text-sm border-2 rounded-lg lg:w-[400px] w-[600px] max-sm:w-full ">
                {/* Keberangkatan */}
                <p className=" text-xl text-white font-bold border bg-[#176B87] py-4  text-center rounded-t-lg ">
                  Pergi
                </p>
                <p className="font-bold text-lg border-b-2 px-5 py-2">
                  Booking Code :{" "}
                  <span className="text-[#176B87] ">
                    {DetailPenumpangCekout?.booking_code}
                  </span>
                </p>
                <div className="px-5">
                  <p className="text-base">
                    <span className="font-semibold flex items-center gap-2">
                      {" "}
                      <ArrowUpRightIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                      {DetailPenumpangCekout?.bandara_keberangkatan?.lokasi}
                    </span>
                  </p>
                  <p className="font-bold text-[#64ccc5]"> To</p>

                  <p className="text-base">
                    <span className="font-semibold flex items-center gap-2">
                      {DetailPenumpangCekout?.bandara_kedatangan?.lokasi}
                      <ArrowDownLeftIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                    </span>
                  </p>
                </div>

                {/* PESAWAT PERGI */}
                <div className="flex items-start gap-2 border-b border-t py-2 px-5 mt-4 mb-3">
                  <img
                    src={DetailPenumpangCekout?.maskapai?.logo_maskapai}
                    alt=""
                    className="h-6 w-6"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <p className=" text-sm font-bold ">
                      {DetailPenumpangCekout?.maskapai?.nama_maskapai}
                    </p>

                    <p className="text-sm">
                      <span className="font-bold">Informasi :</span> <br />
                      Baggage : {
                        DetailPenumpangCekout?.informasi?.bagasi
                      } kg <br />
                      Cabin baggage :{" "}
                      {DetailPenumpangCekout?.informasi?.bagasi_kabin} kg <br />
                    </p>
                  </div>
                </div>
                {/* DEtail */}
                <div className="flex justify-between border-b pb-4">
                  <Accordion open={open === 4}>
                    <AccordionHeader
                      onClick={() => handleOpen(4)}
                      className="bg-[#64CCC5] rounded-[4px]"
                    >
                      <div className="flex justify-between items-center w-full -mr-4 px-4 font-medium text-lg text-white">
                        Detail Penerbangan <Icon id={4} open={open} />
                      </div>
                    </AccordionHeader>

                    <AccordionBody>
                      <div className="px-5 text-black">
                        <div className="font-normal">
                          <p className="text-sm">
                            <span className="text-lg font-bold">
                              Informasi Keberangkatan
                            </span>{" "}
                            <br />
                            Bandara Keberangkatan :{" "}
                            {
                              DetailPenumpangCekout?.bandara_keberangkatan
                                ?.nama_bandara
                            }
                          </p>
                          <p className="text-sm">
                            Terminal_kedatanga :{" "}
                            {
                              DetailPenumpangCekout?.bandara_kedatangan
                                ?.terminal_kedatangan
                            }
                          </p>
                          <p className="text-sm">
                            Kode Bandara :{" "}
                            {
                              DetailPenumpangCekout?.bandara_kedatangan
                                ?.kode_bandara
                            }
                          </p>
                        </div>
                        <div className="pt-5">
                          <p className="text-sm font-normal">
                            <span className="text-lg font-bold">
                              Informasi Kedatangan
                            </span>{" "}
                            <br />
                            Bandara Kedatangan :{" "}
                            {
                              DetailPenumpangCekout?.bandara_kedatangan
                                ?.nama_bandara
                            }
                          </p>
                          <p className="text-sm font-normal">
                            Terminal_kedatanga :{" "}
                            {
                              DetailPenumpangCekout?.bandara_keberangkatan
                                ?.terminal_kedatangan
                            }
                          </p>
                          <p className="text-sm font-normal ">
                            Kode Bandara :{" "}
                            {
                              DetailPenumpangCekout?.bandara_keberangkatan
                                ?.kode_bandara
                            }
                          </p>
                        </div>
                      </div>
                    </AccordionBody>
                  </Accordion>
                </div>

                {/* Pulang */}
                {typePenerbanngan == "Pergi - Pulang" && (
                  <>
                    <p className=" text-xl text-white font-bold border bg-[#176B87] py-2  text-center rounded-t-lg">
                      Pulang
                    </p>
                    <p className="font-bold text-lg border-b-2 px-2 py-2">
                      Booking Code :{" "}
                      <span className="text-[#176B87] ">
                        {DetailPenumpangCekout?.booking_code}
                      </span>
                    </p>
                    <div className="px-2">
                      <p className="text-base">
                        <span className="font-semibold flex items-center gap-2">
                          {" "}
                          <ArrowUpRightIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                          {DetailPenumpangCekout?.bandara_kedatangan?.lokasi}
                        </span>
                      </p>
                      <p className="font-bold text-[#64ccc5]"> To</p>

                      <p className="text-base">
                        <span className="font-semibold flex items-center gap-2">
                          {DetailPenumpangCekout?.bandara_keberangkatan?.lokasi}
                          <ArrowDownLeftIcon className="text-sm h-5 w-5 text-[#176B87] mr-1 pl-1 flex items-center" />{" "}
                        </span>
                      </p>
                    </div>
                    {/* DETAIL PULANG */}
                    <div className="flex items-start gap-2 border-b border-t py-2 mt-4 mb-3">
                      <img
                        src={DetailPenumpangCekout?.maskapai?.logo_maskapai}
                        alt=""
                        className="h-6 w-6"
                      />
                      <div className="flex flex-1 flex-col justify-between gap-2">
                        <p className=" text-sm font-bold ">
                          {DetailPenumpangCekout?.maskapai?.nama_maskapai}
                        </p>

                        <p className="text-sm">
                          <span className="font-bold">Informasi :</span> <br />
                          Baggage : {
                            DetailPenumpangCekout?.informasi?.bagasi
                          }{" "}
                          kg <br />
                          Cabin baggage :{" "}
                          {
                            DetailPenumpangCekout?.informasi?.bagasi_kabin
                          } kg <br />
                        </p>
                      </div>
                    </div>
                    {/* DEtail */}
                    <div className="flex justify-between border-b pb-4">
                      <Accordion open={open === 5}>
                        <AccordionHeader
                          onClick={() => handleOpen(5)}
                          className="bg-[#176B87] rounded-[4px]"
                        >
                          <div className="flex justify-between items-center w-full mr-4 px-4 font-medium text-lg text-white">
                            Detail Penerbangan <Icon id={5} open={open} />
                          </div>
                        </AccordionHeader>

                        <AccordionBody>
                          <div className="px-5">
                            <div>
                              <p className="text-sm">
                                <span className="text-lg font-bold">
                                  Informasi Keberangkatan
                                </span>{" "}
                                <br />
                                Bandara Keberangkatan :{" "}
                                {DetailPenumpangCekout?.orders?.no_kursi}
                              </p>
                              <p className="text-sm">
                                Terminal_kedatanga :{" "}
                                {
                                  DetailPenumpangCekout?.bandara_kedatangan
                                    ?.terminal_kedatangan
                                }
                              </p>
                              <p className="text-sm">
                                Kode Bandara :{" "}
                                {
                                  DetailPenumpangCekout?.bandara_kedatangan
                                    ?.kode_bandara
                                }
                              </p>
                            </div>
                            <div className="pt-5">
                              <p className="text-sm">
                                <span className="text-lg font-bold">
                                  Informasi Kedatangan
                                </span>{" "}
                                <br />
                                Bandara Keberangkatan :{" "}
                                {DetailPenumpangCekout?.orders?.no_kursi}
                              </p>
                              <p className="text-sm">
                                Terminal_kedatanga :{" "}
                                {
                                  DetailPenumpangCekout?.bandara_keberangkatan
                                    ?.terminal_kedatangan
                                }
                              </p>
                              <p className="text-sm">
                                Kode Bandara :{" "}
                                {
                                  DetailPenumpangCekout?.bandara_keberangkatan
                                    ?.kode_bandara
                                }
                              </p>
                            </div>
                          </div>
                        </AccordionBody>
                      </Accordion>
                    </div>
                  </>
                )}

                {/* Rincian Harga */}
                <div className="my-3 py-2 border-t-2 border-b-2">
                  <p className="font-bold text-xl">Rincian Harga</p>
                  {dewasa > 0 && (
                    <div className="flex justify-between">
                      <p>{dewasa} Dewasa</p>
                      <p>Rp. {(hargaTiket * dewasa).toLocaleString("id-ID")}</p>
                    </div>
                  )}
                  {anak > 0 && (
                    <div className="flex justify-between">
                      <p>{anak} Anak</p>
                      <p>Rp. {(hargaTiket * anak).toLocaleString("id-ID")}</p>
                    </div>
                  )}
                  {bayi > 0 && (
                    <div className="flex justify-between">
                      <p>{bayi} Bayi</p>
                      <p>Rp. 0</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p>Tax + Donasi Palestina 10%</p>
                    Rp. {taxTiket?.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold text-xl">Total</p>
                  <p className="font-bold text-xl text-[#176B87]">
                    Rp. {totalHarga?.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
