import styles from './Spinner.module.css';

const Spinner = ({ parentClasses='', classes='' }) => (
  <div class={`${styles.spinner} ${parentClasses}`}>
    <div className={`${styles.rect1} ${classes}`} />
    <div className={`${styles.rect2} ${classes}`} />
    <div className={`${styles.rect3} ${classes}`} />
    <div className={`${styles.rect4} ${classes}`} />
    <div className={`${styles.rect5} ${classes}`} />
  </div>
);

export default Spinner;