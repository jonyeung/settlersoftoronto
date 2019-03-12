import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameButtons.module.css';


class GameButtons extends Component {
  render() {
    return (
      <div class={styles.Content}>
        <div class={styles.TradeButton}>Trade Icon</div>
        <div class={styles.EndTurnButton}>Roll/End Turn Icon</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GameButtons);