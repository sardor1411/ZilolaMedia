import { Navigate } from "react-router-dom";

export const ProtectRouteAdmin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("users"));

    if (user && user.role === "admin") {
        return children; // Agar admin bo'lsa, `children`ni qaytaradi
    } else {
        console.error("Foydalanuvchi admin emas yoki tizimga kirmagan."); // Aniqroq xabar
        return <Navigate to="/signin" replace />; // `replace` qabul qiladi (Orqaga qaytish uchun stackga kiritmaydi)
    }
};
