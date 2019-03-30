import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameRoomSlot.module.css';


class GameRoomSlot extends Component {

  componentDidMount() {

  }

  render() {
    let joinButton = <button className={styles.JoinRoomButton} onClick={this.props.joinRoomAction}>Join</button>
    if (this.props.room.numPlayers === this.props.room.maxPlayers) {
      joinButton = <button className={[styles.JoinRoomButton, styles.JoinRoomButtonDisabled].join(' ')}>Join</button>
    }
    return (
      <div className={styles.Content}>
        <p className={styles.RoomName}>{this.props.room.name}</p>
        <p className={styles.RoomInfo}>{this.props.room.numPlayers}/{this.props.room.maxPlayers} Players</p>
        {joinButton}
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(GameRoomSlot);