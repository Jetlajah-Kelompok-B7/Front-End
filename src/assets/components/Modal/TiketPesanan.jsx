import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import ModalPemesananTiket from "../Modal/ModalPemesananTiket";
import ModalPemesananTiketMobile from "../Modal/ModalPemesananTiketMobile";

const TiketPesawat = () => {
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    // Set modal visibility to false after the initial render
    setOpenModal(false);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-[#176B87] flex items-center text-white rounded-xl sm:w-[250px] px-2 py-1.5"
      >
        Cari Penerbangan
      </Button>
      <Modal
        style={{ width: "auto" }}
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl lg:w-[1060px] md:w-[755px]  max-sm:w-full">
          <Modal.Header>Pilih Tiket</Modal.Header>
          {/* Container tiket */}
          <div className="max-xl:hidden">
            <ModalPemesananTiket />
          </div>
          <div className="hidden max-xl:flex z-40 ">
            <ModalPemesananTiketMobile />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TiketPesawat;
