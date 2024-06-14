import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import MyModal from "./MyModal";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import ModalKeberangkatan from "./ModalKeberangkatan";
import ModalLokasi from "./ModalLokasi";
import PilihKelasPenerbangan from "./KelasPenerbangan";
import { swapLokasi } from "../../../redux/Reducers/TiketReducer";

const TiketPesawat = () => {
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [kelasPenerbangan, setKelasPenerbangan] = useState(false);
  const [modalTiket, setModalTiket] = useState(false);
  const [modalTiketKebernagkatan, setModalTiketKeberangkatan] = useState(false);
  const [pilihanUser, setPilihanUser] = useState("Sekali Jalan");
  const [dropdown, setDropdown] = useState(false);

  const pilihanUsers = ["Sekali Jalan", "Pergi - Pulang"];

  const Data_Kota_Awal = useSelector(
    (state) => state?.tiket?.LokasiKeberangkatan
  );
  const KelasPenerbanganUser = useSelector(
    (state) => state.tiket.KelasPenerbangan
  );
  const Data_Kota_Tujuan = useSelector((state) => state?.tiket?.lokasiTujuan);
  const Tanggal_berangkat = useSelector(
    (state) => state.tiket.TanggalKeberangkatan
  );
  const Total_Penumpang = useSelector(
    (state) => state.tiket.totalSemuaPenumpang
  );

  useEffect(() => {
    // Set modal visibility to false after the initial render
    setOpenModal(false);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-[#176B87] flex items-center text-white rounded-xl w-[150px] px-2"
      >
        Cari Penerbangan
      </Button>
      <Modal
        style={{ width: "auto" }}
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl w-full max-w-4xl">
          <Modal.Header>Pilih Tiket</Modal.Header>
          <div className="bg-white pt-5 rounded-2xl border w-full">
            <div className="px-6">
              <p className="font-bold text-[20px] ml-[10px]">
                Pilih Jadwal Penerbangan spesial di
                <span className="text-[#176B87]"> Jetlajah.In</span>
              </p>
              <div className="flex gap-[15px]">
                {pilihanUsers.map((e, i) => (
                  <div
                    key={i}
                    className="hover:cursor-pointer"
                    onClick={() => setPilihanUser(e)}
                  >
                    {e === pilihanUser ? (
                      <button className="rounded-full border-2 border-[#176B87] bg-[#64CCC5] px-6">
                        {e}
                      </button>
                    ) : (
                      <button className="rounded-full border-2 border-[#176B87] px-6">
                        {e}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center relative">
                      <img
                        src="/images/IconPesawat.png"
                        alt=""
                        className="h-6 w-6 -ml-[1px]"
                      />
                      <p className="mr-12 ml-4">Dari</p>
                      <button
                        className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start py-3"
                        onClick={() => {
                          setModalTiket(true);
                          setModalTiketKeberangkatan(false);
                        }}
                      >
                        {Data_Kota_Awal}
                      </button>
                      <ModalLokasi
                        onClose={() => setModalTiket(false)}
                        visible={modalTiket}
                      />
                    </div>
                    <div className="flex items-center">
                      <img
                        src="/images/iconTanggal.png"
                        alt=""
                        className="h-6 w-6"
                      />
                      <p className="mr-12 ml-4">Dari</p>
                      <div className="flex gap-2">
                        <div className="flex flex-col">
                          <p>Tanggal</p>
                          <button
                            className="w-[145px] border-b font-medium text-[#176B87] text-[18px] text-start py-2 whitespace-nowrap"
                            onClick={() => setModal(true)}
                          >
                            {Tanggal_berangkat}
                          </button>
                          <MyModal
                            onClose={() => setModal(false)}
                            visible={modal}
                          />
                        </div>
                        {pilihanUser === "Pergi - Pulang" ? (
                          <div className="flex flex-col">
                            <p>Tanggal</p>
                            <button
                              className="w-[145px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                              onClick={() => setModal(true)}
                            >
                              {Tanggal_berangkat}
                            </button>
                            <MyModal
                              onClose={() => setModal(false)}
                              visible={modal}
                            />
                          </div>
                        ) : (
                          <div className="w-[140px] bg-white h-1"></div> // placeholder
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="self-start mt-5 mb-2"
                    onClick={() => dispatch(swapLokasi())}
                  >
                    <img src="/images/return.png" alt="" className="h-8 w-8" />
                  </button>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center relative">
                      <div className="flex items-center">
                        <img
                          src="/images/IconPesawat.png"
                          alt=""
                          className="h-6 w-6"
                        />
                        <p className="mr-12 ml-4">Dari</p>
                        <button
                          className="border-b font-medium text-[#176B87] text-[18px] w-[297px] text-start py-3"
                          onClick={() => {
                            setModalTiketKeberangkatan(true);
                            setModalTiket(false);
                          }}
                        >
                          {Data_Kota_Tujuan}
                        </button>
                        <ModalKeberangkatan
                          onClose={() => setModalTiketKeberangkatan(false)}
                          visible={modalTiketKebernagkatan}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img
                        src="/images/iconDuduk.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <p className="mr-12 ml-4">Dari</p>
                      <div className="flex flex-col">
                        <div className="flex gap-4">
                          <div className="relative flex flex-col items-start justify-start">
                            <p>Penumpang</p>
                            <button
                              className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                              onClick={() => setDropdown(true)}
                            >
                              {Total_Penumpang === 0
                                ? "Pilih Kursi"
                                : `${Total_Penumpang} Penumpang`}
                            </button>
                            <Dropdown
                              onClose={() => setDropdown(false)}
                              visible={dropdown}
                            />
                          </div>
                          <div className="flex flex-col relative">
                            <p>Kelas Penerbangan</p>
                            <button
                              className="w-[140px] border-b font-medium text-[#176B87] text-[18px] text-start py-2"
                              onClick={() => setKelasPenerbangan(true)}
                            >
                              {KelasPenerbanganUser === "" ? (
                                <div>Pilih Kelas</div>
                              ) : (
                                <div className="whitespace-nowrap">
                                  {KelasPenerbanganUser}
                                </div>
                              )}
                            </button>
                            <PilihKelasPenerbangan
                              onClose={() => setKelasPenerbangan(false)}
                              visible={kelasPenerbangan}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full text-center font-bold text-[16px] py-4 mt-7 text-white bg-[#176B87] rounded-b-2xl">
              Cari Penerbangan
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TiketPesawat;
