import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameLobby.module.css';
import GameRoomSlot from '../GameRoomSlot/GameRoomSlot';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Drawer from '../Drawer/Drawer';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as joinRoomActions from '../../store/actions/joinRoom';
import * as lobbyActions from '../../store/actions/lobby';
import CreateNewRoom from '../CreateNewRoom/CreateNewRoom';

class GameLobby extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLoginModal: false,
      showDrawer: false,
      showCreateNewRoomModal: false
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

    this.openModal = () => {
      this.setState({
        ...this.state,
        showLoginModal: true
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

    this.toggleCreateNewRoomModal = () => {
      console.log('toggling')
      this.setState({
        ...this.state,
        showCreateNewRoomModal: !this.state.showCreateNewRoomModal
      })
    }

    this.closeCreateNewRoomModal = () => {
      this.setState({
        ...this.state,
        showCreateNewRoomModal: false
      })
    }

    this.openCreateNewRoomModal = () => {
      this.setState({
        ...this.state,
        showCreateNewRoomModal: true
      })
    }

    // this.joinRoom = () => {
    //   this.props.history.push('/Game')
    // }
  }

  componentDidUpdate() {

  }

  render() {
    // console.log('closemodal state: ', this.state.showLoginModal)

    let gameLobbyRoomsDisplay =
      <div className={styles.GameRoomsList}>
        <p className={styles.SignInToPlayMessage}>Welcome to the Settlers of Toronto. Sign in to play!</p>
      </div>
    if (this.props.authState.signedIn === true) {
      gameLobbyRoomsDisplay =
        <>
          <div className={styles.Horizontal}>
            <h1>Games Rooms</h1>
            <div className={styles.Refresh} onClick={this.props.initRefreshRoom}>
              <FontAwesomeIcon icon="sync-alt" size="lg"/>
            </div>
          </div>
          <div className={styles.GameRoomsList}>

            {this.props.rooms.map((room) => {
              return (
                <GameRoomSlot gameStateId={room.id} key={room.name} room={room} joinRoomAction={() => { this.props.initJoinRoom(room.id, this.props.history) }}></GameRoomSlot>
              )
            })}
          </div>
        </>
    }

    return (
      <>
        <div className={styles.Content}>
          <NavBar toggleCreateNewRoomModal={this.toggleCreateNewRoomModal} toggleLoginModal={this.toggleLoginModal} toggleDrawer={this.toggleDrawer} />
          <Drawer isOpen={this.state.showDrawer} closeDrawer={this.closeDrawer} toggleLoginModal={this.toggleLoginModal}></Drawer>
          <Login isOpen={this.state.showLoginModal} closeLoginModal={this.closeModal} openLoginModal={this.openModal}></Login>
          <CreateNewRoom isOpen={this.state.showCreateNewRoomModal} closeModal={this.closeCreateNewRoomModal} openModal={this.openCreateNewRoomModal}></CreateNewRoom>
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
    initRefreshRoom: () => dispatch(lobbyActions.initRefreshRoom())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLobby);