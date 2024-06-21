import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPassword } from "../redux/Reducers/reducersLogin";

const Login = () => {
  const handleOAuth = () => {
    window.open(
      `api/auth/google`,
      "_self"
    );
  };

  const theState = useSelector((state) => state);
  console.log("theState", theState);

  return (
    <div>
      <button onClick={handleOAuth}>Login withh Google</button>
    </div>
  );
};

export default Login;
