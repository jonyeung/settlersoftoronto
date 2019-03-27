import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameButtons.module.css';


class GameButtons extends Component {
  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.UpperContent}>
          <div className={styles.ExitButton}>Exit</div>
        </div>
        <div className={styles.LowerContent}>
          <div className={styles.TradeButton} onClick={this.props.openTradeModal}>Trade Icon</div>
          <div className={styles.EndTurnButton} onClick={this.props.rollDice}>Roll/End Turn Icon</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GameButtons);