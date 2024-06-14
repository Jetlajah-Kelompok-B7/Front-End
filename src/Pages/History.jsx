import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Navbar from "../assets/components/Navbar";
import ModalFilterKeberangkatan from "../assets/components/Modal/ModalFilterHistory";
import Footer from "../assets/components/Footer";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchHistoryModal from "../assets/components/Modal/SearchHistoryModal";
import { GetTiket } from "../redux/Action/TiketAction";

export default function History() {
  const [modal, setModal] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [filter, setFilter] = useState("");
  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const data = [
    "Unpaid",
    "Cancelled",
    "Issued",
    "Unpaid",
    "Cancelled",
    "Issued",
    "Unpaid",
    "Cancelled",
    "Issued",
  ]; // Example data
  const filteredData = data.filter((item) => {
    // If no filter is applied, display all data
    if (filter === "Semua") return true;

    // If filter matches item, display the item
    return item.toLowerCase().includes(filter.toLowerCase());
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="shadow">
        <Navbar />
      </div>
      {/* Riwayat Pemesanan */}
      <div className="shadow flex flex-col gap-3 pb-3 pt-[47px] px-[260px] ">
        <div className="w-full  text-xl font-bold">Riwayat Pemesanan</div>
        <div className="flex mx-[16px] items-center mt-6 gap-4">
          <button
            className="bg-[#176b87] py-3 rounded-xl text-start px-4  text-base text-white font-semibold flex-1"
            onClick={() => {}}
          >
            <ArrowBackIcon className="font-bold mr-3" />
            Beranda
          </button>
          <div className="flex items-center gap-4 relative">
            <div
              className="flex gap-1 text-[#176b87] rounded-2xl border border-[#176b87] py-1 px-2 hover:cursor-pointer"
              onClick={() => {
                setModal(true);
                setModalSearch(false);
              }}
            >
              <FilterAltOutlinedIcon className=" w-4 h-4 text-[#176b87]" />
              <p>Filter</p>
            </div>
            <ModalFilterKeberangkatan
              onClose={() => setModal(false)}
              visible={modal}
              setFilter={setFilter}
            />
            <div className="">
              <SearchOutlinedIcon
                className="text-[#176b87] hover:cursor-pointer"
                onClick={() => {
                  setModalSearch(true);
                  setModal(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mx-4">
          <SearchHistoryModal
            onClose={() => setModalSearch(false)}
            visible={modalSearch}
            setSearch={setSearch}
          />
        </div>
      </div>
      {/* Data Riwayat */}
      <div className="flex flex-col gap-1 mt-6 mx-[276px] border p-10 rounded-2xl">
        {currentItems.map((e, i) => (
          <div
            key={i}
            className="flex flex-col bg-white py-3 px-4 border rounded-2xl hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            {/* Filter */}
            <div className=" flex justify-between text-white px-1">
              {e === "Unpaid" && (
                <div className=" bg-red-500 inline-block rounded-2xl px-3 py-1">
                  {e}
                </div>
              )}
              {e === "Cancelled" && (
                <div className=" bg-gray-500 inline-block rounded-2xl px-3 py-1">
                  {e}
                </div>
              )}
              {e === "Issued" && (
                <div className=" bg-green-500 inline-block rounded-2xl px-3 py-1">
                  {e}
                </div>
              )}
              <KeyboardArrowRightIcon className="text-gray-500" />
            </div>
            {/* Bawah Filter */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                <img
                  src="/images/IconPesawat.png"
                  alt=""
                  className="h-6 w-6 -ml-[1px]"
                />
                <p className="text-base font-semibold">
                  Jakarta -&gt; Surabaya
                </p>
              </div>
              <p className="text-xs text-[#176b87] font-bold">
                AirAsia - Soekarno Hatta, Terminal 1
              </p>
              <p className="text-xs  font-medium">Jum, 25 Mar 2023 - 08:20</p>
            </div>
          </div>
        ))}
        <Stack spacing={2} className="flex justify-center items-center mt-10">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            shape="rounded"
            variant="outlined"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#176b87 !important", // Selected page background color
                color: "#fff !important", // Selected page text color
                fontWeight: "bold", // Selected page text bold
                border: "2px solid #000 !important",
              },
              "& .MuiPaginationItem-root": {
                fontWeight: "bold",
                color: "#176b87",
                border: "2px solid #176b87",
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Hover color for non-selected pages
                  fontWeight: "bold", // Hover text bold for non-selected pages
                },
              },
            }}
          />
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
