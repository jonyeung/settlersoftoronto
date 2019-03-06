import React from 'react';
import styles from './RouteError.module.css';

const RouteError = (props) => {

  return (
    <div className={styles.Content}>
      <h1>Woops! There is an error. Either you are not authorized to access this page or this page does not exist. Please check the URL and ensure that you have logged in.
      </h1>
    </div>
  )
}

export default RouteError;