import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GamePlayerToolBar.module.css';
import PlayerCard from './PlayerCard/PlayerCard';

class GamePlayerToolBar extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GamePlayerToolBar);