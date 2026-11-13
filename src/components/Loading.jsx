export default function Loading({ text = 'Carregando veículos...' }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border text-info" />
      <p className="mt-3 text-secondary">{text}</p>
    </div>
  );
}
