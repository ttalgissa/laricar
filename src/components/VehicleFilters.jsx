import { C } from '../theme.js';

const Field = ({ label, children, cols = 'col-6 col-lg-3' }) => (
  <div className={cols}><label className="form-label small fw-semibold mb-1">{label}</label>{children}</div>
);

export default function VehicleFilters({ draft, setDraft, onApply, onClear, brands }) {
  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });
  const input = (k, props = {}) => <input className="form-control" value={draft[k]} onChange={set(k)} {...props} />;
  return (
    <form className="card border-0 shadow-sm p-3 mb-4" style={{ background: '#F6FBFF' }} onSubmit={(e) => { e.preventDefault(); onApply(draft); }}>
      <div className="row g-2">
        <Field label="Pesquisar (nome, marca ou modelo)" cols="col-12 col-lg-6">{input('q', { placeholder: 'Ex.: BYD Dolphin' })}</Field>
        <Field label="Ordenar por" cols="col-12 col-lg-6">
          <select className="form-select" value={draft.sort} onChange={(e) => { const n = { ...draft, sort: e.target.value }; setDraft(n); onApply(n); }}>
            <option value="km_asc">Menor quilometragem</option>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="year_desc">Ano (mais recente)</option>
          </select>
        </Field>
        <Field label="Marca">
          <select className="form-select" value={draft.brand} onChange={set('brand')}>
            <option value="">Todas</option>
            {[...new Set([...brands, draft.brand].filter(Boolean))].map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Modelo">{input('model', { placeholder: 'Ex.: DOLPHIN' })}</Field>
        <Field label="Ano de">{input('min_year', { type: 'number', min: 2000, placeholder: '2023' })}</Field>
        <Field label="Ano até">{input('max_year', { type: 'number', min: 2000, placeholder: '2026' })}</Field>
        <Field label="Preço mínimo (R$)">{input('min_price', { type: 'number', min: 0 })}</Field>
        <Field label="Preço máximo (R$)">{input('max_price', { type: 'number', min: 0 })}</Field>
        <Field label="Km máxima">{input('max_km', { type: 'number', min: 0, placeholder: '0 = zero km' })}</Field>
        <Field label="Estado (UF)">{input('state', { maxLength: 2, placeholder: 'SP' })}</Field>
        <Field label="Cidade" cols="col-12 col-lg-6">{input('city', { placeholder: 'Ex.: Belo Horizonte' })}</Field>
        <div className="col-12 col-lg-6 d-flex align-items-end gap-2">
          <button className="btn rounded-pill px-4" style={{ background: C.blueDark, color: '#fff' }}><i className="bi bi-search me-1" />Filtrar</button>
          <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={onClear}>Limpar filtros</button>
        </div>
      </div>
    </form>
  );
}
