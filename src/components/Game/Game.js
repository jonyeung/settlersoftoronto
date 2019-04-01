import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Game.module.css';
import * as Board from './OriginalMap';
import GamePlayerToolBar from '../GamePlayerToolBar/GamePlayerToolBar';
import GamePlayerDevCards from '../GamePlayerDevCards/GamePlayerDevCards';
import GameButtons from '../GameButtons/GameButtons';
import GameQuitButton from '../GameQuitButton/GameQuitButton';
import TradeModal from '../TradeModal/TradeModal';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import GameBuildOptions from '../GameBuildOptions/GameBuildOptions';
import Tile from '../Tile/Tile';
import MyDashboard from '../MyDashboard/MyDashboard';
import io from 'socket.io-client';
import * as gameActions from '../../store/actions/game';
import * as joinRoomActions from '../../store/actions/joinRoom';
import VictoryModal from '../VictoryModal/VictoryModal';
import GameInvalidMoveModal from '../GameInvalidMoveModal/GameInvalidMoveModal';

class Game extends Component {

  constructor(props) {
    super(props)

    this.initialState = {
      tradeModalOpen: false,
      showDice: false,
      //'EDGE' 'CORNER' or null
      buildType: null,
      victory: false,
      invalidMove: false,
      invalidMoveMessage: ''
    }

    this.state = this.initialState

    this.diceInit = false;
    this.socket = io.connect('https://localhost:3000')

    this.socket.on('PLAYER_CONNECT', (res) => {
      let response = JSON.parse(res)
      let invalidMoveMessage = response.invalidMove
      console.log('response socket', response)
      console.log('res.invalidMove', response.invalidMove)
      //invalid move
      if (response.invalidMove) {
        console.log('response.invalidMove', response.invalidMove)
        if (this.props.gameState.turnPhase === 'game not started') {
          invalidMoveMessage = 'Game not Started. Please click the start button on the bottom right of the screen'
        }
        this.setState({
          ...this.state,
          invalidMove: true,
          invalidMoveMessage: invalidMoveMessage
        })
      } else {
        this.props.updateGameState(response);
        this.setState({
          ...this.state,
          invalidMove: false,
          invalidMoveMessage: ''
        })
      }
    })

    this.socket.emit('PLAYER_CONNECT', {
      string: 'room_setup',
      gameName: 'game1',
      username: 'tony'
    })

    this.davidJoins = () => {
      console.log('this.props.gameStateId', this.props.gameStateId)
      this.socket.emit('PLAYER_CONNECT', {
        string: 'player_join',
        username: 'david',
        gameStateId: this.props.gameStateId,
      })
    }

    this.testMoveRobber = () => {
      console.log('this.props.gameStateId', this.props.gameStateId)
      this.socket.emit('PLAYER_CONNECT', {
        string: 'move_robber',
        robberPosition: '4',
        gameStateId: this.props.gameStateId,
      })
    }

    this.renderTile = (Tile) => {
      let resourceType = null;
      let newTile = null;
      let diceNumber = 0;
      let robber = false;
      let roads = []
      let settlements = []
      let cities = []

      if (Tile.props.ResourceType === 'Water') {
        newTile = React.cloneElement(
          Tile,
        )
      } else {
        if (this.props.hexes[Tile.props.HexId - 1]) {
          let currentHex = this.props.hexes[Tile.props.HexId - 1];
          resourceType = currentHex.resourceType
          diceNumber = currentHex.diceNumber
          currentHex.robber === true ? robber = true : robber = false
          settlements = currentHex.settlements
          cities = currentHex.cities
          roads = currentHex.roads
        } else {
          resourceType = null
        }
        // this.props.hexes[Tile.props.HexId - 1] ? resourceType = this.props.hexes[Tile.props.HexId - 1].resourceType : resourceType = null
        newTile = React.cloneElement(
          Tile,
          {
            displayEdgeBuildOptions: () => {
              this.toggleBuildType('EDGE')
            },
            displayCornerBuildOptions: () => {
              this.toggleBuildType('CORNER')
            },
            ResourceType: resourceType,
            diceNumber: diceNumber,
            hasRobber: robber,
            settlements: settlements,
            cities: cities,
            roads: roads
          }
        )
      }
      return newTile
    }

    this.toggleBuildType = (type) => {
      this.setState({
        ...this.state,
        buildType: type
      })
    }

    this.closeBuildModal = () => {
      this.setState({
        ...this.state,
        buildType: null
      })
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

    this.setVictoryTrue = () => {
      this.setState({
        ...this.state,
        victory: true
      })
    }

    this.checkVictory = () => {
      if ((this.props.gameState.gameOver === true && this.state.victory === false)) {
        this.setVictoryTrue()
      }
    }

    this.setInvalidMoveFalse = () => {
      this.setState({
        ...this.state,
        invalidMove: true
      })
    }

    this.toggleInvalidMove = () => {
      this.setState({
        ...this.state,
        invalidMove: !this.state.invalidMove
      })
    }

    this.rollDoneCallback = (num) => {
      console.log(`You rolledd a ${num}`)
      //roll here
      if (this.diceInit) {
        this.props.rollDice(this.socket, num, this.props.gameStateId)
      }
      //dice rolling on render for some reason
      this.diceInit = true
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

  componentDidMount() {
    //run room setup
  }

  render() {
    let diceStyle = [styles.DiceRoll, styles.Hidden]
    if (this.state.showDice) {
      diceStyle.pop();
    }
    diceStyle = diceStyle.join(' ')

    this.checkVictory()
    return (
      <>
        <button className={styles.Test} onClick={this.davidJoins}>AddPlayer</button>

        <GameInvalidMoveModal close={this.toggleInvalidMove} show={this.state.invalidMove} message={this.state.invalidMoveMessage}></GameInvalidMoveModal>
        <VictoryModal show={this.state.victory}
          quit={() => {
            this.props.leaveRoom(this.props.history)
            this.setState(...this.initialState)
          }}></VictoryModal>
        <GameQuitButton quit={() => { this.props.leaveRoom(this.props.history) }}></GameQuitButton>
        <div className={diceStyle}>
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

        {this.state.tradeModalOpen ? <TradeModal closeTradeModal={this.closeTradeModal} /> : null}
        <GamePlayerToolBar></GamePlayerToolBar>
        <div className={styles.GameBuildOptions}>
          {
            this.state.buildType === null ?
              null
              :
              <GameBuildOptions buildType={this.state.buildType} close={this.closeBuildModal} socket={this.socket} />
          }

        </div>
        <GameButtons openTradeModal={this.openTradeModal}
          rollDice={() => { this.rollAll() }}
          rolling={this.state.showDice}
          socket={this.socket} />
        <div className={styles.Board}>
          <div className={styles.Row0}>
            {Board.Row0}
          </div>

          <div className={styles.Row1}>
            {Board.Row1.map((Tile, i) => {
              let newTile = this.renderTile(Tile)
              return newTile
            })}
          </div>
          <div className={styles.Row2}>
            {Board.Row2.map((Tile) => {
              let newTile = this.renderTile(Tile)
              return newTile
            })}
          </div>
          <div className={styles.Row3}>
            {Board.Row3.map((Tile) => {
              let newTile = this.renderTile(Tile)
              return newTile
            })}
          </div>
          <div className={styles.Row4}>
            {Board.Row4.map((Tile) => {
              let newTile = this.renderTile(Tile)
              return newTile
            })}
          </div>
          <div className={styles.Row5}>
            {Board.Row5.map((Tile) => {
              let newTile = this.renderTile(Tile)
              return newTile
            })}
          </div>
          <div className={styles.Row6}>
            {Board.Row6.map((Tile) => {
              let newTile = React.cloneElement(
                Tile,
                {
                  displayEdgeBuildOptions: () => {
                    this.toggleBuildType('EDGE')
                  },
                  displayCornerBuildOptions: () => {
                    this.toggleBuildType('CORNER')
                  }
                }
              )
              return newTile
            })}
          </div>
        </div>
        <MyDashboard playerInfo={this.props.players[this.props.playerTurn]}></MyDashboard>
        <GamePlayerDevCards></GamePlayerDevCards>
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    gameStateId: state.gameReducer._id,
    hexes: state.gameReducer.hexes,
    error: state.lobbyReducer.error,
    gameState: state.gameReducer,
    players: state.gameReducer.players,
    playerTurn: state.gameReducer.currentPlayerNum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGameState: (newGameState) => dispatch(gameActions.updateGameState(newGameState)),
    rollDice: (socket, roll, gameStateId) => gameActions.rollDice(socket, roll, gameStateId),
    leaveRoom: (routerHistory) => dispatch(joinRoomActions.initLeaveRoom(routerHistory)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);