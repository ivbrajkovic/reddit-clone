import { selectUserStateUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

export const useUser = () => useSelector(selectUserStateUser);
