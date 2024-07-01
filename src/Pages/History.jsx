import React, { useEffect, useState } from "react";
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
import { format, parseISO } from "date-fns";
import id from "date-fns/locale/id";
import axios from "axios";
import { useDispatch, useDispatch, useSelector } from "react-redux";
import { setHistroy } from "../redux/Reducers/TiketReducerforSecure";
import { tikethistory } from "../redux/Action/TiketAction";

export default function History() {
  const [modal, setModal] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dataTiket, setDataTiket] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //pengaman agar jika user belum login
  const Condition = useSelector((state) => {
    return state.tiket.UserCondition;
  });
  useEffect(() => {
    if (Condition !== true) {
      navigate("/login");
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(tikethistory());
  }, [Condition]);

  // Filter data berdasarkan status dan pencarian
  const filteredData = Data?.filter((ticket) => {
    const matchesFilter =
      filter === "" ||
      ticket.status.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      search === "" ||
      ticket.bandara_keberangkatan.lokasi
        .split(" ")[0]
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      ticket.bandara_kedatangan.lokasi
        .split(" ")[0]
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="shadow">
        <Navbar />
      </div>
      {/* Riwayat Pemesanan */}
      <div className="shadow flex flex-col gap-3 pb-3 pt-[47px] px-[260px] max-xl:px-5">
        <div className="w-full  text-xl font-bold">Riwayat Pemesanan</div>
        <div className="flex mx-[16px] items-cente mt-6 gap-4 max-xs:flex-col max-xs:mx-0">
          <button
            className="bg-[#176b87] py-3 rounded-xl text-start px-4  text-base text-white font-semibold flex-1"
            onClick={() => window.history.go(-1)}
          >
            <ArrowBackIcon className="font-bold mr-3" />
            Beranda
          </button>
          {/* Filer Button */}
          <div className="flex items-center gap-4 relative max-xs:self-end">
            <div
              className="flex gap-1 text-[#176b87] rounded-2xl border border-[#176b87] py-1 px-2 hover:cursor-pointer"
              onClick={() => {
                if (modal !== "" && modal === "filter") {
                  return setModal("");
                }
                setModal("filter");
              }}
            >
              <FilterAltOutlinedIcon className=" w-4 h-4 text-[#176b87]" />
              <p>Filter</p>
            </div>
            <ModalFilterKeberangkatan
              onClose={() => setModal("")}
              visible={modal === "filter"}
              setFilter={setFilter}
            />
            <div className="">
              <SearchOutlinedIcon
                className="text-[#176b87] hover:cursor-pointer"
                onClick={() => {
                  if (modal !== "" && modal === "search") {
                    return setModal("");
                  }
                  setModal("search");
                }}
              />
            </div>
          </div>
        </div>
        <div className="mx-4 max-xs:mx-0">
          <SearchHistoryModal
            onClose={() => setModal("")}
            visible={modal === "search"}
            setSearch={setSearch}
          />
        </div>
      </div>

      {/* Data Riwayat */}
      <div className="flex flex-col gap-1 mt-6 mx-[276px] max-xl:mx-5 border p-10 rounded-2xl">
        {currentItems?.length > 0 ? (
          currentItems.map((e, i) => (
            <div
              key={i}
              className="flex flex-col bg-white py-3 px-4 border rounded-2xl hover:cursor-pointer"
              onClick={() => {
                navigate("/DetailTiket", { state: { id: e.id } });
              }}
            >
              <div className=" flex justify-between text-white px-1">
                <div
                  className={`rounded-2xl px-3 py-1 ${
                    e?.status === "Issued"
                      ? "bg-green-500"
                      : e?.status === "Unpaid"
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                >
                  {e?.status}
                </div>
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
                  <p className="text-base font-semibold truncate">
                    {`${e?.bandara_keberangkatan?.lokasi.split(",")[0]} -> ${
                      e?.bandara_kedatangan?.lokasi.split(",")[0]
                    }`}
                  </p>
                </div>
                <p className="text-xs text-[#176b87] font-bold">
                  {e?.nama_maskapai} -{" "}
                  {e?.bandara_keberangkatan?.nama_bandara.includes("-")
                    ? e?.bandara_keberangkatan?.nama_bandara
                        .split(" ")[0]
                        .split("-")
                        .join(" ")
                    : e?.bandara_keberangkatan?.nama_bandara
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                  ,<br className="hidden max-xs:flex" /> Terminal {e?.terminal}
                </p>
                <p className="text-xs  font-medium">
                  {format(parseISO(e?.timestamp), "EEE, dd MMM yyyy - HH:mm ", {
                    locale: id,
                  })} WIB
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-base text-wrap">
              Nampaknya anda masih belum melakukan transaksi apapun
            </p>
          </div>
        )}
        <div
          className={`${
            filteredData?.length > itemsPerPage ? "flex" : "hidden"
          } flex justify-center`}
        >
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
      </div>
      <Footer />
    </div>
  );
}
