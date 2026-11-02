import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const http = axios.create({ baseURL: API, withCredentials: true });

export function errorText(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  if (typeof detail?.msg === "string") return detail.msg;
  return String(detail);
}

export const euro = (cents) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format((cents ?? 0) / 100);
