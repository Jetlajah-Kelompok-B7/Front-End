import axios from "axios";
import {
  setNama,
  setNo_telp,
  setPin,
  setTanggal_lahir,
  setAlamat,
  setFile,
} from "../Reducers/reducersLogin";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response_login = await axios.post(
      "/api/login",
      {
        email: email,
        password: password,
        expiresInMins: 1, // optional, defaults to 60
      },
      {
        withCredentials: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response_login?.status === 200) {
      navigate("/");
      alert("Berhasil login");
      return { status: 200 }; // Return status for successful login
    } else {
      alert("password atau username salah");
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500 }; // Return status for internal server error
  }
};

export const register =
  (email, password, nama, no_telp, navigate) => async (dispatch) => {
    try {
      const response_register = await axios.post(
        "/api/register",
        {
          email: email,
          password: password,
          nama: nama,
          no_telp: no_telp,
          expiresInMins: 1, // optional, defaults to 60
        },
        {
          withCredentials: true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response_register?.status === 200) {
        navigate("/add-pin");
        console.log("Data", response_register.data);
        alert("Berhasil Register");
        return { status: 200 }; // Return status for successful login
      } else {
        alert("password atau username salah");
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      return { status: 500 }; // Return status for internal server error
    }
  };

export const profileUser = () => async (dispatch) => {
  try {
    const response_profile = await axios.get(
      "/api/user/profile",
      {
        withCredentials: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const isiAlamat = response_profile?.data?.data?.alamat;
    dispatch(setAlamat(isiAlamat));

    const isiNama = response_profile?.data?.data?.nama;
    dispatch(setNama(isiNama));

    const isiNomor = response_profile?.data?.data?.no_telp;
    dispatch(setNo_telp(isiNomor));

    const isiFoto = response_profile?.data?.data?.photo_profile;
    dispatch(setFile(isiFoto));

    const isiPin = response_profile?.data?.data?.pin;
    dispatch(setPin(isiPin));

    const isiTanggal = response_profile?.data?.data?.tanggal_lahir;
    dispatch(setTanggal_lahir(isiTanggal));

    if (response_profile?.status === 200) {
      console.log("Data", response_profile.data);
      // alert("Berhasil login");
      return { status: 200 }; // Return status for successful login
    } else {
      // alert("password atau username salah");
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500 }; // Return status for internal server error
  }
};

export const createPin = (pin, navigate) => async (dispatch) => {
  try {
    const response_pin = await axios.post(
      "/api/create-pin",
      {
        pin: pin,
      },
      {
        withCredentials: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("pin", pin);

    if (response_pin?.status === 200) {
      navigate("/");
      alert("Berhasil buat pin");
      return { status: 200 }; // Return status for successful login
    } else {
      alert("password atau username salah");
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: 500 }; // Return status for internal server error
  }
};

export const updateProfile =
  (nama, no_telp, tanggal_lahir, alamat, file) => async (dispatch) => {
    try {
      const response_updateProfile = await axios.put(
        "/api/user/profile",
        {
          nama,
          no_telp,
          tanggal_lahir,
          alamat,
          file,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response_updateProfile?.status === 200) {
        alert("Berhasil Update");
        return { status: 200 }; // Return status for successful login
      } else {
        alert("Gagal Update");
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      return { status: 500 }; // Return status for internal server error
    }
  };

// export const updateProfile =
//   (nama, no_telp, tanggal_lahir, alamat, file) => async (dispatch) => {
//     const axios = require("axios");
//     const FormData = require("form-data");
//     const fs = require("fs");
//     let data = new FormData();
//     data.append("file", fs.createReadStream("/path/to/file"));
//     data.append("nama", "");
//     data.append("tanggal_lahir", "");
//     data.append("no_telp", "");
//     data.append("alamat", "");

//     let config = {
//       method: "put",
//       maxBodyLength: Infinity,
//       url: "https://jelajahin-paling-goksss.vercel.app/api/user/profile",
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJpc192ZXJpZmllZCI6ZmFsc2UsInJvbGUiOiJVU0VSIiwiZ29vZ2xlaWQiOm51bGwsImlzX2dvb2dsZXVzZXIiOmZhbHNlLCJpYXQiOjE3MTg5NTQ4NDJ9.zih2ihfRPm0EAyAeUuod6pd_9pJNIwSrd4MlHtg6bJs",
//         ...data.getHeaders(),
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
