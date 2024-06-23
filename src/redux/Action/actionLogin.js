import axios from "axios";
import { setToken } from "../Reducers/reducersLogin";

// Action to fetch now playing movies
export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response_login = await axios.post(
        "/api/login",
        {
          email: email,
          password: password,
          expiresInMins: 0.1, // optional, defaults to 60
        },
        {
            withCredentials: true
        },
        {
          headers: { "Content-Type": "application/json" },
        }
    );

    if (response_login?.status === 200) {
      navigate("/");
      console.log("Data", response_login.data);
      const isiToken = response_login.data?.data?.token;
      dispatch(setToken(isiToken));
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
          expiresInMins: 0.1, // optional, defaults to 60
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response_register?.status === 200) {
        //   navigate("/");
        console.log("Data", response_register.data);
        const isiToken = response_register.data?.data?.token;
        dispatch(setToken(isiToken));
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

export const profileUser = () => async (dispatch, getState) => {
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

    const isiData = response_profile?.data;
    dispatch(setToken(isiData));
    if (response_profile?.status === 200) {
      console.log("Data", response_profile.data);
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
