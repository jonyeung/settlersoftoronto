import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayerCard.module.css';

class PlayerCard extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.Profile}>
          <div className={styles.Phase}></div>
        </div>

        <div className={styles.Info}>
          <div className={styles.Item1}>
            <div className={styles.Icon}></div>
            <p>5</p>
          </div>
          <div className={styles.Item2}>
            <div className={styles.Icon}></div>
            <p>5</p>
          </div>
          <div className={styles.Item3}>
            <div className={styles.Icon}></div>
            <p>5</p>
          </div>
          <div className={styles.Item4}>
            <div className={styles.Icon}></div>
            <p>5</p>
          </div>

          <div className={styles.VictoryPoints}>
            <div className={styles.BigIcon}></div>
            <p>5</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(PlayerCard);