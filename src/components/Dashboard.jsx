import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MetricCard from './MetricCard';
import AtencionesChart from './AtencionesChart';
import '../styles/Dashboard.css';

// Información de prueba: no representa pacientes ni atenciones reales.
const metricsData = [
  { id: 1, title: 'Pacientes registrados', value: '1,250', icon: '👥', color: '#0891b2', description: 'Total de pacientes de ejemplo' },
  { id: 2, title: 'Atenciones médicas', value: '320', icon: '🩺', color: '#16a34a', description: 'Atenciones simuladas del mes' },
  { id: 3, title: 'Citas pendientes', value: '48', icon: '📅', color: '#f59e0b', description: 'Citas próximas a realizarse' },
  { id: 4, title: 'Cumplimiento de citas', value: '92%', icon: '📊', color: '#8b5cf6', description: 'Indicador simulado de atención' },
];

const patientsData = [
  { codigo: 'P-001', edad: 28, area: 'Medicina general', estado: 'Atendido' },
  { codigo: 'P-002', edad: 42, area: 'Enfermería', estado: 'Pendiente' },
  { codigo: 'P-003', edad: 6, area: 'Pediatría', estado: 'Atendido' },
  { codigo: 'P-004', edad: 35, area: 'Medicina general', estado: 'En seguimiento' },
  { codigo: 'P-005', edad: 51, area: 'Nutrición', estado: 'Pendiente' },
  { codigo: 'P-006', edad: 19, area: 'Enfermería', estado: 'Atendido' },
];

const initialCitas = [
  { id: 'C-101', dia: '12 oct', hora: '09:00', especialidad: 'Medicina general', estado: 'Pendiente' },
  { id: 'C-102', dia: '12 oct', hora: '10:30', especialidad: 'Pediatría', estado: 'Pendiente' },
  { id: 'C-103', dia: '13 oct', hora: '11:00', especialidad: 'Nutrición', estado: 'Atendida' },
  { id: 'C-104', dia: '13 oct', hora: '14:00', especialidad: 'Enfermería', estado: 'Pendiente' },
];

function DashboardInicio({ onChangeSection }) {
  return (
    <>
      <section className="welcome-section">
        <span className="eyebrow">PANEL DE CONTROL</span>
        <h2>Bienvenido a SaludMetrics</h2>
        <p>Visualiza el seguimiento de atenciones, citas y pacientes mediante una interfaz desarrollada con componentes React.</p>
        <span className="welcome-status">● Sistema demostrativo · Octubre 2026</span>
        <div className="hero-symbol" aria-hidden="true">✚</div>
      </section>
      <section className="page-section" aria-labelledby="resumen-titulo">
        <div className="section-heading"><div><span className="eyebrow">INDICADORES CLAVE</span><h2 id="resumen-titulo">Resumen general</h2></div><span className="small-muted">Información ficticia</span></div>
        <div className="metrics-grid">
          {metricsData.map((metric) => (
            <MetricCard key={metric.id} title={metric.title} value={metric.value} icon={metric.icon} color={metric.color}>
              {metric.description}
            </MetricCard>
          ))}
        </div>
      </section>
      <div className="two-panels">
        <AtencionesChart />
        <section className="panel overview-panel">
          <span className="eyebrow">SEGUIMIENTO</span>
          <h2>Estado de citas</h2>
          <p>Porcentaje referencial de citas atendidas</p>
          <div className="progress-label"><span>Cumplimiento</span><strong>92%</strong></div>
          <div className="progress-track"><span style={{ width: '92%' }}/></div>
          <div className="overview-facts"><div><span>Atenciones del mes</span><strong>320</strong></div><div><span>Citas pendientes</span><strong>48</strong></div></div>
          <button type="button" className="text-action" onClick={() => onChangeSection('citas')}>Consultar citas →</button>
        </section>
      </div>
    </>
  );
}

