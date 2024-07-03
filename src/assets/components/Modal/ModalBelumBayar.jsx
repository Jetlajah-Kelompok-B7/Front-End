import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  setDataChekoutBerangkat,
  setHasilPostDataPenumpang,
} from "../../../redux/Reducers/DataBooking";
import { getDetailPesanan } from "../../../redux/Action/TiketAction";

export default function ModalBelumBayar({ visible, onClose, idcheckout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleContainerClick = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };
  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleContainerClick}
      className="absolute inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center"
    >
      <div className="bg-white py-6 px-6 rounded-2xl">
        <p className="text-center font-semibold">Tiket masih belum dibayar</p>
        <div className="flex text-center mt-4 gap-1">
          <button
            className="flex-1 bg-[#176B87] font-semibold text-white py-2 px-6 rounded-xl"
            onClick={() => {
              dispatch(setHasilPostDataPenumpang(idcheckout));
              navigate("/payment");
            }}
          >
            Bayar Sekarang
          </button>
          <button
            className=" bg-red-500 text-white py-2 rounded-xl px-2"
            onClick={() => onClose()}
          >
            <CloseRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
