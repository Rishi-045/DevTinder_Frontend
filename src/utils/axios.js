import axios from "axios";
import appStore from "../store";
import { logout } from "../store/auth/authSlice";

const api = axios.create({
  baseURL:
    location.hostname === "localhost" ? "http://localhost:8000/" : "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status == 401) {
      appStore.dispatch(logout());
    }

    return Promise.reject(
      err.response?.data?.message || "Something went wrong",
    );
  },
);

export default api;
