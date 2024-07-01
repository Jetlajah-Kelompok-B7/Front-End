import React from "react";

export default function Slicing_3() {
  return (
    <div className="container mx-auto">
      <div className=" mt-40 w-[70%] mx-auto max-2xl:w-[85%] max-xl:w-[97%]">
        <div>
          <h1 className=" text-[40px] max-xs:text-[35px] font-bold mb-4 max-sm:ml-4">
            About<span className="text-[#FE5D02]">Jetlajah.In</span>
          </h1>
          <p className="ml-6 mt-[27px] mb-2 text-[20px] text-justify  ">
            JetLajahin adalah platform booking tiket pesawat yang memudahkan perjalanan udara
            Anda dengan menyediakan layanan pemesanan tiket pesawat yang cepat,
            aman, dan terpercaya. Dengan antarmuka yang intuitif dan
            user-friendly, JetLajahin memungkinkan pengguna untuk mencari,
            membandingkan, dan memesan tiket pesawat ke berbagai destinasi di
            seluruh Indonesia.
          </p>
          <div className="flex gap-2   justify-center text-white">
            <button className="bg-[#176B87] py-[14px]  px-6 items rounded-2xl">
              More
            </button>
          </div>
        </div>
        <div className="">
          <h1 className=" text-[40px] max-xs:text-[35px] font-bold mb-4 mt-16 max-sm:ml-4 ">
            Partner <span className="text-[#FE5D02]">Maskapai</span>
          </h1>
          <div className="flex gap-16 ml-6  max-sm:flex-col">
            <div className="flex-1 flex flex-col justify-between text-[20px] ">
              <p className=" text-[#8A8A8A] mb-4">
                Partner Maskapai Penerbangan di Dalam & Luar Negeri
              </p>
              <p>
                Kami bekerja sama dengan berbagai maskapai penerbangan di
                seluruh dunia untuk menerbangkan Anda ke mana pun Anda inginkan!
              </p>
            </div>

            <div className="flex-1">
              <img src="/images/partner.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
