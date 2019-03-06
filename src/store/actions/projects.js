import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setProjects = (projects) => {
  return {
    type: actionTypes.SET_PROJECTS,
    projects: projects
  }
}

export const fetchProjectsFailed = () => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAILED
  }
}

export const initProjects = () => {
  return (dispatch) => {

    axios.get('Projects.json')
      .then(res => {
        dispatch(setProjects(res.data));
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchProjectsFailed());
      });
  }
}