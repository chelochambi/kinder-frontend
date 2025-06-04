export async function fetchDashboardData(sucursalId) {
  // Aquí iría una llamada real a la API
  // Por ahora simulamos datos:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        usuariosActivos: 24,
        alumnosActivos: 150,
        pagosPendientes: 8,
      });
    }, 1000);
  });
}
