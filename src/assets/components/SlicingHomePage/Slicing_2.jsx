import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slicing_2() {
  const [n, setN] = useState(2);
  const handleResize = () => {
    // Check if the screen width is less than or equal to lg (1024px)
    if (window.innerWidth <= 650) {
      setN(1);
    } else {
      setN(2);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    infinite: true,
    slidesToShow: n,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const Image_Slider = [
    <div key="1">
      <div className="px-1">
        <img src="/images/iklan1.png" alt="" />
      </div>
    </div>,
    <div key="2">
      <div className="px-1">
        <img src="/images/iklan2.png" alt="" />
      </div>
    </div>,
    <div key="2">
      <div className="px-1">
        <img src="/images/iklan2.png" alt="" />
      </div>
    </div>,
    <div key="2">
      <div className="px-1">
        <img src="/images/iklan2.png" alt="" />
      </div>
    </div>,
  ];

  return (
    <div className="container  mx-auto">
      <div className="w-[70%] mx-auto max-2xl:w-[85%] max-xl:w-[97%] mt-[87px]">
        <div className="mt-20">
          <h1 className=" text-[40px] font-bold mb-4 max-sm:ml-4 max-xs:text-[35px]">
            Promo Menarik <span className="text-[#FE5D02]">Tiket Pesawat</span>
          </h1>
          <div>
            <div className="slider-container px-9 custom-slick ">
              <Slider {...sliderSettings}>{Image_Slider}</Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
