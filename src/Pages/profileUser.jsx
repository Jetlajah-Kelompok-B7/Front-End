import React, { useEffect, useState } from "react";
import Navbar from "../assets/components/Navbar.jsx";
import "../App.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  logout,
  profileUser,
  changePassword,
  changePin,
  forgotPin,
} from "../redux/Action/actionLogin.js";
import {
  setNama,
  setNo_telp,
  setTanggal_lahir,
  setAlamat,
  setFile,
  setEmail,
  setLogout,
} from "../redux/Reducers/reducersLogin.js";

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

export default function ProfileUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);
  const [innerOpen, setInnerOpen] = React.useState(0);

  // pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket2.isLoggin;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleInnerOpen = (innerValue) =>
    setInnerOpen(innerOpen === innerValue ? 0 : innerValue);

  const [value, setValue] = useState(`henry`);

  const theState = useSelector((state) => state);
  
  const handleSubmitPin = () => {
    if (value === "111111") {
      toast.success("PIN Terkonfirmasi", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("PIN Salah", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Update Baru
  const { nama, no_telp, tanggal_lahir, alamat, file } = useSelector(
    (state) => state.login
  );
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file instanceof Blob) {
      const fileURL = URL.createObjectURL(file);
      console.log("fileURL", fileURL);
      setPreview(fileURL);
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      dispatch(setFile(selectedFile));
    }
  };

  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);

  //-----------CHANGE PASSWORD FIELD------------------------------
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  //Show Password Lama
  const [isClicked, setIsClicked] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleClick = () => {
    setIsClicked(!isClicked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  //Show Password Baru
  const [isClicked2, setIsClicked2] = useState(false);
  const [passwordType2, setPasswordType2] = useState("password");

  const handleClick2 = () => {
    setIsClicked2(!isClicked2);
    setPasswordType2(passwordType2 === "password" ? "text" : "password");
  };

  //Show Konfirmasi Password
  const [isClicked3, setIsClicked3] = useState(false);
  const [passwordType3, setPasswordType3] = useState("password");

  const handleClick3 = () => {
    setIsClicked3(!isClicked3);
    setPasswordType3(passwordType3 === "password" ? "text" : "password");
  };

  //HANDLE CHANGE PASSWORD
  const handleChangePassword = async (event) => {
    event.preventDefault();
    dispatch(changePassword(passwordLama, passwordBaru, konfirmasiPassword));
  };

  //-----------FORGOT PIN FIELD------------------------------
  const [passwordForgotPin, setPasswordForgotPin] = useState("");
  const [pinBaru, setPinBaru] = useState("");

  //Show Password
  const [isClicked4, setIsClicked4] = useState(false);
  const [passwordType4, setPasswordType4] = useState("password");

  const handleClick4 = () => {
    setIsClicked4(!isClicked4);
    setPasswordType4(passwordType4 === "password" ? "text" : "password");
  };

  //Show PIN BARU
  const [isClicked5, setIsClicked5] = useState(false);
  const [passwordType5, setPasswordType5] = useState("password");

  const handleClick5 = () => {
    setIsClicked5(!isClicked5);
    setPasswordType5(passwordType5 === "password" ? "text" : "password");
  };

  //HANDLE FORGOT PIN
  const handleForgotPin = async (event) => {
    event.preventDefault();
    dispatch(forgotPin(passwordForgotPin, pinBaru));
  };

  //-----------CHANGE PIN FIELD------------------------------
  const [pinLama, setPinLama] = useState("");
  const [pinBaru2, setPinBaru2] = useState("");
  const [pinBaru3, setPinBaru3] = useState("");

  //Show PIN Lama
  const [isClicked6, setIsClicked6] = useState(false);
  const [passwordType6, setPasswordType6] = useState("password");

  const handleClick6 = () => {
    setIsClicked6(!isClicked6);
    setPasswordType6(passwordType6 === "password" ? "text" : "password");
  };

  //Show PIN BARU
  const [isClicked7, setIsClicked7] = useState(false);
  const [passwordType7, setPasswordType7] = useState("password");

  const handleClick7 = () => {
    setIsClicked7(!isClicked7);
    setPasswordType7(passwordType7 === "password" ? "text" : "password");
  };

  //Show BARU PIN
  const [isClicked8, setIsClicked8] = useState(false);
  const [passwordType8, setPasswordType8] = useState("password");

  const handleClick8 = () => {
    setIsClicked8(!isClicked8);
    setPasswordType8(passwordType8 === "password" ? "text" : "password");
  };
  //HANDLE CHANGE PIN
  const handleChangePin = async (event) => {
    event.preventDefault();
    dispatch(changePin(pinLama, pinBaru2, pinBaru3));
  };

  //------------------------Submit--------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateProfile(nama, no_telp, tanggal_lahir, alamat, file));
  };

  //Logout
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(logout());
      if (response.status === 200) {
        dispatch(setLogout()); // Dispatch the reset action
        navigate("/login");
        toast.success("Berhasil Logout", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Gagal Logout", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div>
      <div className="fixed  w-full bg-white z-50 shadow">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mb-10 w-screen px-2 ">
        <div className="flex flex-col w-[70%] max-lg:w-full h-auto py-5 border-[2px] rounded-3xl shadow-lg shadow-[#64CCC5]/20 mt-[150px] ">
          <h1 className="poppins-bold ml-5 text-center text-2xl">Akun</h1>
          {/* Button Beranda */}
          <button onClick={() => navigate("/")}>
            <div className="flex items-center text-white text-left px-[16px] mx-5 mt-[22px] w-auto h-[55px] bg-[#04364A] hover:bg-[#142a32] rounded-xl gap-[8px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Beranda</p>
            </div>
          </button>
          <div className="flex mx-5 gap-5">
            <div className="flex flex-col my-5 w-full">
              <div className="w-full flex flex-col">
                <div className="flex flex-col items-start w-full">
                  {/* Ubah Profile */}
                  <div className="flex items-start w-full">
                    <Accordion
                      className="w-full px-2 flex flex-col justify-center"
                      open={open === 3}
                    >
                      <span className="poppins-regular text-sm w-full">
                        <AccordionHeader
                          className="poppins-medium text-md w-[100%]"
                          onClick={() => handleOpen(3)}
                        >
                          <span className="w-full">
                            <ul className="flex items-center gap-2 bg-[#176B87] bg-opacity-30 active:bg-opacity-60 hover:bg-opacity-40 hover:border-2 overflow-hidden rounded-md px-2 py-4 mt-2">
                              <li>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 20H21"
                                    stroke="#176B87"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.2786 2.87891 18.5544 2.93378 18.8118 3.04038C19.0692 3.14699 19.303 3.30324 19.5 3.50023C19.697 3.69721 19.8532 3.93106 19.9598 4.18843C20.0665 4.4458 20.1213 4.72165 20.1213 5.00023C20.1213 5.2788 20.0665 5.55465 19.9598 5.81202C19.8532 6.06939 19.697 6.30324 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z"
                                    stroke="#176B87"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </li>
                              <li>Ubah Profil</li>
                            </ul>
                          </span>
                        </AccordionHeader>
                      </span>
                      <AccordionBody>
                        <div className="border shadow-lg h-auto py-[10px] px-[16px]">
                          <h1 className="poppins-bold">Ubah Data Profil</h1>
                          <div className="flex flex-col mt-[16px]">
                            <div className="flex flex-col">
                              <div className="flex flex-col">
                                <h1 className="bg-[#176B87] w-full h-[40px] flex items-center px-[16px] rounded-t-xl text-white">
                                  Data Diri
                                </h1>
                                <div className="p-2">
                                  <div className="flex flex-col">
                                    <div>
                                      <h3>Nama Lengkap</h3>
                                      <input
                                        type="text"
                                        value={nama || ""}
                                        onChange={(e) =>
                                          dispatch(setNama(e.target.value))
                                        }
                                        className="block w-[100%] rounded-md border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6 mt-[10px]"
                                        placeholder="Masukkan Nama"
                                      />
                                    </div>
                                    <div className="mt-2">
                                      <h3>Tanggal Lahir</h3>
                                      <input
                                        type="text"
                                        value={tanggal_lahir || ""}
                                        onChange={(e) =>
                                          dispatch(
                                            setTanggal_lahir(e.target.value)
                                          )
                                        }
                                        className="block w-[100%] rounded-md border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6 mt-[10px]"
                                        placeholder="Masukkan Tanggal Lahir"
                                      />
                                    </div>
                                    <div className="mt-2">
                                      <h3>Nomor Telepon</h3>
                                      <input
                                        type="text"
                                        value={no_telp || ""}
                                        onChange={(e) =>
                                          dispatch(setNo_telp(e.target.value))
                                        }
                                        onInput={(e) => {
                                          e.target.value =
                                            e.target.value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );
                                        }}
                                        className="block w-[100%] rounded-md border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6 mt-[10px]"
                                        placeholder="Masukkan Nomor Telpon"
                                      />
                                    </div>
                                    <div className="mt-2">
                                      <h3>Alamat</h3>
                                      <input
                                        type="text"
                                        value={alamat || ""}
                                        onChange={(e) =>
                                          dispatch(setAlamat(e.target.value))
                                        }
                                        className="block w-[100%] rounded-md border-0 py-1.5 pl-4 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6 mt-[10px]"
                                        placeholder="Masukkan Alamat"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full mt-2">
                                      <form
                                        className="flex flex-col w-full mt-2"
                                        onSubmit={handleSubmit}
                                      >
                                        <label
                                          htmlFor="file-upload"
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                          Pilih gambar:
                                        </label>
                                        {typeof theState?.login?.file ===
                                        "string" ? (
                                          <>
                                            <label
                                              htmlFor="file-upload"
                                              className="relative cursor-pointer"
                                            >
                                              {preview ? (
                                                <img
                                                  src={preview}
                                                  alt="Preview"
                                                  className="w-[100px] h-[100px] object-cover rounded-full"
                                                />
                                              ) : (
                                                <img
                                                  src={theState?.login?.file}
                                                  alt="Preview"
                                                  className="w-[100px] h-[100px] object-cover rounded-full"
                                                />
                                              )}
                                            </label>
                                          </>
                                        ) : (
                                          <>
                                            <label
                                              htmlFor="file-upload"
                                              className="relative cursor-pointer"
                                            >
                                              <div className="flex items-center justify-center w-[100px] h-[100px] bg-gray-200 hover:bg-gray-300 rounded-full">
                                                {preview ? (
                                                  <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-[100px] h-[100px] object-cover rounded-full"
                                                  />
                                                ) : (
                                                  <svg
                                                    className="w-8 h-8 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M12 6v6m0 0v6m-6-6h12"
                                                    />
                                                  </svg>
                                                )}
                                              </div>
                                            </label>
                                          </>
                                        )}
                                        <input
                                          type="file"
                                          id="file-upload"
                                          name="file"
                                          accept="image/jpeg, image/png"
                                          className="hidden"
                                          onChange={handleFileChange}
                                        />
                                        <span
                                          id="file-name"
                                          className="text-gray-500 text-xs"
                                        >
                                          Nama File: &nbsp;{" "}
                                          {file ? file.name : "Pilih file"}
                                        </span>
                                        <button
                                          type="submit"
                                          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                          Simpan
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  </div>
                  {/* Pengaturan Akun */}
                  <div className="flex items-start w-full">
                    <Accordion
                      className="w-full px-2 flex flex-col justify-center"
                      open={open === 4}
                    >
                      <span className="poppins-regular text-sm">
                        <AccordionHeader
                          className="poppins-medium text-md w-[100%]"
                          onClick={() => handleOpen(4)}
                        >
                          <span className="w-full">
                            <ul className="flex items-center gap-2 shadow-lg bg-[#176B87] bg-opacity-30 active:bg-opacity-60 hover:bg-opacity-40 overflow-hidden rounded-md px-2 py-4 mt-2 ">
                              <li>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_252_3098)">
                                    <path
                                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                      stroke="#176B87"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
                                      stroke="#176B87"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_252_3098">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </li>
                              <li>Pengaturan Akun</li>
                            </ul>
                          </span>
                        </AccordionHeader>
                      </span>
                      <AccordionBody>
                        <div className="border shadow-lg h-auto py-[10px] px-[16px]">
                          <h1 className="poppins-bold">Pengaturan Akun</h1>
                          <div className="flex flex-col">
                            <div>
                              {/* ----------------CHANGE PASSWORD------------- */}
                              <Accordion
                                className="mt-[16px] px-2 border shadow-md rounded-md"
                                open={innerOpen === 1}
                              >
                                <span className="flex items-center w-[100%] poppins-regular text-sm justify-between">
                                  <AccordionHeader
                                    className="poppins-medium text-md w-[100%] "
                                    onClick={() => handleInnerOpen(1)}
                                  >
                                    Ubah Password
                                  </AccordionHeader>
                                  <div>{<Icon id={1} open={innerOpen} />}</div>
                                </span>
                                <AccordionBody>
                                  <div className="flex flex-col gap-5">
                                    {/* INPUT PASSWORD LAMA */}
                                    <div>
                                      <h3>Masukkan Password Lama</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan Password Lama"
                                            value={passwordLama}
                                            onChange={(e) =>
                                              setPasswordLama(e.target.value)
                                            }
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <span className="flex justify-end">
                                        <button
                                          onClick={() => navigate("/forgot")}
                                          className="text-[12px] text-[#176B87] hover:text-[#1C88AC] hover:underline h-10 flex justify-end items-start"
                                        >
                                          Lupa Password?
                                        </button>
                                      </span>
                                    </div>
                                    {/* INPUT PASSWORD BARU */}
                                    <div>
                                      <h3>Masukkan Password Baru</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType2}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password Baru"
                                            value={passwordBaru}
                                            onChange={(e) =>
                                              setPasswordBaru(e.target.value)
                                            }
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick2}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked2
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked2
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* INPUT KONFIRMASI PASSWORD BARU */}
                                    <div>
                                      <h3>Konfirmasi Password Baru</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType3}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Konfirmasi Password Baru"
                                            value={konfirmasiPassword}
                                            onChange={(e) =>
                                              setKonfirmasiPassword(
                                                e.target.value
                                              )
                                            }
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick3}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked3
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked3
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-center">
                                      <button
                                        onClick={handleChangePassword}
                                        className="py-[8px] px-[23.5px] text-white bg-[#053B50] hover:bg-[#142a32] rounded-lg w-[100px] h-[32px] flex justify-center items-center"
                                      >
                                        Lanjutkan
                                      </button>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </Accordion>
                              {/* -----------------CHANGE PIN----------------- */}
                              <Accordion
                                className="mt-[16px] px-2 border shadow-md rounded-md"
                                open={innerOpen === 2}
                              >
                                <span className="flex items-center w-[100%] poppins-regular text-sm justify-between">
                                  <AccordionHeader
                                    className="poppins-medium text-md w-[100%]"
                                    onClick={() => handleInnerOpen(2)}
                                  >
                                    Change PIN
                                  </AccordionHeader>
                                  <div>{<Icon id={2} open={innerOpen} />}</div>
                                </span>
                                <AccordionBody>
                                  <div className="flex flex-col gap-5">
                                    {/* INPUT PIN LAMA */}
                                    <div>
                                      <h3>Masukkan PIN Lama</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType6}
                                            value={pinLama}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password"
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              // Check if the value contains only numbers
                                              if (/^\d*$/.test(value)) {
                                                setPinLama(value);
                                              }
                                            }}
                                          />

                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick6}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked6
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked6
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* INPUT PIN BARU */}
                                    <div>
                                      <h3>Masukkan PIN Baru</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType7}
                                            value={pinBaru2}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password"
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              // Check if the value contains only numbers
                                              if (/^\d*$/.test(value)) {
                                                setPinBaru2(value);
                                              }
                                            }}
                                          />

                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick7}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked7
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked7
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* KONFIRMASI PIN BARU */}
                                    <div>
                                      <h3>Masukkan PIN Baru</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType8}
                                            value={pinBaru3}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password"
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              // Check if the value contains only numbers
                                              if (/^\d*$/.test(value)) {
                                                setPinBaru3(value);
                                              }
                                            }}
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick8}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked8
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked8
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-center">
                                      <button
                                        onClick={handleChangePin}
                                        className="py-[8px] px-[23.5px] text-white bg-[#053B50] hover:bg-[#142a32] rounded-lg w-[100px] h-[32px] flex justify-center items-center"
                                      >
                                        Lanjutkan
                                      </button>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </Accordion>
                              {/* ------------------FORGOT PIN---------------- */}
                              <Accordion
                                className="mt-[16px] px-2 border shadow-md rounded-md"
                                open={innerOpen === 3}
                              >
                                <span className="flex items-center w-[100%] poppins-regular text-sm justify-between">
                                  <AccordionHeader
                                    className="poppins-medium text-md w-[100%]"
                                    onClick={() => handleInnerOpen(3)}
                                  >
                                    Forgot PIN
                                  </AccordionHeader>
                                  <div>{<Icon id={3} open={innerOpen} />}</div>
                                </span>
                                <AccordionBody>
                                  <div className="flex flex-col gap-5">
                                    {/* INPUT PASSWORD */}
                                    <div>
                                      <h3>Masukkan Password</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType4}
                                            value={passwordForgotPin}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password"
                                            onChange={(e) =>
                                              setPasswordForgotPin(
                                                e.target.value
                                              )
                                            }
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick4}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked4
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked4
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <span className="flex justify-end">
                                        <button
                                          onClick={() => navigate("/forgot")}
                                          className="text-[12px] text-[#176B87] hover:text-[#1C88AC] hover:underline h-10 flex justify-end items-start"
                                        >
                                          Lupa Password?
                                        </button>
                                      </span>
                                    </div>
                                    {/* INPUT PIN BARU */}
                                    <div>
                                      <h3>Masukkan PIN Baru</h3>
                                      <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                          <input
                                            type={passwordType5}
                                            value={pinBaru}
                                            className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
                                            placeholder="Masukkan password"
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              // Check if the value contains only numbers
                                              if (/^\d*$/.test(value)) {
                                                setPinBaru(value);
                                              }
                                            }}
                                          />

                                          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                                            <button>
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={handleClick5}
                                              >
                                                <path
                                                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                  stroke={
                                                    isClicked5
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                  stroke={
                                                    isClicked5
                                                      ? "#176B87"
                                                      : "#8A8A8A"
                                                  }
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-center">
                                      <button
                                        onClick={handleForgotPin}
                                        className="py-[8px] px-[23.5px] text-white bg-[#053B50] hover:bg-[#142a32] rounded-lg w-[100px] h-[32px] flex justify-center items-center"
                                      >
                                        Lanjutkan
                                      </button>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </Accordion>
                            </div>
                          </div>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  </div>
                </div>
                {/* Keluar */}
                <div className="flex justify-center mt-5">
                  <button onClick={handleLogout}>
                    <ul className="flex items-center justify-center gap-2 border shadow-lg bg-red-500 active:bg-red-700 hover:bg-red-600 overflow-hidden rounded-md px-52 py-4 max-lg:px-20 mt-2">
                      <li>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 17L21 12L16 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 12H9"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </li>
                      <li className="text-white">Keluar</li>
                    </ul>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
