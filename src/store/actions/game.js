import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const selectEdge = (room) => {
  return (dispatch) => dispatch({
    type: actionTypes.SELECT_EDGE,
    joinedRoom: room
  })
}

export const unselectEdge = (room) => {
  return (dispatch) => dispatch({
    type: actionTypes.UNSELECT_EDGE,
    joinedRoom: room
  })
}

export const selectCorner = (room) => {
  return (dispatch) => dispatch({
    type: actionTypes.SELECT_CORNER,
    joinedRoom: room
  })
}

export const unselectCorner = (room) => {
  return (dispatch) => dispatch({
    type: actionTypes.UNSELECT_CORNER,
    joinedRoom: room
  })
}