const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";// usuarioService.js

function getToken() {
  return localStorage.getItem('token'); // o donde guardes el token
}

export async function fetchUsuarios() {
  const token = getToken();

  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener usuarios');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('fetchUsuarios error:', error);
    throw error;
  }
}
