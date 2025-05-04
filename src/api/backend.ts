import axios from "axios";
import { CONFIG } from "../config";

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});