import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentTimer = () => {
  const DetailPenumpangCekout = useSelector(
    (state) => state?.booking?.dataCheckoutBerangkat
  );
//   console.log("DetailPEnumpangCK", DetailPenumpangCekout);
  const { tanggal_waktu, berlaku_sampai } = DetailPenumpangCekout;
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(berlaku_sampai);
    const timeLeft = endTime - now;

    let timeLeftFormatted = {};
    if (timeLeft > 0) {
      timeLeftFormatted = {
        hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeLeft / 1000 / 60) % 60),
        seconds: Math.floor((timeLeft / 1000) % 60),
      };
    } else {
      timeLeftFormatted = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeftFormatted;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      // Jika waktu habis, arahkan ke halaman beranda
      if (
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        // navigate("/");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="items-center  text-center pl-5 py-4 gap-5 w-[800px] h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl max-sm:w-full max-sm:text-sm max-sm:flex max-sm:justify-start">
      Selesaikan Pembayaran Dalam
      <span className="ml-2 text-[#FE5D02] font-bold">
        {timeLeft?.hours}h {timeLeft?.minutes}m {timeLeft?.seconds}s
      </span>
    </div>
  );
};

export default PaymentTimer;
