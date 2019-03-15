import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyDashboard.module.css';


class MyDashboard extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <p>My Resources</p>
        <div className={styles.Row1}>
          <div className={[styles.Wood, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>0</p>
          <div className={[styles.Brick, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>0</p>
          <div className={[styles.Sheep, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>0</p>
        </div>
        <div className={styles.Row2}>
          <div className={[styles.Wheat, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>0</p>
          <div className={[styles.Ore, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>0</p>
        </div>

        <div className={styles.BuyDevCard}>
          <div className={styles.Icon}></div>
          <div className={styles.Col}>
            <p>Buy Dev Card</p>
            <div className={styles.Row}>
              <div className={[styles.Sheep, styles.ResourceIconMini].join(' ')}></div>
              <div className={[styles.Wheat, styles.ResourceIconMini].join(' ')}></div>
              <div className={[styles.Ore, styles.ResourceIconMini].join(' ')}></div></div>
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

export default connect(mapStateToProps)(MyDashboard);