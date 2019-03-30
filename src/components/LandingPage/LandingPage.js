import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullHeader from '../FullHeader/FullHeader';
import ProjectsOverview from '../ProjectsOverview/ProjectsOverview';
import GameLobby from '../GameLobby/GameLobby';

class LandingPage extends Component {
  state = {
    showDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showDrawer: !prevState.showDrawer };
    });
  }

  render() {
    return (
      <>
        <GameLobby></GameLobby>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(LandingPage);