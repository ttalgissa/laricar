import { Link } from 'react-router-dom';
import { C } from '../theme.js';

export default function About() {
  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-7">
          <h1 className="fw-bold" style={{ color: C.ink }}>Sobre a LARICAR Veículos</h1>
          <p>Nossa missão é tornar a escolha do carro novo mais clara: fotos grandes, preço visível e informações técnicas organizadas, com “Não informado” sempre que um dado não existir.</p>
          <Link to="/veiculos" className="btn rounded-pill px-4 me-2" style={{ background: C.blueDark, color: '#fff' }}>Ver veículos</Link>
          <Link to="/contato" className="btn btn-outline-dark rounded-pill px-4">Fale conosco</Link>
        </div>
        <div className="col-lg-5">
          <div className="rounded-4 p-4" style={{ background: C.yellow }}>
            <h2 className="h5 fw-bold">Nossos valores</h2>
            <ul className="mb-0"><li>Carros topzera</li><li>So 0km</li><li>preço bão</li><li>Atendimento 5 estrelas</li></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
