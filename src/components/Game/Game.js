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
import GameBuildOptions from '../GameBuildOptions/GameBuildOptions';
import Tile from '../Tile/Tile';
import MyDashboard from '../MyDashboard/MyDashboard';
import io from 'socket.io-client';
import * as gameActions from '../../store/actions/game';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tradeModalOpen: false,
      showDice: false,

      //'EDGE' 'CORNER' or null
      buildType: null
    }

    this.socket = io.connect('http://localhost:3000')

    this.socket.emit('PLAYER_CONNECT', {
      string: 'player_join',
      gameName: 'game1',
      username: 'tony'
    })

    this.socket.on('room_setup', (res) => {
      console.log('room_setup socket', res)
      this.props.updateGameState(res);
    })

    this.socket.on('player_join', (res) => {
      console.log('player_join socket', res)
      this.props.updateGameState(res);
    })

    this.socket.on('start_game', (res) => {
    })

    this.socket.on('begin_main_game', (res) => {
    })

    this.socket.on('seven_roll', (res) => {
    })

    this.socket.on('move_robber', (res) => {
    })

    this.socket.on('regular_roll', (res) => {
    })

    this.socket.on('build_starting_road', (res) => {
    })

    this.socket.on('build_road', (res) => {
    })

    this.socket.on('build_starting_settlement', (res) => {
    })

    this.socket.on('build_settlement', (res) => {
    })

    this.socket.on('build_city', (res) => {
    })

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
    //run room setup
  }

  render() {
    let diceStyle = [styles.DiceRoll, styles.Hidden]
    if (this.state.showDice) {
      diceStyle.pop();
    }
    diceStyle = diceStyle.join(' ')

    return (
      <>
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

        {this.state.tradeModalOpen ? <TradeModal closeTradeModal={this.closeTradeModal} /> : null}
        <GamePlayerToolBar></GamePlayerToolBar>
        <div className={styles.GameBuildOptions}>
          {
            this.state.buildType === null ?
              null
              :
              <GameBuildOptions buildType={this.state.buildType} close={this.closeBuildModal} />
          }

        </div>
        <GameButtons openTradeModal={this.openTradeModal}
          rollDice={() => { this.rollAll() }} />
        <div className={styles.Board}>
          <div className={styles.Row0}>
            {Board.Row0}
          </div>

          <div className={styles.Row1}>
            {Board.Row1.map((Tile, i) => {
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
          <div className={styles.Row2}>
            {Board.Row2.map((Tile) => {
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
          <div className={styles.Row3}>
            {Board.Row3.map((Tile) => {
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
          <div className={styles.Row4}>
            {Board.Row4.map((Tile) => {
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
          <div className={styles.Row5}>
            {Board.Row5.map((Tile) => {
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
        <MyDashboard></MyDashboard>
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

const mapDispatchToProps = dispatch => {
  return {
    updateGameState: (newGameState) => dispatch(gameActions.updateGameState(newGameState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);