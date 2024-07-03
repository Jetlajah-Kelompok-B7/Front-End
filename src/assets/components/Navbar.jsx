import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PersonOutline,
  Person,
  Notifications,
  NotificationsNone,
} from "@mui/icons-material";
import ModalLogout from "./Modal/ModalLogout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RiMenuFill } from "react-icons/ri";
import { Button, Drawer } from "antd";
import { setHalaman } from "../../redux/Reducers/TiketReducerforSecure";
import { fetchUserData } from "../../redux/Action/TiketAction";
import { logout } from "../../redux/Action/actionLogin";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout1, setLogout1] = useState(false);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(true);

  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 1028) {
      setFirst(true);
    } else {
      setFirst(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    setLogout1(false);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setLogout1(true);
  };

  const active = useSelector((state) => {
    return state.tiket2.Halaman_Aktif;
  });
  const HandleClick = (buttonName) => {
    dispatch(setHalaman(buttonName));
  };

  const showDrawer = () => {
    if (first) {
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="flex z-50 items-center justify-between py-[14px] pl-[75px] max-xl:pl-4 pr-[49px] max-lg:pr-2 max-sm:pr-10 max-xs:pr-2 text-[24px]">
      <div className="flex items-center">
        <div className="mr-[78px] max-lg:ml-1 ">
          <img src="/images/Logo.png" alt="" />
        </div>
        <div className="flex max-lg:hidden text-[#176B87] gap-4">
          <button
            className={active === "Beranda" ? "font-bold" : ""}
            onClick={() => {
              setLogout1(false);
              HandleClick("Beranda");
              navigate("/");
            }}
          >
            Beranda
          </button>
          {Condition === true ? (
            <button
              className={active === "Tiket" ? "font-bold" : ""}
              onClick={() => {
                setLogout1(false);
                HandleClick("Tiket");
                navigate("/history");
              }}
            >
              Tiket
            </button>
          ) : null}
        </div>
      </div>
      <div className="max-lg:hidden">
        {Condition === true ? (
          <div className="flex text-[#176B87] gap-6 items-center">
            <button
              onClick={() => {
                HandleClick("bell");
                setLogout1(false);
                navigate("/notification");
              }}
            >
              {active === "bell" ? <Notifications /> : <NotificationsNone />}
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  logout1 === true ? setLogout1(false) : setLogout1(true);
                }}
              >
                {active === "profileUser" ? <Person /> : <PersonOutline />}
              </button>
              <ModalLogout
                onClose={() => setLogout1(false)}
                visible={logout1}
              />
            </div>
          </div>
        ) : (
          <button
            className="flex text-[#176B87] gap-4 items-center"
            onClick={() => {
              navigate("/login");
            }}
          >
            <img src="/images/User_Image.png" alt="" />
            <p>Daftar / Masuk</p>
          </button>
        )}
      </div>
      <div className="hidden max-lg:flex">
        <RiMenuFill onClick={showDrawer} />
      </div>
      {first && (
        <Drawer title="Menu" onClose={onClose} open={open}>
          <div className="flex flex-col items-start gap-1 text-lg ">
            <button
              className={`z-50 ${active === "Beranda" ? " font-bold" : ""}`}
              onClick={() => {
                onClose();
                setLogout1(false);
                HandleClick("Beranda");
                navigate("/");
              }}
            >
              Beranda
            </button>
            {Condition === true ? (
              <button
                className={`z-50 ${active === "tiket" ? "font-bold" : ""}`}
                onClick={() => {
                  onClose();
                  setLogout1(false);
                  HandleClick("tiket");
                  navigate("/history");
                }}
              >
                Tiket
              </button>
            ) : null}
            {Condition === true ? (
              <button
                className={`z-50 ${active === "Profile" ? "font-bold" : ""}`}
                onClick={() => {
                  onClose();
                  setLogout1(false);
                  HandleClick("Profile");
                  navigate("/profileUser");
                }}
              >
                Profile
              </button>
            ) : null}
            {Condition === true ? (
              <div className="flex flex-col items-start">
                <button
                  className={`z-50 ${active === "bell" ? "font-bold" : ""}`}
                  onClick={() => {
                    onClose();
                    HandleClick("bell");
                    navigate("/notification");
                    setLogout1(false);
                  }}
                >
                  Notifications
                </button>
                <button
                  className="text-red-500 z-50"
                  onClick={() => {
                    if (window.confirm("Yakin ingin log-out nih ?")) {
                      dispatch(logout())
                        .then(() => {
                          navigate("/login");
                        })
                        .catch((error) => {
                          console.error("Error during logout:", error);
                        });
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="z-50"
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
              >
                Daftar / Masuk
              </button>
            )}
            <div className="inset-0 z-20 absolute bottom-0 flex justify-center">
              <img
                src="/images/logoabu.png"
                alt=""
                className="absolute bottom-28 h-40"
              />
            </div>
          </div>
        </Drawer>
      )}
    </nav>
  );
}
