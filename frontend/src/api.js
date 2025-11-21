import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const checkBrand = async (prompt, brand) => {
  const res = await axios.post(`${API}/api/check-brand`, { prompt, brand });
  return res.data;
};
