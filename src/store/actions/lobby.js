import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setRooms = (rooms) => {
  return {
    type: actionTypes.SET_ROOMS,
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

    axios.get('https://c09-project.herokuapp.com:3000/getRooms')
      .then(res => {
        console.log('res.data.rooms', res.data.rooms)
        dispatch(setRooms(res.data.rooms));
      })
      .catch(error => {
        dispatch(setRoomsFailed());
      });
  }
}
