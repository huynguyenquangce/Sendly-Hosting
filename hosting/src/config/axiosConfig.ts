import axios from "axios";

const instance = axios.create({
  baseURL: `/api`,
  timeout: 300000,
});

export default instance;
