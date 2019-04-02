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

<<<<<<< HEAD
    axios.get('https://c09-project-express-backend.herokuapp.com/getRooms')
=======
    axios.get('https://c09-project.herokuapp.com/getRooms')
>>>>>>> 21007b59a2ba9b690704f4dcfb596639294d6722
      .then(res => {
        console.log('res.data.rooms', res.data.rooms)
        dispatch(setRooms(res.data.rooms));
      })
      .catch(error => {
        dispatch(setRoomsFailed());
      });
  }
}
