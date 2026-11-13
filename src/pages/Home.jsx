import { Link } from 'react-router-dom';
import useVehicles from '../hooks/useVehicles.js';
import VehicleCard from '../components/VehicleCard.jsx';
import Loading from '../components/Loading.jsx';
import { imgUrl } from '../services/vehicleApi.js';
import { C } from '../theme.js';

const perks = [
  ['bi-patch-check', 'Somente 0 km', 'Todos os anúncios são validados pelo campo oficial de condição: novo.'],
  ['bi-lightning-charge', '100% elétricos', 'Catálogo focado em mobilidade elétrica e sustentável.'],
  ['bi-shield-check', 'Transparência', 'Preço, ano e origem do anúncio sempre visíveis.'],
  ['bi-headset', 'Atendimento próximo', 'Fale com nossa equipe e tire todas as dúvidas.'],
];

export default function Home() {
  const { items, loading, error } = useVehicles({ sort: 'km_asc' }, { want: 6 });
  const hero = items[0] && imgUrl(items[0].thumbnail_url);
  return (
    <>
      <section className="text-white py-5 position-relative"
        style={{ minHeight: 460, background: `linear-gradient(90deg, rgba(31,58,82,.85), rgba(79,155,214,.35)), url(${hero || ''}) center/cover ${C.blueDark}` }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold col-lg-7">Encontre o carro novo ideal para você</h1>
          <p className="lead col-lg-6">A LARICAR Veículos reúne carros elétricos zero quilômetro com preço, fotos e informações claras para você decidir com tranquilidade.</p>
          <Link to="/veiculos" className="btn btn-lg rounded-pill px-4" style={{ background: C.yellow, color: C.ink }}>Ver veículos</Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="fw-bold mb-4" style={{ color: C.ink }}>Veículos em destaque</h2>
        {loading && <Loading />}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-4">
          {items.slice(0, 6).map((v) => <div className="col-12 col-md-6 col-lg-4" key={v.id}><VehicleCard v={v} /></div>)}
        </div>
        <div className="text-center mt-4"><Link to="/veiculos" className="btn rounded-pill px-4" style={{ background: C.blue, color: C.ink }}>Acessar o catálogo completo</Link></div>
      </section>

      <section className="py-5" style={{ background: C.pink }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h2 className="fw-bold" style={{ color: C.ink }}>Sobre a LARICAR</h2>
              <p>Somos uma concessionária fictícia criada para o projeto da professora mais diva, vulgo Fernanda Belmira, se você está lendo isso e não é ela, saia.</p>
              <Link to="/sobre" className="btn btn-outline-dark rounded-pill">Conheça a empresa</Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {perks.map(([icon, t, d]) => (
                  <div className="col-6" key={t}>
                    <div className="bg-white rounded-4 p-3 h-100 shadow-sm">
                      <i className={`bi ${icon} fs-3`} style={{ color: C.blueDark }} />
                      <h6 className="fw-bold mt-2">{t}</h6><p className="small text-secondary mb-0">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
