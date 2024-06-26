import Cookies from "js-cookie";

export const getTokenFromCookie = () => {
  return Cookies.get("token"); // 'token' sesuai dengan nama cookie yang menyimpan token
};
