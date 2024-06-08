import axios from "axios";

export const api = axios.create({
  baseURL: "https://restapifornecedor-0a59269a82f6.herokuapp.com",
});