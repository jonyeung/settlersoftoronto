import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setRooms = (rooms) => {
  return {
    type: actionTypes.JOIN_ROOM,
    rooms: rooms
  }
}

export const setRoomsFailed = () => {
  return {
    type: actionTypes.SET_ROOMS_FAILED
  }
}

export const initRefreshRoom = () => {
  return (dispatch) => {

    axios.get('getRooms/' + '.json')
      .then(res => {
        dispatch(setRooms(res.data));
      })
      .catch(error => {
        dispatch(setRoomsFailed());
      });
  }
}