function Pacientes() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const pacientes = patientsData.filter((p) =>
    (filtro === 'Todos' || p.estado === filtro) &&
    `${p.codigo} ${p.area} ${p.estado}`.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <section className="panel page-panel">
      <div className="section-heading"><div><span className="eyebrow">GESTIÓN DEMOSTRATIVA</span><h2>Pacientes</h2><p>Registros ficticios, sin nombres ni datos personales reales.</p></div><span className="count-label">{pacientes.length} resultados</span></div>
      <div className="controls-row">
        <label className="field-label">Buscar por código, especialidad o estado
          <input type="search" placeholder="Ej. P-002 o Pediatría" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </label>
        <label className="field-label">Estado
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option>Todos</option><option>Atendido</option><option>Pendiente</option><option>En seguimiento</option>
          </select>
        </label>
      </div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Código</th><th>Edad</th><th>Área</th><th>Estado</th></tr></thead><tbody>
        {pacientes.map((p) => <tr key={p.codigo}><td><strong>{p.codigo}</strong></td><td>{p.edad} años</td><td>{p.area}</td><td><span className={`status ${p.estado === 'Atendido' ? 'green' : p.estado === 'Pendiente' ? 'yellow' : 'blue'}`}>{p.estado}</span></td></tr>)}
        {pacientes.length === 0 && <tr><td colSpan={4}>No se encontraron pacientes con esos filtros.</td></tr>}
      </tbody></table></div>
      <p className="footnote">Prueba a escribir “P-002”, elegir un estado o borrar el filtro.</p>
    </section>
  );
}

function Citas() {
  const [citas, setCitas] = useState(initialCitas);
  const [filtro, setFiltro] = useState('Todas');
  const visibles = citas.filter((c) => filtro === 'Todas' || c.estado === filtro);
  const pendientes = citas.filter((c) => c.estado === 'Pendiente').length;
  function completar(id) {
    setCitas((actuales) => actuales.map((c) => c.id === id ? { ...c, estado: 'Atendida' } : c));
  }
  return (
    <section className="panel page-panel">
      <div className="section-heading"><div><span className="eyebrow">AGENDA DEMOSTRATIVA</span><h2>Citas médicas</h2><p>Marca una cita como atendida y observa el cambio sin recargar la página.</p></div><span className="count-label">{pendientes} pendientes en esta tabla</span></div>
      <div className="filter-buttons" aria-label="Filtrar citas">
        {['Todas', 'Pendiente', 'Atendida'].map((estado) => <button type="button" key={estado} onClick={() => setFiltro(estado)} className={filtro === estado ? 'chosen' : ''}>{estado === 'Todas' ? 'Todas' : estado === 'Pendiente' ? 'Pendientes' : 'Atendidas'}</button>)}
      </div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Código</th><th>Fecha</th><th>Hora</th><th>Especialidad</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
        {visibles.map((c) => <tr key={c.id}><td><strong>{c.id}</strong></td><td>{c.dia}</td><td>{c.hora}</td><td>{c.especialidad}</td><td><span className={`status ${c.estado === 'Atendida' ? 'green' : 'yellow'}`}>{c.estado}</span></td><td>{c.estado === 'Pendiente' ? <button type="button" className="mini-button" onClick={() => completar(c.id)}>Marcar atendida</button> : <span className="small-muted">Completada</span>}</td></tr>)}
        {visibles.length === 0 && <tr><td colSpan={6}>No hay citas en este estado.</td></tr>}
      </tbody></table></div>
      <p className="footnote">Cambios locales de demostración: se reinician al actualizar el navegador. Las métricas generales son datos de ejemplo independientes.</p>
    </section>
  );
}

function Estadisticas() {
  return (
    <>
      <div className="section-heading pad-bottom"><div><span className="eyebrow">ANÁLISIS DE INDICADORES</span><h2>Estadísticas de salud</h2><p>Comparación visual de atenciones médicas de ejemplo.</p></div></div>
      <AtencionesChart />
      <section className="panel spaced-panel">
        <div className="section-heading"><div><h2>Distribución por especialidad</h2><p>Valores ficticios de un período demostrativo.</p></div></div>
        {[{ name: 'Medicina general', percent: 43 }, { name: 'Enfermería', percent: 29 }, { name: 'Pediatría', percent: 18 }, { name: 'Nutrición', percent: 10 }].map((r) => <div className="progress-item" key={r.name}><div className="progress-label"><span>{r.name}</span><strong>{r.percent}%</strong></div><div className="progress-track"><span style={{ width: `${r.percent}%` }}/></div></div>)}
      </section>
    </>
  );
}

