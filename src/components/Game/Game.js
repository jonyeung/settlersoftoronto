import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Game.module.css';
import * as Board from './OriginalMap';
import GamePlayerToolBar from '../GamePlayerToolBar/GamePlayerToolBar';
import GamePlayerDevCards from '../GamePlayerDevCards/GamePlayerDevCards';
import GameButtons from '../GameButtons/GameButtons';
import TradeModal from '../TradeModal/TradeModal';


class Game extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <>
        {/* <TradeModal></TradeModal> */}
        <GamePlayerToolBar></GamePlayerToolBar>
        <GameButtons></GameButtons>
        <div className={styles.Board}>
          <div className={styles.Row1}>
            {Board.Row1}
          </div>
          <div className={styles.Row2}>
            {Board.Row2}
          </div>
          <div className={styles.Row3}>
            {Board.Row3}
          </div>
          <div className={styles.Row4}>
            {Board.Row4}
          </div>
          <div className={styles.Row5}>
            {Board.Row5}
          </div>
        </div>
        <GamePlayerDevCards></GamePlayerDevCards>
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.lobbyReducer.rooms,
    error: state.lobbyReducer.error
  };
};

export default connect(mapStateToProps)(Game);