import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const joinRoom = (room) => {
  return {
    type: actionTypes.JOIN_ROOM,
    joinedRoom: room
  }
}

export const leaveRoom = () => {
  return {
    type: actionTypes.JOIN_ROOM,
  }
}

export const roomActionFailed = () => {
  return {
    type: actionTypes.ROOM_ACTION_FAILED
  }
}

export const initJoinRoom = (room, routerHistory) => {
  return (dispatch) => {

    // axios.get('joinRoom/' + room + '.json')
    //   .then(res => {
    //     dispatch(joinRoom(res.data));
    //   })
    //   .catch(error => {
    //     dispatch(roomActionFailed());
    //   });
    routerHistory.push('/Game')
  }
}

export const initLeaveRoom = (room) => {
  return (dispatch) => {

    axios.get('leaveRoom/' + room + '.json')
      .then(res => {
        dispatch(leaveRoom(res.data));
      })
      .catch(error => {
        dispatch(roomActionFailed());
      });
  }
}