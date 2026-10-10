
const atenciones = [
  { mes: 'Mayo', total: 210 },
  { mes: 'Junio', total: 245 },
  { mes: 'Julio', total: 230 },
  { mes: 'Agosto', total: 285 },
  { mes: 'Setiembre', total: 300 },
  { mes: 'Octubre', total: 320 }
];

function AtencionesChart() {
  const maximo = Math.max(...atenciones.map(dato => dato.total));

  return (
    <section className="chart-card" id="estadisticas">
      <div className="chart-header">
        <div>
          <h2>Estadísticas de atenciones</h2>
          <p>Evolución mensual de las atenciones médicas</p>
        </div>
        <span className="chart-period">2026</span>
      </div>

      <div className="chart-container">
        {atenciones.map((dato) => (
          <div className="chart-column" key={dato.mes}>
            <span className="chart-value">{dato.total}</span>
            <div className="chart-track">
              <div
                className="chart-bar"
                style={{
                  height: `${(dato.total / maximo) * 100}%`
                }}
              />
            </div>
            <span className="chart-month">{dato.mes}</span>
          </div>
        ))}
      </div>

      <p className="chart-note">
        Datos ficticios utilizados para fines académicos.
      </p>
    </section>
  );
}

export default AtencionesChart;
