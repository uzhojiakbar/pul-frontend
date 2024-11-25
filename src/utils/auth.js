import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Avtorizatsiya holatini tekshirish
export const isAuthenticated = () => {
  const token = Cookies.get("token");
  return token && !isTokenExpired(token); // Token mavjud va amal qilayotgan bo'lsa
};

// Tokenning muddati tugaganini tekshirish
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Millisekundni sekundga aylantirish

    if (!decoded.exp) return true; // Agar tokenda exp (muddati tugagan) mavjud bo'lmasa, xato bo'ladi

    return decoded.exp < currentTime; // Agar exp qiymati hozirgi vaqtdan kichik bo'lsa, token tugagan
  } catch (error) {
    return true; // Xatolik bo'lsa, tokenni amal qilmagan deb qabul qilamiz
  }
};

// Foydalanuvchini tizimga kirgizish
export const loginUser = (token, id, username) => {
  const expirationDate = new Date(Date.now() + 86400000); // 1 kunlik muddat
  Cookies.set("token", token, { expires: expirationDate });
  Cookies.set("id", id);
  Cookies.set("username", username);
};

// Foydalanuvchini tizimdan chiqarish
export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("id");
  Cookies.remove("username");
};