function Componentes() {
  const [selected, setSelected] = useState(0);
  const item = metricsData[selected];
  return (
    <section className="learning-page">
      <div className="section-heading"><div><span className="eyebrow">REACT · JSX</span><h2>Arquitectura de Componentes</h2><p>Demostración de Props, Children y reutilización.</p></div></div>
      <div className="panel spaced-panel">
        <h3>1. Flujo de datos</h3>
        <div className="component-tree"><div>App.jsx <small>componente raíz</small></div><span>↓</span><div>Dashboard.jsx <small>componente padre</small></div><span>↓ props + children</span><div>MetricCard.jsx <small>componente reutilizable</small></div></div>
        <p className="subtext">Dashboard transmite <code>title</code>, <code>value</code>, <code>icon</code> y <code>color</code> como props. La descripción viaja como contenido anidado (<code>children</code>).</p>
      </div>
      <div className="panel spaced-panel">
        <h3>2. Ejemplo interactivo de Props y Children</h3>
        <p className="subtext">Selecciona un indicador: cambia el contenido de la misma tarjeta reutilizable.</p>
        <div className="filter-buttons">{metricsData.map((m, i) => <button type="button" key={m.id} onClick={() => setSelected(i)} className={selected === i ? 'chosen' : ''}>{m.title}</button>)}</div>
        <div className="component-demo-grid"><MetricCard title={item.title} value={item.value} icon={item.icon} color={item.color}>{item.description}</MetricCard><div className="code-example"><span>Dashboard.jsx — JSX</span><pre>{`<MetricCard\n  title="${item.title}"\n  value="${item.value}"\n  icon="${item.icon}"\n  color="${item.color}"\n>\n  ${item.description}\n</MetricCard>`}</pre></div></div>
      </div>
      <div className="panel spaced-panel"><h3>3. Diferencia entre Props y Children</h3><p className="subtext"><strong>Props:</strong> valores enviados por el componente padre. <strong>Children:</strong> contenido anidado entre la apertura y el cierre de un componente. Ambos se leen desde el componente hijo, sin modificarse allí.</p></div>
    </section>
  );
}

function Estilado() {
  const [modo, setModo] = useState('modulo');
  const [color, setColor] = useState('#0891b2');
  return (
    <section className="learning-page">
      <div className="section-heading"><div><span className="eyebrow">CSS · REACT</span><h2>Estrategias de Estilado</h2><p>Comparación interactiva entre estilos locales e inline.</p></div></div>
      <div className="panel spaced-panel">
        <h3>Prueba los estilos</h3>
        <div className="filter-buttons"><button type="button" className={modo === 'modulo' ? 'chosen' : ''} onClick={() => setModo('modulo')}>CSS Modules</button><button type="button" className={modo === 'inline' ? 'chosen' : ''} onClick={() => setModo('inline')}>Estilo inline</button></div>
        <div className="styling-preview">
          {modo === 'modulo' ? <div className="module-demo"><strong>Tarjeta con clase CSS</strong><p>Los estilos se aplican mediante un archivo .module.css y se aíslan por componente.</p><span>CSS Modules activo</span></div> : <div style={{ background: color, borderRadius: 18, padding: 26, color: '#fff', boxShadow: '0 10px 25px #17304724' }}><strong>Tarjeta con estilos inline</strong><p>El color de fondo depende de una variable de React.</p><span>Estilo inline activo</span></div>}
          <div className="style-controls"><label className="field-label">Cambiar color del ejemplo inline<input type="color" value={color} onChange={(e) => { setColor(e.target.value); setModo('inline'); }} /></label></div>
        </div>
        <div className="code-example"><span>{modo === 'modulo' ? 'MetricCard.jsx' : 'Estilo inline en JSX'}</span><pre>{modo === 'modulo' ? "import styles from './MetricCard.module.css';\n<article className={styles.card}>...</article>" : `const color = '${color}';\n<div style={{ backgroundColor: color }}>...</div>`}</pre></div>
      </div>
      <div className="panel spaced-panel"><h3>¿Dónde se usa cada estrategia?</h3><p className="subtext"><strong>CSS Modules:</strong> <code>MetricCard.module.css</code> controla la presentación de las tarjetas sin contaminar otros componentes. <strong>Inline:</strong> se usa para los colores personalizados de cada indicador. <strong>CSS general:</strong> <code>Dashboard.css</code> organiza la cuadrícula, navegación y paneles.</p></div>
    </section>
  );
}

