import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = (props) => {

  return (
    <div className={styles.Background}>
      <div className={styles.Content}>
        <p>Made with <FontAwesomeIcon icon="heart" size="sm" className={styles.FontAwesomeIcon}/> by <a href="http://david-liu-ziming.com/" target="_blank" rel="noopener noreferrer">David Ziming Liu</a>, Jonathan Yeung and Tony Zeng at <a href="https://www.utoronto.ca/" target="_blank" rel="noopener noreferrer">The University of Toronto</a>.
        </p>
      </div>
    </div>
  )
}

export default Footer;