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
