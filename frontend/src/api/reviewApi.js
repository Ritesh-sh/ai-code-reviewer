import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export async function submitReview(code, language) {
  const response = await api.post("/review", { code, language });
  return response.data;
}

export async function uploadFileForReview(file, language = "auto") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  const response = await api.post("/review/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getReview(id) {
  const response = await api.get(`/review/${id}`);
  return response.data;
}

export async function listReviews(skip = 0, limit = 20) {
  const response = await api.get(`/reviews?skip=${skip}&limit=${limit}`);
  return response.data;
}
