import axios from "axios";

const refreshToken = async () => {
  try {
    const session = sessionStorage.getItem("auth");
    await axios.get("http://localhost:5000/token", {
      headers: { Authorization: `Bearer ${session}` },
    });
  } catch (error) {
    throw error;
  }
};
export default refreshToken;
