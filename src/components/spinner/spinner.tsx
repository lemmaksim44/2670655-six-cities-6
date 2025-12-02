import styles from './spinner.module.css';
import spinner from './spinner.png';

function Spinner() {
  return(
    <div className={styles.spinnerContainer}>
      <img src={spinner} className={styles.image}/>
    </div>
  );
}

export default Spinner;
