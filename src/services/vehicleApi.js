const BASE = 'https://veiculos.cyberposto.com.br';
export const imgUrl = (u) => (!u ? null : u.startsWith('http') ? u : BASE + u);
export const isNew = (v) => v && v.condition === 'novo';

const extractList = (d) =>
  Array.isArray(d) ? d : d.vehicles || d.items || d.data || d.results || Object.values(d).find(Array.isArray) || [];

export async function listVehicles(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== '' && v != null && q.set(k, v));
  const res = await fetch(`${BASE}/api/v1/vehicles?${q}`);
  if (!res.ok) throw new Error(`A API respondeu com erro ${res.status}.`);
  const d = await res.json();
  return { items: extractList(d), page: d.page, totalPages: d.total_pages, total: d.total };
}

export async function getVehicle(id) {
  const res = await fetch(`${BASE}/api/v1/vehicles/${encodeURIComponent(id)}`);
  if (res.status === 404) throw new Error('Veículo não encontrado.');
  if (!res.ok) throw new Error(`A API respondeu com erro ${res.status}.`);
  return res.json();
}
