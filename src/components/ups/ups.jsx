import React from 'react';
import { ReactComponent as GunterUps } from '../../assets/svg/gunter-ups.svg';
import styles from './styles.module.css';
import { trans } from '../../trans/trans';
import Button from '@material-ui/core/Button';

export default function Ups({ message }) {
  function reload() {
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div className={styles.svg_container}>
        <GunterUps />
      </div>
      {message && <p>{message}</p>}
      <Button variant="contained" onClick={reload}>
        {trans('words.reload')}
      </Button>
    </div>
  );
}
