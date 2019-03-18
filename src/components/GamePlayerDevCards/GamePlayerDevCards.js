import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GamePlayerDevCards.module.css';
import DevCard from './DevCard/DevCard';

class GamePlayerToolBar extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <DevCard cardType={'KNIGHT'}></DevCard>
        <DevCard cardType={'KNIGHT'}></DevCard>
        <DevCard cardType={'KNIGHT'}></DevCard>
        <DevCard cardType={'KNIGHT'}></DevCard>
        <DevCard cardType={'KNIGHT'}></DevCard>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GamePlayerToolBar);