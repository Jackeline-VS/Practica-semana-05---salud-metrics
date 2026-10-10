
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-icon">✚</div>
        <div>
          <h2>SaludMetrics</h2>
          <span>Centro de Salud</span>
        </div>
      </div>

      <p className="sidebar-label">MENÚ PRINCIPAL</p>

      <nav className="sidebar-menu">
        <a href="#inicio" className="sidebar-link">
          🏠 Inicio
        </a>

        <a href="#indicadores" className="sidebar-link">
          📊 Indicadores de salud
        </a>
      </nav>

      <div className="sidebar-footer">
        <p>Panel de monitoreo</p>
        <span>React + Vite | 2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;
