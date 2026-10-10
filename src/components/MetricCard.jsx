
import styles from '../styles/MetricCard.module.css';

/**
 * Tarjeta reutilizable para indicadores de salud.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.value
 * @param {string} props.icon
 * @param {string} props.color
 * @param {React.ReactNode} props.children
 */
function MetricCard({ title, value, icon, color, children }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.icon}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className={styles.information}>
        <p className={styles.title}>{title}</p>
        <h2 className={styles.value}>{value}</h2>
        <div className={styles.description}>
          {children}
        </div>
      </div>
    </article>
  );
}

export default MetricCard;
