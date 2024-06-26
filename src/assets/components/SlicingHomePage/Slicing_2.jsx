import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slicing_2() {
  const [n, setN] = useState(5);
  const sliderSettings = {
    infinite: true,
    slidesToShow: 2,
    speed: 1000,
    slidesToScroll: 1,
    rtl: true,
  };

  const sliderSettings2 = {
    infinite: true,
    slidesToShow: 3,
    speed: 1000,
    slidesToScroll: 1,
    rtl: true,
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
    <div key="3">
      <div className="px-1">
        <img src="/images/iklan2.png" alt="" />
      </div>
    </div>,
  ];

  return (
    <div className="container  mx-auto">
      <div className="w-[70%] mx-auto max-2xl:w-[85%] max-xl:w-[100%] mt-[87px]">
        <div>
          <h1 className=" text-[40px] font-bold mb-4 max-sm:ml-4 max-xs:text-[35px]">
            Destinasi <span className="text-[#FE5D02]">Favorit</span>
          </h1>
          <div className=" mx-5">
            <div className=" flex gap-4 max-lg:hidden text-white">
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
              <button className="flex gap-2 bg-[#176B87] rounded-2xl py-[14px]  px-6 items-center">
                <img
                  src="/images/search.png"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
                <p>Semua</p>
              </button>
            </div>
            {/* Gambar */}
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-xl:grid-cols-4 max-md:grid-cols-2 gap-5 my-5">
              <div className="size-[200px] w-full bg-blue-300 rounded-md max-xl:hidden"></div>
              <div className="size-[200px] w-full bg-blue-300 rounded-md max-lg:hidden"></div>
              <div className="size-[200px] w-full bg-blue-300 rounded-md max-md:hidden"></div>
              <div className="size-[200px] w-full bg-blue-300 rounded-md"></div>
              <div className="size-[200px] w-full bg-blue-300 rounded-md"></div>
            </div>
          </div>
          <div className="flex gap-2   justify-center text-white">
            <button className="bg-[#176B87] py-[14px]  px-6 items rounded-2xl">
              More
            </button>
          </div>
        </div>
        <div className="mt-20">
          <h1 className=" text-[40px] font-bold mb-4 max-sm:ml-4 max-xs:text-[35px]">
            Promo Menarik <span className="text-[#FE5D02]">Tiket Pesawat</span>
          </h1>
          <div>
            {/* <div className="slider-container px-9 custom-slick hidden max-xl:flex">
              <Slider {...sliderSettings2}>{Image_Slider}</Slider>
            </div> */}
            <div className="slider-container px-9 custom-slick max-xl:hidden">
              <Slider {...sliderSettings}>{Image_Slider}</Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
