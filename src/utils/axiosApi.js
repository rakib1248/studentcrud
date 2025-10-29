import axios from "axios";

const API = axios.create({
  baseURL: "https://domorstudent.onrender.com/",
  timeout: "20000",
  withCredentials: false,
});

export default API;
