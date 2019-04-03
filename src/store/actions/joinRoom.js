import * as actionTypes from './actionTypes';
import * as gameActions from '../actions/game';
import axios from '../../axios-projects';

export const joinRoom = (gameState) => {
  return gameActions.updateGameState(gameState)
  // return {
  //   type: actionTypes.JOIN_ROOM,
  //   joinedRoom: room
  // }
}

export const leaveRoom = () => {
  return {
    type: actionTypes.LEAVE_ROOM,
  }
}

export const roomActionFailed = () => {
  return {
    type: actionTypes.ROOM_ACTION_FAILED
  }
}

export const initJoinRoom = (gameStateId, username, uid, routerHistory) => {
  return (dispatch) => {

    axios.post('http://localhost:3000/playerJoin', {
      username,
      uid,
      gameStateId
    })
      .then(res => {
        console.log('join room response: ', res.data)
        routerHistory.push('/Game')

        // setTimeout(routerHistory.push('/Game'), 50)
        dispatch(joinRoom(res.data));
      })
      .catch(error => {
        dispatch(roomActionFailed(error));
      });

  }
}

export const initLeaveRoom = (routerHistory) => {
  return (dispatch) => {
    dispatch(gameActions.resetGameState())
    routerHistory.push('/')
    // axios.get('leaveRoom/' + room + '.json')
    //   .then(res => {
    //     dispatch(leaveRoom(res.data));
    //   })
    //   .catch(error => {
    //     dispatch(roomActionFailed());
    //   });
  }
}