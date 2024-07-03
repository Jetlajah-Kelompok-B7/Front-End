import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slicing_1 from "../assets/components/SlicingHomePage/Slicing_1";
import Navbar from "../assets/components/Navbar";
import Slicing_2 from "../assets/components/SlicingHomePage/Slicing_2";
import Slicing_3 from "../assets/components/SlicingHomePage/Slicing_3";
import Footer from "../assets/components/Footer";
import { profileUser } from "../redux/Action/actionLogin"; // Ganti dengan path sesuai struktur proyek Anda
import { reset } from "../redux/Reducers/TiketReducer";
import { fetchUserData } from "../redux/Action/TiketAction";
import { setHalaman } from "../redux/Reducers/TiketReducerforSecure";
import BackToTop from "../assets/components/Modal/TombolBalikAtas";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
    dispatch(setHalaman("Beranda"));
    dispatch(fetchUserData());
  }, []);
  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);
  return (
    <div>
      <div className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="pt-[85px] max-xl:pt-5">
        <Slicing_1 />
        <Slicing_2 />
        <Slicing_3 />
        <Footer />
      </div>
      <BackToTop/>
    </div>
  );
}
