import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import projectsReducer from './store/reducers/projects';
import projectReducer from './store/reducers/project';
import featuredProjectsReducer from './store/reducers/featuredProjects';
import signUpReducer from './store/reducers/signUp';
import signInReducer from './store/reducers/signIn';
import createNewRoomReducer from './store/reducers/createNewRoom';
import authReducer from './store/reducers/auth';
import joinRoomReducer from './store/reducers/joinRoom';
import lobbyReducer from './store/reducers/lobby';
import gameReducer from './store/reducers/game';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  //reducers go here
  form: formReducer,
  projectsReducer: projectsReducer,
  projectReducer: projectReducer,
  featuredProjectsReducer: featuredProjectsReducer,
  signUpReducer: signUpReducer,
  signInReducer: signInReducer,
  createNewRoomReducer: createNewRoomReducer,
  authReducer: authReducer,

  joinRoomReducer: joinRoomReducer,
  lobbyReducer: lobbyReducer,
  gameReducer: gameReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <Router history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
