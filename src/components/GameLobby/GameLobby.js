import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameLobby.module.css';
import GameRoomSlot from '../GameRoomSlot/GameRoomSlot';


class GameLobby extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.Content}>
        <h1>Games Rooms</h1>
        <div className={styles.GameRoomsList}>
          {this.props.rooms.map((room) => {
            return (
              <GameRoomSlot room={room} joinRoomAction={() => { }}></GameRoomSlot>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.lobbyReducer.rooms,
    error: state.lobbyReducer.error
  };
};

export default connect(mapStateToProps)(GameLobby);