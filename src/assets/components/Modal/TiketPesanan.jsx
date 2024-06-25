import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import ModalPemesananTiket from "./ModalPemesananTiket";


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
         <div className="bg-white rounded-2xl w-[1150px]">
          <Modal.Header>Pilih Tiket</Modal.Header>
          <div className="bg-white pt-5 rounded-2xl border w-full">
            <ModalPemesananTiket/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TiketPesawat;
