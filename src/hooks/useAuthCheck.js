import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axios";
import { logout, setUser } from "../store/auth/authSlice";
const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/profile");
        dispatch(setUser(res?.data?.data));
      } catch (err) {
        console.error(err.message);
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAuthCheck;
