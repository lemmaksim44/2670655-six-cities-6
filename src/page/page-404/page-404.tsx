import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import styles from './page-404.module.css';
import gif404 from './404_2.gif';

function Page404() {
  return (
    <div className="page page--favorites-empty">
      <Header/>

      <main className={styles.page404}>
        <div className={`${styles.page404Block} container`}>
          <img src={gif404} className={styles.gif404}/>
          <p className={styles.text404}>404 - Page not found</p>
          <Link className={styles.button404} to={AppRoute.Main}>Back to Main Screen</Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Page404;
