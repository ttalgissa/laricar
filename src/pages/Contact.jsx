import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { C } from '../theme.js';

export default function Contact() {
  const [params] = useSearchParams();
  const veiculo = params.get('veiculo');
  const [f, setF] = useState({ nome: '', email: '', telefone: '', assunto: veiculo ? `Interesse no veículo: ${veiculo}` : '', mensagem: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (f.nome.trim().length < 3) e.nome = 'Informe seu nome (mínimo 3 letras).';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Informe um e-mail válido.';
    if (f.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone com DDD.';
    if (f.assunto.trim().length < 3) e.assunto = 'Informe o assunto.';
    if (f.mensagem.trim().length < 10) e.mensagem = 'A mensagem deve ter ao menos 10 caracteres.';
    return e;
  };
  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(); setErrors(e);
    if (!Object.keys(e).length) setSent(true);
  };
  const field = (k, label, props = {}, Tag = 'input') => (
    <div className="mb-3">
      <label className="form-label fw-semibold" htmlFor={k}>{label}</label>
      <Tag id={k} className={`form-control ${errors[k] ? 'is-invalid' : ''}`} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} {...props} />
      {errors[k] && <div className="invalid-feedback">{errors[k]}</div>}
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: C.ink }}>Contato</h1>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="rounded-4 p-4 h-100" style={{ background: C.pink }}>
            <h2 className="h5 fw-bold">LARICAR Veículos</h2>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><i className="bi bi-telephone me-2" />(92) 3000-0000</li>
              <li className="mb-2"><i className="bi bi-envelope me-2" />contato@laricar.example</li>
              <li className="mb-2"><i className="bi bi-geo-alt me-2" />Av. Exemplo, 1000 – Manaus/AM</li>
              <li><i className="bi bi-clock me-2" />Seg a Sex 9h–18h<br /><span className="ms-4">Sáb 9h–13h</span></li>
            </ul>
            <p className="small mt-3 mb-0">Dados de contato fictícios.</p>
          </div>
        </div>
        <div className="col-lg-8">
          {sent ? (
            <div className="alert alert-success"><i className="bi bi-check-circle me-2" />Mensagem enviada com sucesso! Obrigado, {f.nome.split(' ')[0]}. Entraremos em contato em breve (envio simulado).</div>
          ) : (
            <form onSubmit={submit} noValidate>
              {veiculo && <div className="alert alert-info py-2">Veículo de interesse: <strong>{veiculo}</strong></div>}
              <div className="row"><div className="col-md-6">{field('nome', 'Nome')}</div><div className="col-md-6">{field('email', 'E-mail', { type: 'email' })}</div></div>
              <div className="row"><div className="col-md-6">{field('telefone', 'Telefone', { type: 'tel', placeholder: '(92) 99999-9999' })}</div><div className="col-md-6">{field('assunto', 'Assunto')}</div></div>
              {field('mensagem', 'Mensagem', { rows: 5 }, 'textarea')}
              <button className="btn btn-lg rounded-pill px-5" style={{ background: C.blueDark, color: '#fff' }}>Enviar mensagem</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
