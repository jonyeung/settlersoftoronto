import React from 'react';
import styles from './LongInfo.module.css';

const LongInfo = (props) => {

  return (
    <div className={styles.Content}>
      <div className={styles.CenterText}>
        <h1>{props.header}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default LongInfo;