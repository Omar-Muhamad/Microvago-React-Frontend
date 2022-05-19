import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

const Spinner = ({ parentClasses = '', classes = '' }) => (
  <div className={`${styles.spinner} ${parentClasses}`}>
    <div className={`${styles.rect1} ${classes}`} />
    <div className={`${styles.rect2} ${classes}`} />
    <div className={`${styles.rect3} ${classes}`} />
    <div className={`${styles.rect4} ${classes}`} />
    <div className={`${styles.rect5} ${classes}`} />
  </div>
);

Spinner.propTypes = {
  parentClasses: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Spinner;
