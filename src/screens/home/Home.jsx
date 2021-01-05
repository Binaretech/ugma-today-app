import React from 'react';
import CostsList from '../../components/costsList/CostsList';
import News from '../news/';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.mainContainer}>
      <CostsList />
      <News onlyMostRecentNews />
    </div>
  );
}

export default Home;
