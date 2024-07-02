import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Action/actionLogin";
import { setHalaman } from "../../../redux/Reducers/TiketReducerforSecure";

export default function ModalLogout({ visible, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleClick = (buttonName) => {
    dispatch(setHalaman(buttonName));
  };
  if (!visible) return null;
  return (
    <div className="absolute flex items-center justify-center top-10 right-0">
      <div className="w-[200px] rounded-md px-4 py-2 flex flex-col bg-white border shadow">
        <p
          className="text-base border-b py-1 hover:cursor-pointer"
          onClick={() => {
            HandleClick("profileUser");
            navigate("/profileUser");
          }}
        >
          Profile
        </p>
        <p
          className="text-base text-red-500 py-1 hover:cursor-pointer"
          onClick={() => {
            dispatch(logout())
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {});
          }}
        >
          Log-out
        </p>
      </div>
    </div>
  );
}
