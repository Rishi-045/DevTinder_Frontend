import axios from "axios";
import appStore from "../store";
import { logout } from "../store/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if(err.response?.status == 401){
      appStore.dispatch(logout());
      window.location.href("/login");
    }

    return Promise.reject(err)
  }
)

export default api;
