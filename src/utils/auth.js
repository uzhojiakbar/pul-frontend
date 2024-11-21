import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return Cookies.get("token");
};

export const loginUser = (token, id, username) => {
  Cookies.set("token", token, { expires: 1 }); // 1 day expiry
  Cookies.set("id", id);
  Cookies.set("username", username);
};

export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("id");
  Cookies.remove("username");
};
