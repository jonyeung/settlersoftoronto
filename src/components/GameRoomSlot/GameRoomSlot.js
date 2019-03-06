import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameRoomSlot.module.css';


class GameRoomSlot extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.Content}>
        <p className={styles.RoomName}>{this.props.room.name}</p>
        <p className={styles.RoomInfo}>{this.props.room.numPlayers}/{this.props.room.maxPlayers} Players</p>
        <button className={styles.JoinRoomButton} onClick={this.props.joinRoomAction}>Join</button>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GameRoomSlot);