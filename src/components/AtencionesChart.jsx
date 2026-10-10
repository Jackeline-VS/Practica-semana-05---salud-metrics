import { useState } from 'react';

const datos = [
  { mes: 'Mayo', total: 210 },
  { mes: 'Junio', total: 245 },
  { mes: 'Julio', total: 230 },
  { mes: 'Agosto', total: 285 },
  { mes: 'Setiembre', total: 300 },
  { mes: 'Octubre', total: 320 },
];

/** Gráfico CSS con selector funcional entre seis y tres meses. */
export default function AtencionesChart() {
  const [periodo, setPeriodo] = useState('6');
  const datosVisibles = periodo === '6' ? datos : datos.slice(-3);
  const maximo = 340;
  return (
    <section className="panel chart-panel" aria-labelledby="titulo-grafico">
      <div className="panel-heading">
        <div><span className="eyebrow">ANÁLISIS MENSUAL</span><h2 id="titulo-grafico">Atenciones médicas</h2><p>Evolución de atenciones durante 2026</p></div>
        <div className="switch-options" aria-label="Período del gráfico">
          <button type="button" className={periodo === '6' ? 'chosen' : ''} onClick={() => setPeriodo('6')}>6 meses</button>
          <button type="button" className={periodo === '3' ? 'chosen' : ''} onClick={() => setPeriodo('3')}>3 meses</button>
        </div>
      </div>
      <div className="bar-chart" role="img" aria-label={datosVisibles.map(d => `${d.mes}: ${d.total} atenciones`).join(', ')}>
        {datosVisibles.map((dato) => (
          <div className="bar-column" key={dato.mes}>
            <span className="bar-value">{dato.total}</span>
            <div className="bar-track"><div className="bar-fill" style={{ height: `${dato.total / maximo * 100}%` }}/></div>
            <span className="bar-label">{dato.mes}</span>
          </div>
        ))}
      </div>
      <p className="footnote">Valores ficticios para una práctica de desarrollo web.</p>
    </section>
  );
}
