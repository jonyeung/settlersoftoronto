import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GamePlayerDevCards.module.css';
import DevCard from './DevCard/DevCard';

class GamePlayerToolBar extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <DevCard></DevCard>
        <DevCard></DevCard>
        <DevCard></DevCard>
        <DevCard></DevCard>
        <DevCard></DevCard>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GamePlayerToolBar);