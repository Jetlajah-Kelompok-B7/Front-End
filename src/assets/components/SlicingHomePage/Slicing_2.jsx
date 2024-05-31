import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slicing_2() {
  const sliderSettings = {
    infinite: true,
    slidesToShow: 2,
    speed: 1000,
    slidesToScroll: 1,
    rtl: true,
  };

  return (
    <div className="mx-[236px] mt-[87px]">
      <div>
        <h1 className=" text-[40px] font-bold mb-4">
          Destinasi <span className="text-[#FE5D02]">Favorit</span>
        </h1>
        <div className=" mx-5">
          <div className=" flex gap-4 text-white">
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
          <div className="grid grid-cols-5 gap-5 my-5">
            <div className="w-full h-[200px] bg-blue-300 rounded-md"></div>
            <div className="w-full h-[200px] bg-blue-300 rounded-md"></div>
            <div className="w-full h-[200px] bg-blue-300 rounded-md"></div>
            <div className="w-full h-[200px] bg-blue-300 rounded-md"></div>
            <div className="w-full h-[200px] bg-blue-300 rounded-md"></div>
          </div>
        </div>
        <div className="flex gap-2   justify-center text-white">
          <button className="bg-[#176B87] py-[14px]  px-6 items rounded-2xl">
            More
          </button>
        </div>
      </div>
      <div className="mt-20">
        <h1 className=" text-[40px] font-bold mb-4">
          Promo Menarik <span className="text-[#FE5D02]">Tiket Pesawat</span>
        </h1>
        <div className="slider-container px-9 custom-slick">
          <Slider {...sliderSettings}>
            <div className="w-full h-[200px] bg-blue-300 rounded-2xl"></div>
            <div className="w-full h-[200px] bg-blue-300 rounded-2xl"></div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
