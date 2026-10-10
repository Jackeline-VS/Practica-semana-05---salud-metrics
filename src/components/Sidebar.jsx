const options = [
  { id: 'resumen', label: 'Inicio', icon: '🏠' },
  { id: 'pacientes', label: 'Pacientes', icon: '👥' },
  { id: 'citas', label: 'Citas médicas', icon: '📅' },
  { id: 'estadisticas', label: 'Estadísticas', icon: '📈' },
];

/** Menú lateral controlado por el padre: no recarga la página al cambiar la vista. */
export default function Sidebar({ activeSection, onChangeSection, activeTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-symbol" aria-hidden="true">✚</span>
        <div><strong>SaludMetrics</strong><small>Centro de salud · Demo</small></div>
      </div>
      <div className="sidebar-heading">PANEL DE SALUD</div>
      <nav className="sidebar-menu" aria-label="Menú de salud">
        {options.map((option) => (
          <button
            type="button"
            className={`sidebar-link ${activeTab === 'dashboard' && activeSection === option.id ? 'selected' : ''}`}
            key={option.id}
            onClick={() => onChangeSection(option.id)}
            aria-current={activeTab === 'dashboard' && activeSection === option.id ? 'page' : undefined}
          >
            <span aria-hidden="true">{option.icon}</span> {option.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <strong>Práctica Semana 05</strong>
        <span>React · Vite · JSX · Props · CSR</span>
        <small>Aplicación académica, sin datos reales</small>
      </div>
    </aside>
  );
}
