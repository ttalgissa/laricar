import { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../services/vehicleApi.js';
import { brl, km, C } from '../theme.js';

export default function VehicleCard({ v }) {
  const [broken, setBroken] = useState(false);
  const src = imgUrl(v.thumbnail_url);
  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden">
      {src && !broken ? (
        <img src={src} alt={`${v.brand} ${v.model}`} className="card-img-top object-fit-cover" style={{ height: 220 }} loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <div className="bg-light d-flex align-items-center justify-content-center text-secondary" style={{ height: 220 }}>
          <i className="bi bi-image fs-1" /> <span className="ms-2">Imagem indisponível</span>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <span className="badge align-self-start mb-2" style={{ background: C.yellow, color: C.ink }}>Novo</span>
        <h5 className="card-title mb-0">{v.brand} {v.model}</h5>
        <p className="text-secondary small">{v.version}</p>
        <p className="fs-4 fw-bold mb-2" style={{ color: C.blueDark }}>{brl(v.price_brl)}</p>
        <ul className="list-unstyled small text-secondary mb-3">
          <li><i className="bi bi-calendar3 me-2" />{v.year_manufacture}/{v.year_model}</li>
          <li><i className="bi bi-speedometer2 me-2" />{km(v.mileage_km)}</li>
          <li><i className="bi bi-geo-alt me-2" />{v.city && v.state ? `${v.city}/${v.state}` : 'Não informado'}</li>
        </ul>
        <Link to={`/veiculos/${v.id}`} className="btn rounded-pill mt-auto" style={{ background: C.blue, color: C.ink }}>Ver detalhes</Link>
      </div>
    </div>
  );
}
