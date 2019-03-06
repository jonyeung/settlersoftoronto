import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projects: [],
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECTS:
      let projects = [];

      for (let key in action.projects) {
        let project = action.projects[key];
        projects.push({
          project
        });
      }
      return {
        ...state,
        projects: projects,
        error: false
      }
    case actionTypes.FETCH_PROJECTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;