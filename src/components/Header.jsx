const tabs = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'componentes', label: '🧩 Componentes' },
  { id: 'estilado', label: '🎨 Estilado' },
  { id: 'csr', label: '⚡ CSR' },
];

/** Encabezado con navegación SPA; los eventos se comunican al componente padre por props. */
export default function Header({ activeTab, onChangeTab }) {
  return (
    <header className="top-header">
      <div className="top-header-intro">
        <div className="top-title-row">
          <span className="title-symbol" aria-hidden="true">✚</span>
          <div>
            <h1>SaludMetrics</h1>
            <p>Sistema de Monitoreo de Indicadores de Salud</p>
          </div>
        </div>
        <span className="demo-tag">● Datos ficticios · Octubre 2026</span>
      </div>
      <nav className="top-tabs" aria-label="Secciones de la práctica">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`top-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
