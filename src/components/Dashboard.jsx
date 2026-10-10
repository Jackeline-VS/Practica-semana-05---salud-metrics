
import '../styles/Dashboard.css';
import AtencionesChart from './AtencionesChart';
import Header from './Header';
import MetricCard from './MetricCard';
import Sidebar from './Sidebar';

const metricsData = [
  {
    id: 1,
    title: 'Pacientes registrados',
    value: '1,250',
    icon: '👥',
    color: '#0891b2',
    description: 'Total de pacientes del centro'
  },
  {
    id: 2,
    title: 'Atenciones médicas',
    value: '320',
    icon: '🩺',
    color: '#16a34a',
    description: 'Atenciones durante el mes'
  },
  {
    id: 3,
    title: 'Citas pendientes',
    value: '48',
    icon: '📅',
    color: '#f59e0b',
    description: 'Citas próximas a realizarse'
  },
  {
    id: 4,
    title: 'Cumplimiento de citas',
    value: '92%',
    icon: '📊',
    color: '#8b5cf6',
    description: 'Porcentaje de citas atendidas'
  }
];


function Dashboard() {
  return (
    <>
      <Sidebar />

      <main className="dashboard dashboard-with-sidebar">

        <Header
  title="SaludMetrics"
  subtitle="Sistema de Monitoreo de Indicadores de Salud"
/>

      <section className="welcome-section">
        <span className="welcome-label">
          PANEL DE CONTROL
        </span>

        <h2>Bienvenido a SaludMetrics</h2>

        <p>
          Plataforma para visualizar y realizar el
          seguimiento de los principales indicadores
          de atención de un centro de salud.
        </p>

        <div className="welcome-status">
          ● Sistema activo | Octubre 2026
        </div>
      </section>

      <section className="dashboard-content">
        <h2>Resumen general</h2>

        <p>
          Indicadores principales de atención médica,
          pacientes registrados y gestión de citas.
        </p>

        <div className="metrics-grid">
          {metricsData.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
            >
              <span>{metric.description}</span>
            </MetricCard>
          ))}
        </div>

      </section>
      
  <AtencionesChart />
  
    </main>
     </>
  );
}

export default Dashboard;