function CSR() {
  const [contador, setContador] = useState(0);
  const [texto, setTexto] = useState('');
  return (
    <section className="learning-page">
      <div className="section-heading"><div><span className="eyebrow">CLIENT-SIDE RENDERING</span><h2>Validación de CSR</h2><p>Compara el HTML de origen y el DOM construido por React.</p></div></div>
      <div className="panel spaced-panel"><h3>1. HTML inicial (ver código fuente con Ctrl + U)</h3><div className="code-example"><span>index.html</span><pre>{'<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>'}</pre></div><p className="subtext">El HTML original contiene el contenedor donde React montará la interfaz. El navegador descarga el JavaScript y construye el DOM.</p></div>
      <div className="panel spaced-panel"><h3>2. Cambia la página sin recargarla</h3><p className="subtext">Estas interacciones actualizan el DOM usando estado en React.</p><div className="csr-actions"><button type="button" className="primary-button" onClick={() => setContador((c) => c + 1)}>Incrementar contador</button><button type="button" className="light-button" onClick={() => { setContador(0); setTexto(''); }}>Reiniciar</button><strong>Contador: {contador}</strong></div><label className="field-label">Escribe aquí y observa el resultado<input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe algo..." /></label><p className="live-result">Texto actualizado: <strong>{texto || '(sin texto)'}</strong></p></div>
      <div className="panel spaced-panel"><h3>3. Evidencias para DevTools</h3><ol className="steps-list"><li>Presiona <strong>Ctrl + U</strong>: captura el HTML con <code>div#root</code>.</li><li>Presiona <strong>F12 → Elements</strong>: despliega <code>div#root</code> para ver el DOM de SaludMetrics.</li><li>En <strong>Network → JS</strong>, recarga y observa los módulos descargados.</li><li>En <strong>React DevTools → Components</strong>, comprueba los componentes y sus props, si tienes la extensión.</li></ol><p className="subtext">Esta aplicación usa CSR con <code>createRoot</code>. No hidrata HTML generado por servidor. Los meta tags de SEO y viewport están en <code>index.html</code>.</p></div>
    </section>
  );
}

/** Orquestador de vistas: navegación de una sola página mediante estado React. */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSection, setActiveSection] = useState('resumen');

  function changeSection(section) {
    setActiveTab('dashboard');
    setActiveSection(section);
  }

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} activeSection={activeSection} onChangeSection={changeSection} />
      <main className="dashboard dashboard-with-sidebar">
        <Header activeTab={activeTab} onChangeTab={setActiveTab} />
        {activeTab === 'dashboard' && <>
          {activeSection === 'resumen' && <DashboardInicio onChangeSection={changeSection} />}
          {activeSection === 'pacientes' && <Pacientes />}
          {activeSection === 'citas' && <Citas />}
          {activeSection === 'estadisticas' && <Estadisticas />}
        </>}
        {activeTab === 'componentes' && <Componentes />}
        {activeTab === 'estilado' && <Estilado />}
        {activeTab === 'csr' && <CSR />}
        <footer className="app-footer">SaludMetrics · Práctica Semana 05 · React + Vite · Datos ficticios</footer>
      </main>
    </div>
  );
}
