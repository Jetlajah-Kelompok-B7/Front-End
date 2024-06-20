import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPassword } from "../redux/Reducers/reducersLogin";

const Login = () => {
  const handleOAuth = () => {
    window.open(
      `https://jelajahin-paling-goksss.vercel.app/api/login/google`,
      "_self"
    );
  };

  // const google = async () => {
  //   const token = getState().login.token;
  //   try {
  //     const response_profile = await axios.get("/api/login/google", {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // assuming token is used for authorization
  //       },
  //     });

  //     const isiData = response_profile?.data;
  //     dispatch(setPassword(isiData));
  //     if (response_profile?.status === 200) {
  //       console.log("Data", response_profile.data);
  //       alert("Berhasil login");
  //       return { status: 200, data: isiData }; // Return status for successful login
  //     } else {
  //       alert("password atau username salah");
  //       return { status: 401 }; // Return status for failed login
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return { status: 500 }; // Return status for internal server error
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await google();
  //     console.log(result); // Result object with status and possibly data
  //     // Handle result based on status if needed
  //   };
  //   fetchData();
  // }, []);

  const theState = useSelector((state) => state);
  console.log("theState", theState);

  return (
    <div>
      <button onClick={handleOAuth}>Login withh Google</button>
    </div>
  );
};

export default Login;
