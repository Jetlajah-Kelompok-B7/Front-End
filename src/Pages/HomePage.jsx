import React from "react";
import Slicing_1 from "../assets/components/SlicingHomePage/Slicing_1";
import Navbar from "../assets/components/Navbar";
import Slicing_2 from "../assets/components/SlicingHomePage/Slicing_2";
import Slicing_3 from "../assets/components/SlicingHomePage/Slicing_3";
import Footer from "../assets/components/Footer";

export default function HomePage() {
  return (
    <div>
      <div className="fixed top-0 w-full bg-white z-50">
        <Navbar />
      </div>
      <div className="pt-[85px]">
        <Slicing_1 />
        <Slicing_2 />
        <Slicing_3 />
        <Footer />
      </div>
    </div>
  );
}
