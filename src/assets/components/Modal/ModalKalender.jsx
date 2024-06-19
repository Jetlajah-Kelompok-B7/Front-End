import React, { useState, useEffect } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  isBefore,
  isToday,
  isAfter,
  getDay,
} from "date-fns";
import { id } from "date-fns/locale"; // Import locale ID
import { useDispatch, useSelector } from "react-redux";
import {
  setKeberangaktan,
  setKepulangan,
} from "../../../redux/Reducers/TiketReducer";

export default function MyModal({
  visible,
  onClose,
  idTanggal,
  tanggalPulang,
  tanggalBerangkat,
  pass_tanggal_berangkat,
}) {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [nextMonth, setNextMonth] = useState(addMonths(currentMonth, 1));
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDatePulang, setSelectedDatePulang] = useState("");

  useEffect(() => {
    setNextMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  //pengaman agar ketika render ulang, nilai menjadi yang diinginkan
  useEffect(() => {
    return () => {
      tanggalPulang("");
      setSelectedDate(pass_tanggal_berangkat);
      setSelectedDatePulang("");
      dispatch(setKepulangan(""));
    };
  }, []);

  const daysOfWeek = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"]; // Custom Indonesian days of week

  const handlePrevMonth = () => {
    // Format nama bulan dari currentMonth
    const currentMonthFormatted = format(currentMonth, "MMMM", { locale: id });

    // Ambil nama bulan saat ini dari tanggal sekarang
    const currentMonthNow = format(new Date(), "MMMM", { locale: id });

    // Menentukan kondisi ketika tombol tidak boleh berfungsi
    if (currentMonthFormatted === currentMonthNow) {
      return; // Tidak lakukan apa-apa jika bulan saat ini sama dengan bulan sekarang
    }

    // Lakukan perubahan bulan seperti biasa
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getDaysInMonth = (month) => {
    return eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    });
  };

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const handleDateClick = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (isBefore(date, yesterday)) {
      return null;
    }
    if (idTanggal === 1) {
      dispatch(setKeberangaktan(format(date, "d MMMM yyyy", { locale: id })));
      setSelectedDate(date);
      tanggalBerangkat(format(date, "d MMMM yyyy", { locale: id }));
    } else {
      dispatch(setKepulangan(format(date, "d MMMM yyyy", { locale: id })));
      setSelectedDatePulang(date);
      tanggalPulang(format(date, "d MMMM yyyy", { locale: id }));
    }
  };

  const currentMonthDays = getDaysInMonth(currentMonth);
  const nextMonthDays = getDaysInMonth(nextMonth);

  const handleClose = (e) => {
    if (e.target.id === "container") return onClose();
  };

  if (!visible) return null;

  const getDateClass = (day, month) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Hari ini dikurangi 1 hari

    if (isBefore(day, yesterday)) {
      return "text-gray-400 hover:cursor-no-drop"; // Jika day sebelum hari ini - 1
    }

    if (
      selectedDate &&
      selectedDatePulang &&
      isBefore(day, selectedDatePulang) &&
      isAfter(day, selectedDate)
    ) {
      return "bg-gray-300"; // Jika day di antara selectedDate dan selectedDateBerangkat
    }

    if (isSameMonth(day, month)) {
      if (isSameDay(day, selectedDate)) {
        return "bg-[#176B87] text-white"; // Jika day sama dengan selectedDate atau selectedDateBerangkat
      }
      if (isSameDay(day, selectedDatePulang)) {
        return "bg-[#176B87] text-white"; // Jika day sama dengan selectedDate atau selectedDateBerangkat
      }
      return "text-black"; // Jika day dalam bulan yang sama dengan month tapi bukan selectedDate atau selectedDateBerangkat
    }

    return "text-gray-400"; // Jika day bukan dalam bulan yang sama dengan month
  };
  return (
    <div
      id="container"
      className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <div className="bg-white rounded-md px-10 py-4 border-4 border-[#176B87]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-16">
            {/* Current Month */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full">
                <button onClick={handlePrevMonth} className="text-gray-400">
                  <img
                    src="/images/Arrow.png"
                    alt=""
                    className="w-1.5 transform scale-x-[-1]"
                  />
                </button>
                <div className="flex-1 flex justify-center">
                  {format(currentMonth, "MMMM - yyyy", { locale: id })}
                </div>
              </div>
              <div className="grid grid-cols-7">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center text-gray-400">
                    {day}
                  </div>
                ))}
                {currentMonthDays.map((day, index) => (
                  <div
                    key={day.getTime()} // Using getTime() as a unique key for Date objects
                    className={`my-1 px-3 py-4 text-center hover:cursor-pointer ${
                      index === 0 && colStartClasses[getDay(day)]
                    } ${getDateClass(day, currentMonth)}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div>
                      {format(day, "d", { locale: id }).replace(/^0+/, "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Next Month */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full">
                <div className="flex-1 flex justify-center">
                  {format(nextMonth, "MMMM - yyyy", { locale: id })}
                </div>
                <button onClick={handleNextMonth} className="text-gray-400">
                  <img
                    src="/images/Arrow.png"
                    alt=""
                    className="w-1.5 transform"
                  />
                </button>
              </div>
              <div className="grid grid-cols-7">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center text-gray-400">
                    {day}
                  </div>
                ))}
                {nextMonthDays.map((day, index) => (
                  <div
                    key={day.getTime()}
                    className={`my-1 px-3 py-4 text-center hover:cursor-pointer ${
                      index === 0 && colStartClasses[getDay(day)]
                    } ${getDateClass(day, nextMonth)}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div>
                      {format(day, "d", { locale: id }).replace(/^0+/, "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
