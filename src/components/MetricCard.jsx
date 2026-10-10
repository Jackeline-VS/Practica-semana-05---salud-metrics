import styles from '../styles/MetricCard.module.css';

/**
 * Tarjeta que recibe datos del componente padre mediante props.
 * @param {Object} props
 * @param {string} props.title Nombre del indicador.
 * @param {string} props.value Valor mostrado.
 * @param {string} props.icon Símbolo visual.
 * @param {string} props.color Color de acento.
 * @param {import('react').ReactNode} props.children Descripción anidada.
 */
export default function MetricCard({ title, value, icon, color, children }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.icon} style={{ backgroundColor: color }} aria-hidden="true">{icon}</span>
        <span className={styles.tag}>Indicador</span>
      </div>
      <p className={styles.title}>{title}</p>
      <strong className={styles.value}>{value}</strong>
      <div className={styles.description}>{children}</div>
    </article>
  );
}
