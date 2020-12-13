import React from 'react';
import { ReactComponent as GunterUps } from '../../assets/svg/gunter-ups.svg';
import { trans } from '../../trans/trans';
import styles from './styles.module.css';
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
      <div>{message}</div>
      <Button variant="contained" onClick={reload}>
        {trans('words.reload')}
      </Button>
    </div>
  );
}
