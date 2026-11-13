import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVehicle, imgUrl, isNew } from '../services/vehicleApi.js';
import Loading from '../components/Loading.jsx';
import { brl, km, nv, C } from '../theme.js';

export default function VehicleDetails() {
  const { id } = useParams();
  const [v, setV] = useState(null);
  const [error, setError] = useState('');
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState({});

  useEffect(() => {
    setV(null); setError(''); setIdx(0);
    getVehicle(id).then(setV).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div><Link to="/veiculos" className="btn btn-outline-dark rounded-pill">Voltar aos veículos</Link></div>;
  if (!v) return <Loading text="Carregando detalhes..." />;
  if (!isNew(v)) return <div className="container py-5"><div className="alert alert-warning">Este anúncio não é de um veículo novo e por isso não é exibido na LARICAR.</div><Link to="/veiculos" className="btn btn-outline-dark rounded-pill">Voltar aos veículos</Link></div>;

  const photos = (v.photos?.length ? v.photos : [v.thumbnail_url]).map(imgUrl).filter(Boolean);
  const name = `${v.brand} ${v.model}`;
  const original = v.source_url || v.listing_url || v.original_url || v.url || null;
  const rows = [
    ['Marca', v.brand], ['Modelo', v.model], ['Versão', v.version], ['Ano', v.year_manufacture && `${v.year_manufacture}/${v.year_model}`],
    ['Quilometragem', km(v.mileage_km)], ['Combustível', 'Elétrico'], ['Câmbio', v.transmission], ['Cor', v.color],
    ['Portas', v.doors], ['Localização', v.city && `${v.city}/${v.state}`],
    ['Bateria', v.battery_kwh && `${v.battery_kwh} kWh`], ['Autonomia', v.range_km && `${v.range_km} km`],
    ['Carga AC', v.charging?.ac_hours && `${v.charging.ac_hours} h`], ['Carga rápida DC', v.charging?.dc_minutes && `${v.charging.dc_minutes} min`],
    ['Conectores', v.charging?.connectors?.length ? v.charging.connectors.join(', ') : null],
  ];

  return (
    <div className="container py-4">
      <nav className="small mb-3"><Link to="/veiculos">← Voltar aos veículos</Link></nav>
      <div className="row g-4">
        <div className="col-lg-7">
          {photos[idx] && !broken[idx]
            ? <img src={photos[idx]} alt={name} className="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" style={{ maxHeight: 460 }} onError={() => setBroken({ ...broken, [idx]: true })} />
            : <div className="bg-light rounded-4 d-flex align-items-center justify-content-center text-secondary" style={{ height: 360 }}>Imagem indisponível</div>}
          <div className="d-flex gap-2 mt-2 overflow-auto pb-2">
            {photos.map((p, i) => (
              <img key={p} src={p} alt={`${name} foto ${i + 1}`} role="button" onClick={() => setIdx(i)} loading="lazy"
                className={`rounded-3 object-fit-cover ${i === idx ? 'border border-3' : ''}`}
                style={{ width: 90, height: 64, borderColor: C.blueDark }} onError={(e) => (e.currentTarget.style.display = 'none')} />
            ))}
          </div>
        </div>
        <div className="col-lg-5">
          <span className="badge mb-2" style={{ background: C.yellow, color: C.ink }}>Novo</span>
          <h1 className="h2 fw-bold mb-0" style={{ color: C.ink }}>{name}</h1>
          <p className="text-secondary">{nv(v.version)}</p>
          <p className="display-6 fw-bold" style={{ color: C.blueDark }}>{brl(v.price_brl)}</p>
          <div className="d-grid gap-2 mb-3">
            <Link to={`/contato?veiculo=${encodeURIComponent(`${name} ${v.version || ''} (ID ${v.id})`)}`} className="btn btn-lg rounded-pill" style={{ background: C.blueDark, color: '#fff' }}>Tenho interesse</Link>
            {original
              ? <a href={original} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-pill">Ver anúncio original <i className="bi bi-box-arrow-up-right" /></a>
              : <button className="btn btn-outline-secondary rounded-pill" disabled>Anúncio original não disponível</button>}
          </div>
          <div className="rounded-4 p-3" style={{ background: C.pink }}>
            <h2 className="h6 fw-bold">Descrição</h2>
            <p className="small mb-0">{nv(v.description)}</p>
          </div>
        </div>
      </div>
      <div className="row g-4 mt-1">
        <div className="col-md-7">
          <h2 className="h5 fw-bold">Características técnicas</h2>
          <table className="table table-sm"><tbody>{rows.map(([k, val]) => <tr key={k}><th className="fw-semibold w-50">{k}</th><td>{nv(val)}</td></tr>)}</tbody></table>
        </div>
        <div className="col-md-5">
          <h2 className="h5 fw-bold">Itens e características</h2>
          {v.features?.length ? <ul>{v.features.map((f) => <li key={f}>{f}</li>)}</ul> : <p>Não informado</p>}
        </div>
      </div>
    </div>
  );
}
