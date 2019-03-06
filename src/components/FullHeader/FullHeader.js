import React from 'react';
import styles from './FullHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import history from '../../history';

const FullHeader = (props) => {

  const routeToContactUs = () => {
    history.push('ContactUs');
  }

  return (
    <div className={styles.Background}>
      <div className={styles.DiscoveryGroupTop}>
        <p>Building the world project by project</p>
      </div>

      <div className={styles.DiscoveryGroupMiddle}>
        <p>I am looking to...</p>
        <div className={styles.ButtonGroup}>
          <button onClick={routeToContactUs}>Start a Project</button>
          <button>Join a Project</button>
        </div>
      </div>

      <div className={styles.DiscoveryGroupBottom}>
        <p>UTSC Projects will help you build your talent while you help us build our community</p>
        <div className={styles.IconGroup}>
          <div className={styles.IconLabel}>
            <FontAwesomeIcon icon="laptop-code" size="6x" className={styles.FontAwesomeIcon}/>
            <p>Learn real world skills with talented peers who wants to do more</p>
          </div>
          <div className={styles.IconLabel}>
            <FontAwesomeIcon icon="dollar-sign" size="6x" className={styles.FontAwesomeIcon}/>
            <p>Absolutely free with special guidance from University Faculty</p>
          </div>
          <div className={styles.IconLabel}>
            <FontAwesomeIcon icon="fire" size="6x" className={styles.FontAwesomeIcon}/>
            <p>Real projects with real value to add fame to your name</p>          
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullHeader;