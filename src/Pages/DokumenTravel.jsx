import React from "react";
import Navbar from "../assets/components/Navbar";
import Select from "react-select";
import {
  ChevronRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";

const travelDokumen = () => {
  const dataPenerbangan = {
    Logo: "../public/images/garuda.png",
    namaMaskapai: "Garuda Indonesia",
    jamKeberangkatan: "07:00",
    jamKedatangan: "11:00",
    harga: 495000,
    transit: "Direct",

    tanggalKedatangan: "03/07/2024",
    tanggalKeberangakatan: "03/07/2024",
    bandaraKeberangkatan: "Soekarno Hatta",
    terminalKeberangkatan: "1A Domestik",
    kelasPenerbangan: "Ekonomi",
    kodeFlightKeberangkatan: "JKT",
    kodeFlightKedatangan: "SUB",
    jumlahPenumpang: 1,
    keteranganDatang: "KeDatangan",
    keteranganBerangkat: "Keberangkatan",
    jenisPesawat: "AirBus - 203",
    bagasi: "20",
    bagasiKabin: "7",
    Fasilitas: "Entertaimnet",
    bandaraKedatangan: "Djuanda Surabaya",
    terminalKedatangan: "1A Domestik",
  };

  // fomrtrupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  // fungsi Perhitungan Harga
  const totalHargaPenumpang =
    dataPenerbangan.jumlahPenumpang * dataPenerbangan.harga;
  const pajak = totalHargaPenumpang * 0.1;
  const totalHargaDenganPajak = totalHargaPenumpang + pajak;

  //Fungsi Option Negara
  const options = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Brazil", label: "Brazil" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cabo Verde", label: "Cabo Verde" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    {
      value: "Congo, Democratic Republic of the",
      label: "Congo, Democratic Republic of the",
    },
    { value: "Congo, Republic of the", label: "Congo, Republic of the" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Greece", label: "Greece" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea, North", label: "Korea, North" },
    { value: "Korea, South", label: "Korea, South" },
    { value: "Kosovo", label: "Kosovo" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Laos", label: "Laos" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Moldova", label: "Moldova" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Palestine", label: "Palestine" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Qatar", label: "Qatar" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    {
      value: "Saint Vincent and the Grenadines",
      label: "Saint Vincent and the Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syria", label: "Syria" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-Leste", label: "Timor-Leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="mx-10 px-20">
          {/* Header Atas */}
          <div className="bg-white shadow-md rounded-xl">
            <div className="mx-20  pt-5 ">
              <div className="flex">
                <button className="flex items-center ml-4 text-lg font-bold text-[#176B87] ">
                  Isi Data diri
                  <ChevronRightIcon className="h-6 w-6 text-[#176B87] mr-1" />{" "}
                </button>
                <button className="flex items-center ml-4 text-lg font-semibold text-slate-500 ">
                  Bayar
                  <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />{" "}
                </button>
                <button className="flex items-center ml-4 text-lg font-semibold text-slate-500 ">
                  Selesai
                  <ChevronRightIcon className="h-6 w-6 text-text-slate-500 mr-1" />{" "}
                </button>
              </div>
            </div>
            <div className="  mx-20 p-3">
              <button className="flex items-center pl-5 gap-5 w-[835px] h-[50] text-white font-semibold bg-gradient-to-r from-[#176B87] to-[#64CCC5] rounded-xl">
                <ArrowLongLeftIcon className="h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center" />
                Kembali
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-10 ">
            <div>
              {/* Data Pemesanan */}
              <div className="mt-10 border rounded-xl border-slate-300 p-10 w-[600px] text-xl">
                <p className="text-[#176B87] font-semibold pb-5">
                  Isi Data Pemesanan
                </p>
                <div>
                  <p className="bg-[#176B87] text-white rounded-t-md py-2 px-4">
                    Data Diri Pemesanan
                  </p>
                  <form action="" className="py-3 "></form>
                  <p className="text-[#176B87] font-semibold">Nama Lengkap</p>
                  <input
                    type="text"
                    placeholder="Inputkan Nama"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Nomor Telepon</p>
                  <input
                    type="text"
                    placeholder="Inputkan No Hp"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Email</p>
                  <input
                    type="email"
                    placeholder="Contoh : johndoe@gmail.com"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                </div>
              </div>

              {/* Isi Data Penumpang */}
              <div className="mt-10 border rounded-xl border-slate-300 p-10 w-[600px] text-xl">
                <p className="text-[#176B87] font-semibold pb-5">
                  Isi Data Penumpang
                </p>
                <div>
                  <p className="bg-[#176B87] text-white rounded-t-md py-2 px-4">
                    Data Diri Penumpang 1 - Dewasa
                  </p>
                  <form action="" className="py-3"></form>
                  <p className="text-[#176B87] font-semibold">Title</p>
                  <select className="border border-slate-300 w-[520px] p-2 my-2">
                    <option value="Mr">Tuan</option>
                    <option value="Tuan">Nyonya</option>
                    <option value="Nyonya">Nona</option>
                  </select>
                  <p className="text-[#176B87] font-semibold">Nama Lengkap</p>
                  <input
                    type="text"
                    placeholder="Inputkan Nama Lengkap"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Tanggal Lahir</p>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">
                    Kewarganegaraan
                  </p>
                  <input
                    type="text"
                    placeholder="Indonesia"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">KTP/Paspor</p>
                  <input
                    type="text"
                    placeholder="3374308451435991"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">
                    Negara Penerbit
                  </p>
                  <Select
                    options={options}
                    className="border border-slate-300 w-[520px] p-2 my-2"
                  />
                  <p className="text-[#176B87] font-semibold">Berlaku Sampai</p>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className=" border border-slate-300 w-[520px] p-2 my-2"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="bg-[#176B87] text-white text-xl text-center py-2 px-10 rounded-xl mt-5 w-[300px] mb-10">
                  Simpan
                </button>
              </div>
            </div>

            {/* Detail Penerbangan */}
            <div className="w-[400px] mt-10">
              <div className="p-5 border-2 border-slate-200 rounded-xl">
                <div>
                  <div className="mt-5">
                    <div className="px-5">
                      <p className="font-bold text-[#176B87] pt-5 pb-3 text-xl">
                        Detail Penerbangan
                      </p>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-bold text-xl">
                            {dataPenerbangan.jamKeberangkatan}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Keberangkatan
                          </p>
                        </div>

                        <p>{dataPenerbangan.tanggalKeberangakatan}</p>
                        <p>
                          {dataPenerbangan.bandaraKeberangkatan} -{" "}
                          {dataPenerbangan.terminalKeberangkatan}
                        </p>
                      </div>
                      <div className="my-3 py-2 border-t-2 border-b-2 flex gap-3">
                        <div className="flex items-center">
                          <img
                            src={dataPenerbangan.Logo}
                            alt={dataPenerbangan.namaMaskapai}
                            className="h-6 w-6"
                          />
                        </div>
                        <div>
                          <div className="font-bold pb-3">
                            <p>{dataPenerbangan.namaMaskapai}</p>
                            <p>{dataPenerbangan.jenisPesawat}</p>
                          </div>
                          <p className="font-bold">Informasi :</p>
                          <p>
                            {dataPenerbangan.kelasPenerbangan} -{" "}
                            {dataPenerbangan.jumlahPenumpang} Penumpang
                          </p>
                          <p>Bagasi {dataPenerbangan.bagasi} Kg</p>
                          <p>Bagasi Kabin {dataPenerbangan.bagasiKabin} Kg</p>
                          <p>Fasilitas {dataPenerbangan.Fasilitas}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-bold text-xl">
                            {dataPenerbangan.jamKedatangan}
                          </p>
                          <p className="font-semibold text-[#64CCC5]">
                            Kedatangan
                          </p>
                        </div>

                        <p>{dataPenerbangan.tanggalKedatangan}</p>
                        <p>
                          {dataPenerbangan.bandaraKedatangan} -{" "}
                          {dataPenerbangan.terminalKedatangan}
                        </p>
                      </div>

                      {/* Rincian Bayar */}
                      <div className="my-3 py-2 border-t-2 border-b-2">
                        <p className="font-bold text-xl">Rincian Harga</p>
                        <div className="grid grid-cols-2">
                          <p>1 Adults</p>
                          <p className="text-right">
                            {formatRupiah(totalHargaPenumpang)}
                          </p>
                          <p>Tax 10%</p>
                          <p className="text-right">{formatRupiah(pajak)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold text-xl">Total</p>
                        <p className="font-bold text-xl text-[#176B87]">
                          {formatRupiah(totalHargaDenganPajak)}
                        </p>
                      </div>
                      <div className="py-5 border-t-2">
                        <button className="bg-[#176B87] text-white text-xl font-semibold py-2 px-5 flex justify-center items-center rounded-xl w-[350px]">
                          Lanjut Bayar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default travelDokumen;
