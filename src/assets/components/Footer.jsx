import React, { useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../redux/Action/TiketAction";

export default function Footer() {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }
  return (
    <footer className=" bg-[#176B87]">
      <div className="container mx-auto">
        <div className="flex flex-col max-lg:items-center pt-[30px] pb-6 w-[70%] mx-auto max-2xl:w-[85%] max-xl:w-[95%] max-lg:w-[94%] mt-[68px] max-xs:w-[87%]">
          <div className="flex max-lg:flex-col items-start justify-between gap-16 text-white max-lg:w-[100%]">
            <div className="max-lg:hidden">
              <p className=" text-[40px] font-bold">Jetlajah.In</p>
              <p className=" text-xs text-justify w-[300px]">
                Jetlajah.In merupakan website penerbangan, dengan slogan terbang
                menembus angkasa, bersama kami terbang aman dan nyaman.
              </p>
            </div>

            {/* accordion */}
            <div className="max-lg:flex hidden flex-col gap-2 w-full">
              <div className="w-full">
                <p className=" text-[40px] font-bold">Jetlajah.In</p>
                <p className=" text-xs text-justify ml-5">
                  Jetlajah.In merupakan website penerbangan, dengan slogan
                  terbang menembus angkasa, bersama kami terbang aman dan
                  nyaman.
                </p>
              </div>
              <div className="flex flex-col ">
                <Accordion open={open === 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="bg-[#176B87] border-none -py-2"
                  >
                    <div className="flex justify-between items-center w-full -mr-4 font-medium text-lg text-white">
                      Navigasi <Icon id={1} open={open} />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className=" mx-6 -mt-3 -mb-2">
                    <div className="flex flex-col gap-0.5 text-white text-opacity-50">
                      <ul className="list-disc pl-5">
                        <li className="footer-link">
                          <a href="/">Home</a>
                        </li>
                        {Condition === true ? (
                          <>
                            <li onClick={() => navigate("/tiket")}>tiket</li>
                            <li onClick={() => navigate("/notification")}>
                              Notifikasi
                            </li>
                          </>
                        ) : (
                          <li onClick={() => navigate("/login")}>
                            Login/Register
                          </li>
                        )}
                      </ul>
                    </div>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="bg-[#176B87] rounded-[4px] border-none -py-2"
                  >
                    <div className="flex justify-between items-center w-full -mr-4  font-medium text-lg text-white">
                      Follow Kami <Icon id={2} open={open} />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className=" mx-5 -mt-4 -mb-2 ">
                    <div className="flex flex-col gap-0.5 text-white text-opacity-50">
                      <ul className="list-disc pl-5">
                        <li className="footer-link">
                          <a href="/">Instagram</a>
                        </li>
                        <li className="footer-link">
                          <a href="/">Twitter</a>
                        </li>
                        <li className="footer-link">
                          <a href="/">Facebook</a>
                        </li>
                        <li className="footer-link">
                          <a href="/">Email</a>
                        </li>
                        <li className="footer-link">
                          <a href="/">You tube</a>
                        </li>
                      </ul>
                    </div>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="bg-[#176B87] rounded-[4px] border-none -py-2"
                  >
                    <div className="flex justify-between items-center w-full -mr-4  font-medium text-lg text-white">
                      Tentang Kami <Icon id={3} open={open} />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className=" mx-5 -mt-4 -mb-2">
                    <div className="flex flex-col gap-0.5 text-white text-opacity-50">
                      <ul className="list-disc pl-5">
                        <li className="footer-link">
                          <a href="/">Tentang Jetlajah.In</a>
                        </li>
                        <li onClick={() => navigate("/team")}>
                          <a>Team Kami</a>
                        </li>
                      </ul>
                    </div>
                  </AccordionBody>
                </Accordion>
              </div>
            </div>

            {/* tampilan pc */}
            <div className="flex flex-col max-lg:hidden text-xs">
              <p className="text-base font-semibold mb-2">Navigasi</p>
              <div className="flex flex-col gap-0.5">
                <a href="/" className="footer-link">
                  Beranda
                </a>
                {Condition === true ? (
                  <>
                    <a onClick={() => navigate("/History")}>tiket</a>
                    <a onClick={() => navigate("/notification")}>Notifikasi</a>
                  </>
                ) : (
                  <a onClick={() => navigate("/login")}>
                    Login/Register
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col max-lg:hidden  text-xs ">
              <p className="text-base font-semibold mb-2">Follow Kami di</p>
              <div className="flex flex-col gap-0.5">
                <a href="/" className="footer-link">
                  Instagram
                </a>
                <a href="/" className="footer-link">
                  Twitter
                </a>
                <a href="/" className="footer-link">
                  Facebook
                </a>
                <a href="/" className="footer-link">
                  Email
                </a>
                <a href="/" className="footer-link">
                  Youtube
                </a>
              </div>
            </div>
            <div className="flex gap-16 max-lg:hidden">
              <div className="flex flex-col  text-xs">
                <p className="text-base font-semibold mb-2">Tentang Kami</p>
                <div className="flex flex-col gap-0.5">
                  <button href="/" className="footer-link">
                    Tentang Jetlajah.In
                  </button>
                  <a onClick={() => navigate("/team")}>
                    <button>Team Kami</button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="w-full text-center text-white text-xs mt-10 max-lg:mt-7">
            Copyright &copy; 2024 Jetlajah.In All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
