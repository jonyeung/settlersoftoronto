import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rooms: [
    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },
    { name: 'room3', numPlayers: 4, maxPlayers: 4 },
    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },    { name: 'room1', numPlayers: 3, maxPlayers: 4 },
    { name: 'room2nameisawesome', numPlayers: 1, maxPlayers: 4 },
  ],
  error: false
}

const reducer = (state = initialState, action) => {
  console.log('lobby reducer')
  console.log('action: ', action)
  switch (action.type) {
    case actionTypes.SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
        error: false
      }
    case actionTypes.SET_ROOMS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;