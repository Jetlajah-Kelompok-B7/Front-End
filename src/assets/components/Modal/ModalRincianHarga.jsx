import React, { useEffect, useState } from "react";

export default function ModalRincianHarga({ visible, data_tiket }) {
  const [dewasa, setDewasa] = useState(0);
  const [bayi, setBayi] = useState(0);

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
  const Orders = data_tiket?.data?.checkout?.order?.Orders || [];
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
