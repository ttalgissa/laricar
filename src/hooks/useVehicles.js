import { useEffect, useState, useCallback } from 'react';
import { listVehicles, isNew } from '../services/vehicleApi.js';

const SERVER_KEYS = ['brand', 'model', 'min_price', 'max_price', 'min_year', 'max_year', 'state', 'city', 'sort'];
const MAX_PAGES = 6;
export default function useVehicles(filters = {}, { want = 12 } = {}) {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const key = JSON.stringify(SERVER_KEYS.map((k) => filters[k] || ''));

  const fetchMore = useCallback(async (startPage, current) => {
    const params = {};
    SERVER_KEYS.forEach((k) => filters[k] && (params[k] = filters[k]));
    let page = startPage, totalPages = startPage, acc = [...current], found = 0, guard = 0;
    while (found < want && page <= totalPages && guard < MAX_PAGES) {
      const d = await listVehicles({ ...params, page, per_page: 50 });
      totalPages = d.totalPages || page;
      const fresh = d.items.filter(isNew).filter((v) => !acc.some((a) => a.id === v.id));
      acc = acc.concat(fresh);
      found += fresh.length;
      page++; guard++;
    }
    return { acc, next: { page, totalPages } };
  }, [key, want]);

  useEffect(() => {
    let off = false;
    setLoading(true); setError(''); setItems([]);
    fetchMore(1, [])
      .then((r) => !off && (setItems(r.acc), setNext(r.next)))
      .catch((e) => !off && setError(e.message || 'Veículo não encontrado ou Não existente'))
      .finally(() => !off && setLoading(false));
    return () => { off = true; };
  }, [fetchMore]);

  const loadMore = async () => {
    setLoading(true);
    try { const r = await fetchMore(next.page, items); setItems(r.acc); setNext(r.next); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return { items, loading, error, hasMore: next.page <= next.totalPages, loadMore };
}
