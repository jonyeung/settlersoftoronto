import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameLobby.module.css';
import GameRoomSlot from '../GameRoomSlot/GameRoomSlot';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Drawer from '../Drawer/Drawer';
import Footer from '../Footer/Footer';

import * as joinRoomActions from '../../store/actions/joinRoom';

class GameLobby extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLoginModal: false,
      showDrawer: false
    }

    this.toggleLoginModal = () => {
      this.setState({
        ...this.state,
        showLoginModal: !this.state.showLoginModal
      })
    }

    this.closeModal = () => {
      this.setState({
        ...this.state,
        showLoginModal: false
      })
    }

    this.toggleDrawer = () => {
      this.setState({
        ...this.state,
        showDrawer: !this.state.showDrawer
      })
    }

    this.closeDrawer = () => {
      this.setState({
        ...this.state,
        showDrawer: false
      })
    }

    // this.joinRoom = () => {
    //   this.props.history.push('/Game')
    // }
  }

  componentDidMount() {

  }

  render() {
    let gameLobbyRoomsDisplay =
      <div className={styles.GameRoomsList}>
        <p className={styles.SignInToPlayMessage}>Welcome to the Settlers of Toronto. Sign in to play!</p>
      </div>
    if (this.props.authState.signedIn === true) {
      gameLobbyRoomsDisplay =
        <div className={styles.GameRoomsList}>
          <div>
            <h1>Games Rooms</h1>

          </div>
          {this.props.rooms.map((room) => {
            return (
              <GameRoomSlot key={room.name} room={room} joinRoomAction={() => { this.props.initJoinRoom(5, this.props.history) }}></GameRoomSlot>
            )
          })}
        </div>
    }

    return (
      <>
        <div className={styles.Content}>
          <NavBar toggleLoginModal={this.toggleLoginModal} toggleDrawer={this.toggleDrawer} />
          <Drawer isOpen={this.state.showDrawer} closeDrawer={this.closeDrawer} toggleLoginModal={this.toggleLoginModal}></Drawer>
          <Login isOpen={this.state.showLoginModal} closeLoginModal={this.closeModal}></Login>
          {gameLobbyRoomsDisplay}
        </div>
        <Footer></Footer>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authReducer,
    rooms: state.lobbyReducer.rooms,
    error: state.lobbyReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initJoinRoom: (room, routerHistory) => dispatch(joinRoomActions.initJoinRoom(room, routerHistory)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLobby);