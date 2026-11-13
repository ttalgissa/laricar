import { Link, NavLink } from 'react-router-dom';
import { C } from '../theme.js';

const links = [['/', 'Home'], ['/veiculos', 'Veículos'], ['/sobre', 'Sobre nós'], ['/contato', 'Contato']];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4" style={{ color: C.ink }}>
          <i className="bi bi-car-front-fill me-2" style={{ color: C.blueDark }} />
          LARICAR <span style={{ color: C.blueDark }}>Veículos</span>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Abrir menu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto gap-lg-2">
            {links.map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink to={to} end={to === '/'} className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'fw-semibold' : ''}`}
                  style={({ isActive }) => (isActive ? { background: C.blue, color: C.ink } : { color: C.ink })}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
