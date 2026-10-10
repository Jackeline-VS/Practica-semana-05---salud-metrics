
/**
 * Encabezado principal de SaludMetrics.
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 */
function Header({ title, subtitle }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-logo">✚</div>

      <div className="header-information">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-meta">
        <span className="header-date">
          📅 Octubre 2026
        </span>
        <span className="header-chip">
          ● Datos demostrativos
        </span>
      </div>
    </header>
  );
}

export default Header;
