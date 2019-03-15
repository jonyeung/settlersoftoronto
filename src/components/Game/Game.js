import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Game.module.css';
import * as Board from './OriginalMap';
import GamePlayerToolBar from '../GamePlayerToolBar/GamePlayerToolBar';
import GamePlayerDevCards from '../GamePlayerDevCards/GamePlayerDevCards';
import GameButtons from '../GameButtons/GameButtons';
import TradeModal from '../TradeModal/TradeModal';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'


class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tradeModalOpen: false,
      showDice: false
    }

    this.openTradeModal = () => {
      this.setState({
        ...this.state,
        tradeModalOpen: true
      })
    }

    this.closeTradeModal = () => {
      this.setState({
        ...this.state,
        tradeModalOpen: false
      })
    }
  }
  //dice
  rollAll() {
    console.log('rolling')
    this.reactDice.rollAll()
    setTimeout(() => {
      console.log('timer set')
      this.setState({
        ...this.state,
        showDice: false
      })
    }, 2500);

    this.setState({
      ...this.state,
      showDice: true
    })
  }

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`)
  }

  componentDidMount() {

  }

  render() {
    let diceStyle = [styles.DiceRoll, styles.Hidden]
    if (this.state.showDice) {
      diceStyle.pop();
    }
    diceStyle = diceStyle.join(' ')

    return (
      <>
        {
          <div className={diceStyle} onClick={() => { this.rollAll() }}>
            <ReactDice
              numDice={2}
              rollDone={this.rollDoneCallback}
              ref={dice => this.reactDice = dice}
              rollTime={1}
              dieSize={200}
              faceColor={'#f7ecdd'}
              dotColor={'#333232'}
              disableIndividual
            />
          </div>
        }

        {this.state.tradeModalOpen ? <TradeModal closeTradeModal={this.closeTradeModal} /> : null}
        <GamePlayerToolBar></GamePlayerToolBar>
        <GameButtons openTradeModal={this.openTradeModal}
          rollDice={() => { this.rollAll() }} />
        <div className={styles.Board}>
          <div className={styles.Row0}>
            {Board.Row0}
          </div>
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
          <div className={styles.Row6}>
            {Board.Row6}
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