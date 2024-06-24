import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetTiket } from "../../../redux/Action/TiketAction";
import ModalPemesananTiket from "../Modal/ModalPemesananTiket";

export default function Slicing_1() {
  const dispatch = useDispatch();
  const [idTanggal, setIdTanggal] = useState(1);
  useEffect(() => {
    dispatch(GetTiket());
  }, [dispatch]);

  return (
    <div className=" h-screen bg-cover bg-center bg-[url('/images/bg1.png')] flex flex-col justify-center items-center gap-20">
      <div className="text-white text-center">
        <h1 className="italic font-extrabold text-[70px]">Jetlajah.In</h1>
        <p className="text-[32px] -mt-4">Terbang Menjelajah Angkasa</p>
      </div>
      {/* Container tiket */}
      <ModalPemesananTiket/>
    </div>
  );
}
