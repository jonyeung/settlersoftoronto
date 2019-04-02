import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSyncAlt, faSignOutAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

import Layout from './components/Layout/Layout';
import RouteError from './components/RouteError/RouteError';
import Console from './components/Console/Console';
import Game from './components/Game/Game';
import GameLobby from './components/GameLobby/GameLobby';
import VictoryModal from './components/VictoryModal/VictoryModal';
import GameInvalidMoveModal from './components/GameInvalidMoveModal/GameInvalidMoveModal';
import CreateNewRoomForm from './components/CreateNewRoomForm/CreateNewRoomForm';
import CreateNewRoom from './components/CreateNewRoom/CreateNewRoom';

library.add(faSyncAlt, faSignOutAlt, faHeart);

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/Console" component={Console} />
        <Route path="/" exact component={GameLobby} />
        <Route path="/Test" exact component={GameLobby} />
        <Route path="/Game" exact component={Game} />
        <Route path="/RouteError" component={RouteError} />
        <Redirect to="/RouteError" />
      </Switch>
    );
    return (
      <div>
        {/* <Layout> */}
          {routes}
        {/* </Layout> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // autoSignIn: () => dispatch(authActions.authCheckState)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
