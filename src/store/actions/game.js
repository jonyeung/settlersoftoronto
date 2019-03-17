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