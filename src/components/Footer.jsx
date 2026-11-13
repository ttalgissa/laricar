import { Link } from 'react-router-dom';
import { C } from '../theme.js';

export default function Footer() {
  return (
    <footer className="mt-5 pt-5 pb-3" style={{ background: C.pink, color: C.ink }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold"><i className="bi bi-car-front-fill me-2" />LARICAR Veículos</h5>
            <p className="small mb-0">Concessionária fictícia (projeto acadêmico) especializada em carros elétricos novos.</p>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-bold">Navegação</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/" className="text-reset">Home</Link></li>
              <li><Link to="/veiculos" className="text-reset">Veículos</Link></li>
              <li><Link to="/sobre" className="text-reset">Sobre nós</Link></li>
              <li><Link to="/contato" className="text-reset">Contato</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-5">
            <h6 className="fw-bold">Contato (fictício)</h6>
            <ul className="list-unstyled small mb-0">
              <li><i className="bi bi-telephone me-2" />(92) 4002-8922</li>
              <li><i className="bi bi-envelope me-2" />comercial@laricar.com</li>
              <li><i className="bi bi-geo-alt me-2" />Av. Carros, 7000 – Manaus/AM</li>
              <li><i className="bi bi-clock me-2" />Seg a Sex 9h–18h · Sáb 9h–13h</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="small text-center mb-0">
          Dados de veículos: <a className="text-reset" href="https://veiculos.cyberposto.com.br/desenvolvedores" target="_blank" rel="noreferrer">Cyber Posto Veículos Open API</a>.
          Preços e disponibilidade são responsabilidade de cada anunciante de origem.
        </p>
      </div>
    </footer>
  );
}
