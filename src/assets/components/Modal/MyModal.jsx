import React, { useState, useEffect } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { id } from "date-fns/locale"; // Import locale ID
import { useDispatch } from "react-redux";
import { setKeberangaktan } from "../../../redux/Reducers/TiketReducer";

export default function MyModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [nextMonth, setNextMonth] = useState(addMonths(currentMonth, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setNextMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  const daysOfWeek = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"]; // Custom Indonesian days of week

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getDaysInMonth = (month) => {
    return eachDayOfInterval({
      start: startOfWeek(month),
      end: endOfWeek(endOfMonth(month)),
    });
  };

  const handleDateClick = (date) => {
    dispatch(setKeberangaktan(format(date, "d MMMM yyyy", { locale: id })));
    setSelectedDate(date);
  };

  const currentMonthDays = getDaysInMonth(currentMonth);
  const nextMonthDays = getDaysInMonth(nextMonth);

  const handleClose = (e) => {
    if (e.target.id === "container") return onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-40 flex justify-center items-center"
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
                  {format(currentMonth, "MMMM - yyyy", { locale: id })}{" "}
                  {/* Format dengan locale ID */}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-x-4 gap-y-8">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-gray-400">
                    {day}
                  </div>
                ))}
                {currentMonthDays.map((day) => (
                  <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`text-center hover:cursor-pointer ${
                      isSameMonth(day, currentMonth)
                        ? isSameDay(day, selectedDate)
                          ? "text-red-500"
                          : "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {format(day, "d", { locale: id }).replace(/^0+/, "")}{" "}
                    {/* Format dengan locale ID */}
                  </div>
                ))}
              </div>
            </div>
            {/* Next Month */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full">
                <div className="flex-1 flex justify-center">
                  {format(nextMonth, "MMMM - yyyy", { locale: id })}{" "}
                  {/* Format dengan locale ID */}
                </div>
                <button onClick={handleNextMonth} className="text-gray-400">
                  <img
                    src="/images/Arrow.png"
                    alt=""
                    className="w-1.5 transform"
                  />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-x-4 gap-y-8">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-gray-400">
                    {day}
                  </div>
                ))}
                {nextMonthDays.map((day) => (
                  <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`text-center hover:cursor-pointer ${
                      isSameMonth(day, nextMonth)
                        ? isSameDay(day, selectedDate)
                          ? "text-red-500"
                          : "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {format(day, "d", { locale: id }).replace(/^0+/, "")}
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
