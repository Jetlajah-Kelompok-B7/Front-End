import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTiket } from "../../../redux/Action/TiketAction";
import ModalPemesananTiket from "../Modal/ModalPemesananTiket";
import ModalPemesananTiketMobile from "../Modal/ModalPemesananTiketMobile";

export default function Slicing_1() {
  const dispatch = useDispatch();
  const [idTanggal, setIdTanggal] = useState(1);
  useEffect(() => {
    dispatch(GetTiket());
  }, [dispatch]);

  //   const DataLokasi = useSelector((state) => {
  //   console.log("------------------------------------------");
  //   console.log("kelas", state.tiket.KelasPenerbangan);
  //   console.log("kota", state.tiket.LokasiKeberangkatan);
  //   console.log("destinasi", state.tiket.lokasiTujuan);
  //   console.log("tanggalberangkat", state.tiket.TanggalKeberangkatan);
  //   console.log("tanggalpulang", state.tiket.TanggalKepulangan);
  //   console.log("totalpenumpang", state.tiket.totalSemuaPenumpang);
  //   return state?.tiket?.lokasi;
  // });

  return (
    <div className=" h-screen  max-xl:h-[900px] bg-cover bg-center bg-[url('/images/bg1.png')] flex flex-col justify-center items-center gap-20 max-xl:gap-10 ">
      <div className="text-white text-center">
        <h1 className="italic font-extrabold text-[70px] max-md:text-[45px]">Jetlajah.In</h1>
        <p className="text-[32px] max-md:text-[20px] max-md:-mt-2 -mt-4">Terbang Menjelajah Angkasa</p>
      </div>
      {/* Container tiket */}
      <div className="max-xl:hidden">
        <ModalPemesananTiket />
      </div>
      <div className="hidden max-xl:flex z-40 ">
        <ModalPemesananTiketMobile />
      </div>
    </div>
  );
}
