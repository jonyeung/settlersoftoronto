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

export const buildSettlement = (socket, selectedCornerId, gameStateId, username) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_settlement',
    gameStateId: gameStateId,
    location: selectedCornerId,
    username
  })
}

export const buildCity = (socket, selectedCornerId, gameStateId, username) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_city',
    gameStateId: gameStateId,
    location: selectedCornerId,
    username
  })
}

export const buildRoad = (socket, selectedEdgeId, gameStateId, username) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'build_road',
    start: selectedEdgeId[0],
    end: selectedEdgeId[1],
    gameStateId: gameStateId,
    username
  })
}

export const startGame = (socket, gameStateId) => {
  console.log('gamestateid: ', gameStateId)
  socket.emit('PLAYER_CONNECT', {
    string: 'start_game',
    gameStateId: gameStateId,
  })
}

export const rollDice = (socket, roll, gameStateId) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'regular_roll',
    roll: roll,
    gameStateId: gameStateId,
  })
}

export const endTurn = (socket, gameStateId, username) => {
  socket.emit('PLAYER_CONNECT', {
    string: 'end_turn',
    gameStateId: gameStateId,
    username: username
  })
}

export const updateGameState = (newGameState) => {
  console.log('updating game state')
  console.log('newGameState: ', newGameState)

  return (dispatch) => dispatch({
    type: actionTypes.UPDATE_GAME_STATE,
    newGameState: newGameState
  })
}

export const resetGameState = () => {
  return (dispatch) => dispatch({
    type: actionTypes.RESET_GAME_STATE,
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
