import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const selectEdge = (selectedEdgeId) => {
  return (dispatch) => dispatch({
    type: actionTypes.SELECT_EDGE,
    selectedEdgeId: selectedEdgeId
  })
}

export const unselectEdge = () => {
  return (dispatch) => dispatch({
    type: actionTypes.UNSELECT_EDGE,
    selectedEdgeId: null
  })
}

export const selectCorner = (selectedCornerId) => {
  return (dispatch) => dispatch({
    type: actionTypes.SELECT_CORNER,
    selectedCornerId: selectedCornerId
  })
}

export const unselectCorner = () => {
  return (dispatch) => dispatch({
    type: actionTypes.UNSELECT_CORNER,
    selectedCornerId: null
  })
}

export const buildSettlement = (socket, selectedCornerId, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_starting_settlement',
    gameState: gameState,
    location: selectedCornerId
  })
}

export const buildCity = (socket, selectedCornerId, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_city',
    gameState: gameState,
    location: selectedCornerId
  })
}

export const buildRoad = (socket, selectedEdgeId, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_starting_road',
    start: selectedEdgeId[0],
    end: selectedEdgeId[1],
    gameState: gameState,
  })
}

export const startGame = (socket, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'start_game',
    gameState: gameState,
  })
}

export const rollDice = (socket, roll, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'regular_roll',
    roll: roll,
    gameState: gameState,
  })
}

export const endTurn = (socket, gameState) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'end_turn',
    gameState: gameState,
  })
}

export const updateGameState = (newGameState) => {
  return (dispatch) => dispatch({
    type: actionTypes.UPDATE_GAME_STATE,
    newGameState: newGameState
  })
}

// export const roomSetup = (socket) => {
// 	return (dispatch) => {
// 		socket.on('initialList',(res)=>{
// 		   console.dir(res)
// 		   dispatch(initialItems(res))
// 	   })
// 	}	
// }
