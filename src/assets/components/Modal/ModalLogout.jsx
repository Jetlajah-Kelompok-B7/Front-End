import React from "react";

export default function ModalLogout({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div className="absolute flex items-center justify-center top-10">
    <div className="w-[200px] rounded-xl flex flex-col gap-2 bg-white border-2 border-[#176B87] p-4">
      <p className="text-base">Profile</p>
      <p className="text-base text-red-500">Log-out</p>
    </div>
  </div>
  );
}
