export const C = { blue: '#A7D3F5', blueDark: '#4F9BD6', pink: '#FBDDE9', yellow: '#FFF0A6', ink: '#1F3A52' };
export const brl = (n) => (n == null ? 'Não informado' : n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
export const km = (n) => (n == null ? 'Não informado' : `${n.toLocaleString('pt-BR')} km`);
export const nv = (x) => (x === null || x === undefined || x === '' ? 'Não informado' : x);
