import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { PersonOutline, Person,Notifications,NotificationsNone, NotificationsActiveSharp } from "@mui/icons-material";

export default function Navbar() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const handleClick = (buttonName) => {
    setActiveButton(buttonName); // Mengubah state saat tombol diklik
  };
  const token = "awdawd";
  // const token = null;

  return (
    <nav className="flex items-center justify-between py-[14px] pl-[75px] pr-[49px] text-[24px]">
      <div className="flex items-center">
        <div className="mr-[78px]">
          <img src="/images/Logo.png" alt="" />
        </div>
        <div className="flex text-[#176B87] gap-4">
          <button
            className={activeButton === "Beranda" ? "font-bold" : ""}
            onClick={() => {
              handleClick("Beranda");
            }}
          >
            Beranda
          </button>
          <button
            className={activeButton === "Tiket" ? "font-bold" : ""}
            onClick={() => {
              handleClick("Tiket");
            }}
          >
            Tiket
          </button>
          <button
            className={activeButton === "Promo" ? "font-bold" : ""}
            onClick={() => {
              handleClick("Promo");
            }}
          >
            Promo
          </button>
        </div>
      </div>
      {token !== null ? (
        <div className="flex text-[#176B87] gap-6 items-center">
          <button onClick={() => {
              handleClick("person");
            }}>
            {activeButton === "person" ? <Person /> : <PersonOutline />}
          </button>

          <img
            src="/images/fi_list.png"
            alt=""
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button onClick={() => {
              handleClick("bell");
            }}>
            {activeButton === "bell" ? <Notifications /> : <NotificationsNone />}
          </button>
        </div>
      ) : (
        <button className="flex text-[#176B87] gap-4 items-center">
          <img src="/images/User_Image.png" alt="" />
          <p>Daftar / Masuk</p>
        </button>
      )}
    </nav>
  );
}
