import axios from "axios";
import formData from "form-data";
import {
  setNama,
  setNo_telp,
  setPin,
  setTanggal_lahir,
  setAlamat,
  setFile,
  setMessage,
  setDataNotif,
} from "../Reducers/reducersLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response_login?.status === 200) {
      toast.success("Berhasil login", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
      return { status: 200 }; // Return status for successful login
    } else if (response_login?.status === 401) {
      const pesan =
        response_login?.data?.message ||
        "Login gagal, periksa kembali email dan password Anda.";
      toast.error(pesan, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    if (error.response?.status === 401) {
      const pesan =
        error.response?.data?.message ||
        "Login gagal, periksa kembali email dan password Anda.";
      toast.error(pesan, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    } else {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server, silakan coba lagi nanti.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 500 }; // Return status for internal server error
    }
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
        toast.success("Berhasil Register", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 200 }; // Return status for successful login
      } else {
        toast.error("Password atau username salah", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
      return { status: 200 }; // Return status for successful login
    } else {
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
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("pin", pin);

    if (response_pin?.status === 200) {
      toast.success("PIN Terkonfirmasi", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
      return { status: 200 }; // Return status for successful creation
    } else {
      toast.error("PIN Salah", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed creation
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const updateProfile =
  (nama, no_telp, tanggal_lahir, alamat, file) => async (dispatch) => {
    const data = new formData();
    data.append("nama", nama);
    data.append("no_telp", no_telp);
    data.append("tanggal_lahir", tanggal_lahir);
    data.append("alamat", alamat);
    data.append("file", file);

    console.log(file);
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response_updateProfile?.status === 200) {
        console.log("Response", response_updateProfile);
        toast.success("Berhasil Update", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 200 }; // Return status for successful login
      } else {
        toast.error("Gagal Update", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 500 }; // Return status for internal server error
    }
  };

export const logout = () => async () => {
  try {
    const response_logout = await axios.post("/api/logout", {
      withCredentials: true,
    });

    if (response_logout?.status === 200) {
      toast.success("Berhasil Logout", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 200 }; // Return status for successful login
    } else {
      toast.error("Gagal Logout", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response_forgot = await axios.post(
      "/api/request-reset-password",
      {
        email: email,
      },
      {
        withCredentials: true,
      }
    );

    if (response_forgot?.status === 200) {
      const pesan = response_forgot?.data;
      dispatch(setMessage(pesan));
      console.log("response_forgot", response_forgot);
      toast.success("Permintaan reset password berhasil dikirim", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 200 }; // Return status for successful login
    } else {
      toast.error("Gagal Mengirim", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const pinValidate = (pin) => async (dispatch) => {
  try {
    console.log("pin", pin);
    const response_validatePin = await axios.post(
      "/api/pin-validation",
      {
        pin: pin,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response_validatePin?.status === 200) {
      console.log("response_validatePin", response_validatePin);
      toast.success("PIN Validasi Berhasil", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 200 }; // Return status for successful login
    } else {
      toast.error("Gagal validasi", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const changePassword =
  (passwordLama, passwordBaru, konfirmasiPassword) => async (dispatch) => {
    try {
      const response_changePassword = await axios.put(
        "/api/change-password",
        {
          oldPassword: passwordLama,
          password: passwordBaru,
          confirmPassword: konfirmasiPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response_changePassword?.status === 200) {
        console.log("response_changePassword", response_changePassword);
        toast.success("PIN Validasi Berhasil", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 200 }; // Return status for successful login
      } else {
        toast.error("Gagal validasi", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { status: 401 }; // Return status for failed login
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 500 }; // Return status for internal server error
    }
  };

export const changePin = (pinLama, pinBaru2, pinBaru3) => async (dispatch) => {
  try {
    const response_changePin = await axios.put(
      "/api/change-pin",
      {
        oldPin: pinLama,
        newPin: pinBaru2,
        confirmPin: pinBaru3,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response_changePin?.status === 200) {
      console.log("response_changePin", response_changePin);
      toast.success("Berhasil Mengganti PIN", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 200 }; // Return status for successful login
    } else {
      toast.error("Gagal Mengganti PIN", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const forgotPin = (passwordForgotPin, pinBaru) => async (dispatch) => {
  try {
    const response_forgotPin = await axios.put(
      "/api/forgot-pin",
      {
        pin: pinBaru,
        password: passwordForgotPin,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response_forgotPin?.status === 201) {
      console.log("response_forgotPin", response_forgotPin);
      toast.success("Berhasil Mengganti PIN", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 200 }; // Return status for successful login
    } else {
      toast.error("Gagal Mengganti PIN", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan pada server", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { status: 500 }; // Return status for internal server error
  }
};

export const getNotification = () => async (dispatch) => {
  try {
    const response_getNotif = await axios.get("/api/user/notification", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log("response_getNotif", response_getNotif);
    const notifikasi = response_getNotif?.data?.data;
    dispatch(setDataNotif(notifikasi));

    if (response_getNotif?.status === 200) {
      return { status: 200 }; // Return status for successful login
    } else {
      return { status: 401 }; // Return status for failed login
    }
  } catch (error) {
    return { status: 500 }; // Return status for internal server error
  }
};
