import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameButtons.module.css';
import * as gameActions from '../../store/actions/game';

class GameButtons extends Component {
  render() {
    let EndButtonStyle = null
    let endClickAction = null

    if (this.props.currentPhase === 'roll_phase') {
      EndButtonStyle = styles.RollButton
      endClickAction = this.props.rollDice
    } else if (this.props.currentPhase === 'build/trade/devcard_phase' ||  this.props.currentPhase === 'setup_placement') {
      EndButtonStyle = styles.EndTurnButton
      endClickAction = () => {this.props.endTurn(this.props.socket, this.props.gameState)}
    } else if (this.props.currentPhase === 'game not started') {
      EndButtonStyle = styles.StartGameButton
      endClickAction = () => {this.props.startGame(this.props.socket, this.props.gameState)}
    } else {
      EndButtonStyle = styles.WaitButton
    } 

    if(this.props.rolling === true) {
      EndButtonStyle = styles.WaitButton
    }

    return (
      <div className={styles.Content}>
        <div className={styles.TradeButton} onClick={this.props.openTradeModal}></div>
        <div className={EndButtonStyle} onClick={endClickAction}></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPhase: state.gameReducer.turnPhase,
    currentPlayerNum: state.gameReducer.currentPlayerNum,
    gameState: state.gameReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endTurn: (socket, gameState) => gameActions.endTurn(socket, gameState),
    startGame: (socket, gameState) => gameActions.startGame(socket, gameState),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameButtons);