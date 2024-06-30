import { Logout } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Action/actionLogin";

export default function ModalLogout({ visible, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!visible) return null;
  return (
    <div className="absolute flex items-center justify-center top-10 right-0">
      <div className="w-[200px] rounded-md px-4 py-2 flex flex-col bg-white border shadow">
        <p
          className="text-base border-b py-1"
          onClick={() => navigate("/profileUser")}
        >
          Profile
        </p>
        <p
          className="text-base text-red-500 py-1"
          onClick={() => dispatch(logout())}
        >
          Log-out
        </p>
      </div>
    </div>
  );
}
