import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameButtons.module.css';


class GameButtons extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.TradeButton}>Trade Icon</div>
        <div className={styles.EndTurnButton}>Roll/End Turn Icon</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GameButtons);