import { useEffect, useState } from 'react';
import useVehicles from '../hooks/useVehicles.js';
import VehicleCard from '../components/VehicleCard.jsx';
import VehicleFilters from '../components/VehicleFilters.jsx';
import Loading from '../components/Loading.jsx';
import { C } from '../theme.js';

const EMPTY = { q: '', brand: '', model: '', min_year: '', max_year: '', min_price: '', max_price: '', max_km: '', state: '', city: '', sort: 'km_asc' };

export default function Vehicles() {
  const [draft, setDraft] = useState(EMPTY);
  const [filters, setFilters] = useState(EMPTY);
  const [brands, setBrands] = useState([]);
  const { items, loading, error, hasMore, loadMore } = useVehicles(filters);

  useEffect(() => { setBrands((b) => [...new Set([...b, ...items.map((i) => i.brand)])].sort()); }, [items]);
  const shown = items.filter((v) =>
    (!filters.q || `${v.brand} ${v.model} ${v.version}`.toLowerCase().includes(filters.q.toLowerCase())) &&
    (filters.max_km === '' || v.mileage_km <= Number(filters.max_km)));

  const clear = () => { setDraft(EMPTY); setFilters(EMPTY); };

  return (
    <div className="container py-4">
      <h1 className="fw-bold" style={{ color: C.ink }}>Carros novos à venda</h1>
      <p className="text-secondary">Exibimos somente anúncios cuja condição oficial é “novo”.</p>
      <VehicleFilters draft={draft} setDraft={setDraft} onApply={setFilters} onClear={clear} brands={brands} />
      {error && <div className="alert alert-danger">{error} <button className="btn btn-sm btn-outline-danger ms-2" onClick={loadMore}>Tentar novamente</button></div>}
      <p className="small text-secondary">{shown.length} veículo(s) exibido(s)</p>
      <div className="row g-4">
        {shown.map((v) => <div className="col-12 col-md-6 col-xl-4" key={v.id}><VehicleCard v={v} /></div>)}
      </div>
      {loading && <Loading />}
      {!loading && !error && shown.length === 0 && (
        <div className="alert alert-info text-center my-4">Nenhum veículo novo encontrado com esses filtros. <button className="btn btn-link p-0" onClick={clear}>Limpar filtros</button></div>
      )}
      {!loading && hasMore && (
        <div className="text-center mt-4"><button className="btn rounded-pill px-5" style={{ background: C.blue, color: C.ink }} onClick={loadMore}>Carregar mais</button></div>
      )}
    </div>
  );
}
