import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../assets/components/Navbar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalRincianHarga from "../assets/components/Modal/ModalRincianHarga";
import ModalCetakTiket from "../assets/components/Modal/ModalCetakTiket";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetTiket } from "../redux/Action/TiketAction";
import { format, differenceInMinutes } from "date-fns";
import axios from "axios";

export default function DetailTiket() {
  const location = useLocation();
  const id = location?.state?.id || undefined;
  // console.log("DetailTiket  id:", id);
  const [modal, setModal] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/history/${id}`, {
          withCredentials: true,
        });
        setDataTiket(response.data);
        console.log("first", response.data);
      } catch (first) {
        console.log("error", first);
      }
    };
    fetchUserData();
  }, [id]);

  const detail_tiket = {
    status: true,
    message: "History Transaction retrieved successfully",
    data: {
      total_price: {
        id: 4,
        checkoutId: 6,
        checkout: {
          metode_pembayaran: "bni",
          status: "Paid",
          total: 3300000,
          is_payment: true,
          order: {
            Orders: [
              {
                id: 25,
                nama: "Selviani",
                tanggal_lahir: "2003-05-10",
                kewarganegaraan: "Indonesia",
                ktp_pasport: "A12345678",
                is_baby: false,
                negara_penerbit: "Indonesia",
                berlaku_sampai: "2030-01-01T00:00:00.000Z",
                no_kursi: 16,
                orderId: 9,
              },
              {
                id: 26,
                nama: "Sofyan",
                tanggal_lahir: "2003-05-05",
                kewarganegaraan: "Indonesia",
                ktp_pasport: "B87654321",
                is_baby: false,
                negara_penerbit: "Indonesia",
                berlaku_sampai: "2025-05-05T00:00:00.000Z",
                no_kursi: 17,
                orderId: 9,
              },
              {
                id: 27,
                nama: "Erwin",
                tanggal_lahir: "2003-10-05",
                kewarganegaraan: "Indonesia",
                ktp_pasport: "C12345678",
                is_baby: false,
                negara_penerbit: "Indonesia",
                berlaku_sampai: "2025-10-05T00:00:00.000Z",
                no_kursi: 18,
                orderId: 9,
              },
            ],
            ticket: {
              id: 1,
              kelas: "Economy",
              harga: 1000000,
              bagasi: false,
              makanan: false,
              hiburan: false,
              wifi: false,
              usb: false,
              jumlah: 32,
              scheduleId: 1,
              schedule: {
                id: 1,
                flightId: 1,
                keberangkatan: "2024-07-02T16:39:30.171Z",
                kedatangan: "2024-07-02T18:04:30.171Z",
                flight: {
                  id: 1,
                  bandara_keberangkatan_id: 1,
                  bandara_kedatangan_id: 2,
                  terminal_keberangkatan: "3C",
                  terminal_kedatangan: "2A",
                  status: "Boarding",
                  planeId: 1,
                  Plane: {
                    id: 1,
                    kode_pesawat: "AK001",
                    model_pesawat: "Airbus A320-200",
                    bagasi_kabin: 7,
                    bagasi: 20,
                    jarak_kursi: 29,
                    jumlah_kursi: 140,
                    status: "Boarding",
                    airlineId: 1,
                    Airline: {
                      id: 1,
                      kode_maskapai: "AK",
                      nama_maskapai: "Air Asia",
                      logo_maskapai:
                        "https://ik.imagekit.io/tvlk/image/imageResource/2022/09/05/1662367239331-9fca504de7049b772dd2386631705024.png?tr=q-75",
                    },
                  },
                  bandara_keberangkatan: {
                    id: 1,
                    kode_bandara: "CGK",
                    nama_bandara: "Soekarno-Hatta International Airport",
                    lokasi: "Tangerang, Indonesia",
                  },
                  bandara_kedatangan: {
                    id: 2,
                    kode_bandara: "DPS",
                    nama_bandara: "Ngurah Rai International Airport",
                    lokasi: "Denpasar, Indonesia",
                  },
                },
              },
            },
          },
        },
      },
      passenger_id: 1,
      passenger_name: "admin",
    },
  };

  const Orders = detail_tiket?.data?.total_price?.checkout?.order?.Orders;
  const ticket = detail_tiket?.data?.total_price?.checkout?.order?.ticket;
  const flight =
    detail_tiket?.data?.total_price?.checkout?.order?.ticket?.schedule?.flight;
  const selisih = differenceInMinutes(
    new Date(ticket?.schedule?.kedatangan),
    new Date(ticket?.schedule?.keberangkatan)
  );
  const jam = Math.floor(selisih / 60);
  const menit = selisih % 60;
  const durasi = `${jam}j ${menit}m`;
  const durasiFormatted = format(new Date(0, 0, 0, 0, selisih), "HH:mm");

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="shadow">
        <div className="container mx-auto">
          <div className="fixed top-0 w-full bg-white z-10">
            <Navbar />
          </div>
        </div>
      </div>
      {/* Detail Penerbangan */}
      <div className=" shadow">
        <div className="container mx-auto">
          <div className="mx-[260px] max-lg:mx-[20px] flex flex-col gap-3 pb-3 pt-[47px]">
            <div className=" text-xl font-bold">Detail Penerbangan</div>
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
      <div className="container mx-auto">
        <div
          className="flex items-start gap-[10px] mx-[276px] px-[69px] py-[31px] rounded-[4px] shadow border mt-[41px] hover:cursor-pointer "
          onClick={() => {
            setModal(true);
            if (modal === true) {
              setModal(false);
            }
          }}
        >
          <img
            src="/images/IconPesawatBiru.png"
            alt=""
            className="h-5 -ml-[1px] mt-1"
          />
          <div className="flex flex-col w-full ">
            <div className="flex justify-between  pb-[13px] ">
              <p className="text-2xl font-semibold">
                {flight?.bandara_keberangkatan?.lokasi?.split(",")[0]}
                {` -> `}
                {flight?.bandara_kedatangan?.lokasi?.split(",")[0]}
              </p>
              <p className="text-lg">
                Order ID :
                <span className="font-bold text-[#176B87]">6723y2GHK</span>
              </p>
            </div>
            <div className="flex justify-between items-center py-[13px] border-t">
              <p className="text-base font-bold">Total</p>
              <p className="text-lg font-bold text-[#176B87] flex items-center transition-transform">
                IDR
                {detail_tiket?.data?.total_price?.checkout?.total.toLocaleString(
                  "id-ID"
                )}
                <KeyboardArrowUpIcon
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    modal ? "rotate-180" : ""
                  }`}
                />
              </p>
            </div>
          </div>
        </div>
        <ModalRincianHarga onClose={() => setModal(false)} visible={modal} />
        {/* Detail Pemesanan */}
        <div className="px-[69px] mt-4 py-3 border shadow mx-[276px] mb-7 rounded-[4px]">
          <div className="flex justify-between">
            <p className="w-full font-bold text-lg">Detail Pesanan</p>
            <p
              className={`text-sm text-white flex rounded-2xl py-1 px-3 items-center ${
                flight?.status === "Boarding" ? "bg-orange-500" : "bg-[#73CA5C]"
              } whitespace-nowrap`}
            >
              {flight?.status}
            </p>
          </div>

          <p className="w-full text-lg pb-[10px]">
            Booking Code:
            <span className="text-[#176B87] font-bold">6723y2GHK</span>
          </p>
          <div className=" text-sm">
            {/* Keberangkatan */}
            <div className="flex gap-[13px] items-center">
              <p className="text-sm">
                <span className="font-bold text-base">
                  {ticket?.schedule?.keberangkatan.split("T")[1].split(":")[0]}:
                  {ticket?.schedule?.keberangkatan.split("T")[1].split(":")[1]}
                </span>
                <br />
                {format(new Date(ticket?.schedule?.keberangkatan), "d MMM")}
              </p>
              <div className="flex border-b justify-between flex-1 items-center">
                <div className="flex gap-[39px]">
                  <p className="font-medium">
                    {flight?.bandara_keberangkatan?.nama_bandara.includes("-")
                      ? flight?.bandara_keberangkatan?.nama_bandara
                          .split(" ")[0]
                          .split("-")
                          .join(" ")
                      : flight?.bandara_keberangkatan?.nama_bandara
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                    <br />
                    Terminal {flight?.terminal_keberangkatan} Domestik
                  </p>
                  <p className="self-start mt-1 ml-[23px]">
                    <AccessTimeIcon style={{ fontSize: 18 }} /> {durasi}
                  </p>
                </div>
                <p className=" text-xs text-[#64ccc5] font-bold">
                  Keberangkatan
                </p>
              </div>
            </div>
            {/* Jet Air */}
            <div className="flex items-center gap-2  py-2 mb-3 mx-[60px]">
              <img
                src={flight?.Plane?.Airline?.logo_maskapai}
                alt=""
                className="size-8"
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
              <p className="text-sm">
                <span className="font-bold text-base">
                  {ticket?.schedule?.kedatangan.split("T")[1].split(":")[0]}:
                  {ticket?.schedule?.kedatangan.split("T")[1].split(":")[1]}
                </span>
                <br />
                {format(new Date(ticket?.schedule?.kedatangan), "d MMM")}
              </p>
              <div className="flex border-b border-t py-[13px] justify-between flex-1 items-center">
                <p className="font-medium">
                  {flight?.bandara_kedatangan?.nama_bandara.includes("-")
                    ? flight?.bandara_kedatangan?.nama_bandara
                        .split(" ")[0]
                        .split("-")
                        .join(" ")
                    : flight?.bandara_kedatangan?.nama_bandara
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                  <br />
                  Terminal {flight?.terminal_kedatangan} Domestik
                </p>
                <p className=" text-xs text-[#64ccc5] font-bold">Kedatangan</p>
              </div>
            </div>
            {/* cetak tiket */}
            <div className="text-center pt-[18px] pb-[13px]">
              <button
                className=" text-white bg-[#176B87] text-sm px-[85px] py-3 rounded-lg"
                onClick={() => {
                  setModalTiket(true);
                }}
              >
                Cetak Tiket
              </button>
              <ModalCetakTiket
                onClose={() => setModalTiket(false)}
                visible={modalTiket}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
