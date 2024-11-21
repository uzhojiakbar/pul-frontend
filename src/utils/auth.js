import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = Cookies.get("token");
  return token && !isTokenExpired(token); // Token bor va amal qiladi
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Millisekundni sekundga o‘tkazish

    console.log("asd", (decoded.exp - currentTime) / 1000);
    console.log(decoded.exp < currentTime);
    return decoded.exp < currentTime; // Amal qilish tugaganmi?
  } catch (error) {
    return true; // Xato bo‘lsa, token amal qilmagan
  }
};

export const loginUser = (token, id, username) => {
  Cookies.set("token", token, { expires: 1 }); // 1 kunlik muddat
  Cookies.set("id", id);
  Cookies.set("username", username);
};

export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("id");
  Cookies.remove("username");
};
