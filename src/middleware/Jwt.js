import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const token = sessionStorage.getItem("auth");
    const decoded = jwt_decode(token);
    const name = decoded.name;
    const set_token = () => {
      sessionStorage.setItem("auth", token);
      sessionStorage.setItem("name", name);
    };
    if (decoded.exp < currentDate.getTime()) {
      const response = await axios.get("http://localhost:5000/token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      set_token(response.data.accessToken);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
