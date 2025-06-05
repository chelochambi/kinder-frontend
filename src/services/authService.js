// src/services/authService.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Credenciales inválidas");

  const data = await response.json();
  return data; // { token, usuario }
}
