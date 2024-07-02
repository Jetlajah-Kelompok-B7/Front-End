import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../assets/components/Navbar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalRincianHarga from "../assets/components/Modal/ModalRincianHarga";
import ModalCetakTiket from "../assets/components/Modal/ModalCetakTiket";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInMinutes } from "date-fns";
import axios from "axios";
import { setHalaman } from "../redux/Reducers/TiketReducerforSecure";
import ModalBelumBayar from "../assets/components/Modal/ModalBelumBayar";

export default function DetailTiket() {
  const location = useLocation();
  const id = location?.state?.id || undefined;
  const [modal, setModal] = useState(false);
  const [modalBayar, setModalBayar] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const [qr, setQr] = useState("");
  const [data_tiket, setData_tiket] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHalaman("Tiket"));
  }, []);

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/history/${id}`, {
          withCredentials: true,
        });
        setData_tiket(response.data);
      } catch (error) {}
    };
    if (id) {
      fetchUserData();
    } else {
      null;
    }
  }, [id]);

  const Orders = data_tiket?.data?.checkout?.order?.Orders || [];
  const ticket = data_tiket?.data?.checkout?.order?.ticket || {};
  const flight = ticket?.schedule?.flight || {};
  const checkoutID = data_tiket?.data?.checkoutId;
  const pembayaran = data_tiket?.data?.checkout?.status || {};

  //mengirim ke checkout
  // useEffect(() => {
  //   console.log("FDFAFrqwrq");
  //   dispatch(getDetailPesanan(userCkId));
  //   navigate("/payment");
  // }, []);

  useEffect(() => {
    const fetchPrint = async () => {
      try {
        const response = await axios.get(`/api/checkout/${checkoutID}/print`, {
          withCredentials: true,
        });
        setQr(response.data.data.qr_code_url);
      } catch (error) {
        console.error("Error fetching print data:", error);
      }
    };

    if (checkoutID && pembayaran === "Paid") {
      fetchPrint();
    } else {
      null;
    }
  }, [checkoutID]);

  const selisih = ticket?.schedule?.kedatangan
    ? differenceInMinutes(
        new Date(ticket.schedule.kedatangan),
        new Date(ticket.schedule.keberangkatan)
      )
    : 0;

  const jam = Math.floor(selisih / 60);
  const menit = selisih % 60;
  const durasi = `${jam}j ${menit}m`;

  return (
    <div className="h-screen overflow-y-auto bg-white ">
      <div className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>
      {/* Detail Penerbangan */}
      <div className="shadow">
        <div className="container mx-auto">
          <div className="mx-[260px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-2 flex flex-col gap-3 pb-3 pt-[47px]">
            <div className="text-xl font-bold">Detail Penerbangan</div>
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
      <div className="container mx-auto ">
        {data_tiket?.data ? (
          <>
            <div
              className="flex items-start gap-[10px] mx-[276px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-0 max-xs:mx-2 px-[69px] max-lg:px-6 max-xs:px-4 py-[31px] rounded-[4px] shadow border mt-[26px] hover:cursor-pointer max-sm:flex-col"
              onClick={() => setModal(!modal)}
            >
              <img
                src="/images/IconPesawatBiru.png"
                alt=""
                className="h-5 -ml-[1px] mt-1"
              />
              <div className="flex flex-col w-full ">
                <div className="flex justify-between pb-[13px] max-sm:flex-col">
                  <p className="text-2xl font-semibold truncate max-sm:text-xl">
                    {flight?.bandara_keberangkatan?.lokasi?.split(",")[0]}
                    {` -> `}
                    {flight?.bandara_kedatangan?.lokasi?.split(",")[0]}
                  </p>
                  <p className="text-lg">
                    Order ID :
                    <span className="font-bold text-[#176B87]">
                      {" "}
                      {data_tiket?.data?.booking_code}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between items-center py-[13px] border-t">
                  <p className="text-base font-bold">Total</p>
                  <p className="text-lg font-bold text-[#176B87] flex items-center transition-transform">
                    IDR{" "}
                    {data_tiket?.data?.checkout?.total?.toLocaleString("id-ID")}
                    <KeyboardArrowUpIcon
                      className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                        modal ? "rotate-180" : ""
                      }`}
                    />
                  </p>
                </div>
              </div>
            </div>
            <ModalRincianHarga
              onClose={() => setModal(false)}
              visible={modal}
              data_tiket={data_tiket}
            />
            {/* Detail Pemesanan */}
            <div className=" px-[69px] max-lg:px-6 max-xs:px-3 mt-4 py-3 border shadow mx-[276px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-0 max-xs:mx-2 mb-7 rounded-[4px]">
              <div className="flex justify-between ">
                <p className="w-full font-bold text-lg">Detail Pesanan</p>
                {console.log(
                  "data_tiket?.data?.checkout?.is_payment",
                  data_tiket?.data?.checkout?.is_payment
                )}
                <p
                  className={`text-sm max-sm:text-xs text-white flex rounded-2xl py-1 px-3 items-center ${
                    data_tiket?.data?.checkout?.is_payment === true
                      ? "bg-[#73CA5C]"
                      : "bg-red-500"
                  } whitespace-nowrap`}
                >
                  {data_tiket?.data?.checkout?.is_payment === true
                    ? "Paid"
                    : "Unpaid"}
                </p>
              </div>
              <p className="w-full text-lg pb-[10px]">
                Booking Code:
                <span className="text-[#176B87] font-bold">
                  {" "}
                  {data_tiket?.data?.booking_code}
                </span>
              </p>
              <div className="text-sm">
                {/* Keberangkatan */}
                <div className="flex gap-[13px] items-center">
                  <p className="text-sm max-sm:hidden">
                    <span className="font-bold text-base">
                      {format(
                        new Date(ticket?.schedule?.keberangkatan),
                        "HH:mm"
                      )}
                    </span>
                    <br />
                    {format(new Date(ticket?.schedule?.keberangkatan), "d MMM")}
                  </p>
                  <div className="flex border-b justify-between flex-1 items-center">
                    <div className="flex gap-[39px]">
                      <p className="font-medium flex-col">
                        <span className="font-bold text-base max-sm:flex hidden">
                          {format(
                            new Date(ticket?.schedule?.keberangkatan),
                            "d MMM"
                          )}{" "}
                          {" - "}
                          {format(
                            new Date(ticket?.schedule?.keberangkatan),
                            "HH:mm"
                          )}
                        </span>
                        {flight?.bandara_keberangkatan?.nama_bandara?.includes(
                          "-"
                        )
                          ? flight?.bandara_keberangkatan?.nama_bandara?.split(
                              " "
                            )[0]
                          : flight?.bandara_keberangkatan?.nama_bandara
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ")}
                        <br />
                        <span className="truncate">
                          Terminal {flight?.terminal_keberangkatan} Domestik
                        </span>
                      </p>
                      <p className="self-start mt-1 ml-[23px] max-md:hidden">
                        <AccessTimeIcon style={{ fontSize: 18 }} /> {durasi}
                      </p>
                    </div>
                    <p className="text-xs text-[#64ccc5] font-bold max-sm:self-start">
                      Keberangkatan
                    </p>
                  </div>
                </div>
                {/* Jet Air */}
                <div className="flex  items-center gap-2  py-2 mb-3 mx-[60px] max-sm:mx-0">
                  <img
                    src={flight?.Plane?.Airline?.logo_maskapai}
                    alt=""
                    className="size-8 "
                  />
                  <div className="flex flex-1 flex-col justify-between gap-5">
                    <p className=" text-sm font-bold">
                      {flight?.Plane?.Airline?.nama_maskapai} - {ticket?.kelas}
                      <br />
                      {flight?.Plane?.model_pesawat}
                    </p>
                    <div className="text-sm">
                      <span className="font-bold">Informasi:</span> <br />
                      <span className="text-[#64ccc5] font-medium">
                        <div className="flex gap-2">
                          <ul>
                            {Orders.map((order, i) => (
                              <li key={i}>
                                penumpang {i + 1}: {order.nama}{" "}
                              </li>
                            ))}
                          </ul>
                          <ul>
                            {Orders.map((order, i) => (
                              <li key={i}>
                                <span> Id: {order.id}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <ul className="text-black">
                          <li className="flex gap-1">
                            Kursi:
                            <div className="flex gap-1 ">
                              {Orders.map((order, i) => (
                                <p key={i}>{order.no_kursi}</p>
                              ))}
                            </div>
                          </li>
                          <li>Kabin: {flight?.Plane?.bagasi_kabin} Kg</li>
                          <li>Bagasi: {flight?.Plane?.bagasi} Kg</li>
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Kedatangan */}
                <div className="flex gap-[13px] items-center">
                  <p className="text-sm max-sm:hidden">
                    <span className="font-bold text-base">
                      {format(new Date(ticket?.schedule?.kedatangan), "HH:mm")}
                    </span>
                    <br />
                    {format(new Date(ticket?.schedule?.kedatangan), "d MMM")}
                  </p>
                  <div className="flex border-t py-2 justify-between flex-1 items-center">
                    <div className="flex gap-[39px]">
                      <p className="font-medium flex-col">
                        <span className="font-bold text-base max-sm:flex hidden">
                          {format(
                            new Date(ticket?.schedule?.kedatangan),
                            "d MMM"
                          )}{" "}
                          {" - "}
                          {format(
                            new Date(ticket?.schedule?.kedatangan),
                            "HH:mm"
                          )}
                        </span>
                        {flight?.bandara_kedatangan?.nama_bandara?.includes("-")
                          ? flight?.bandara_kedatangan?.nama_bandara?.split(
                              " "
                            )[0]
                          : flight?.bandara_kedatangan?.nama_bandara
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ")}
                        <br />
                        <span className="truncate">
                          Terminal {flight?.terminal_kedatangan} Domestik
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-[#64ccc5] font-bold max-sm:self-start">
                      Kedatangan
                    </p>
                  </div>
                </div>
              </div>

              {/* Cetak Tiket */}
              <div className="text-center pt-[18px] pb-[13px]">
                <button
                  className=" text-white bg-[#176B87] text-sm px-[85px] py-3 rounded-lg"
                  onClick={() => {
                    if (pembayaran !== "Paid") {
                      setModalBayar(true);
                      return;
                    }
                    setModalTiket(true);
                  }}
                >
                  Cetak Tiket
                </button>
                <ModalCetakTiket
                  onClose={() => setModalTiket(false)}
                  visible={modalTiket}
                  data_tiket={data_tiket}
                  qr={qr}
                  pembayaran={pembayaran}
                />
              </div>
              <ModalBelumBayar
                onClose={() => setModalBayar(false)}
                visible={modalBayar}
                idcheckout={data_tiket?.data?.checkoutId}
              />
            </div>
          </>
        ) : (
          <div>
            <div className="animate-pulse bg-gray-100 px-[69px] h-[20vh] max-lg:px-6 max-xs:px-3 mt-[26px] py-3 border shadow mx-[276px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-0 max-xs:mx-2 mb-7 rounded-[4px] flex justify-center items-center">
              <div className="flex flex-row gap-2">
                <div className="size-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="size-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="size-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
            <div className="animate-pulse bg-gray-100 px-[69px] h-[50vh] max-lg:px-6 max-xs:px-3 mt-4 py-3 border shadow mx-[276px] max-xl:mx-24 max-lg:mx-10 max-sm:mx-0 max-xs:mx-2 mb-7 rounded-[4px] flex justify-center items-center">
              <div className="flex flex-row gap-2">
                <div className="size-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="size-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="size-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
