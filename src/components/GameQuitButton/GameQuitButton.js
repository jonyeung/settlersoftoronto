import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameQuitButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as gameActions from '../../store/actions/game';

class GameQuitButton extends Component {
  render() {

    return (
      <FontAwesomeIcon icon="sign-out-alt" className={styles.Content} size="2x"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameQuitButton);