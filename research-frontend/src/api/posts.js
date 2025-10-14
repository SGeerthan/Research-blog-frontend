import axios from "axios";
const API = "https://research-blog-backend-4b6h.vercel.app/api/posts";

// Get all posts
export const getPosts = () => axios.get(API);

// Create a post
export const createPost = (formData, token) =>
  axios.post(API, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  });

// Delete a post
export const deletePost = (id, token) =>
  axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Update a post
export const updatePost = (id, data, token) =>
  axios.put(`${API}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
