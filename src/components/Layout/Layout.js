import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Layout.css';
import NavBar from '../NavBar/NavBar';
import Drawer from '../Drawer/Drawer';
import Footer from '../Footer/Footer';
import Login from "../Login/Login";

class Layout extends Component {
  
  state = {
    showDrawer: false,
    showLoginModal: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showDrawer: !prevState.showDrawer };
    });
  }

  loginModalClosedHandler = () => {
    this.setState({ showLoginModal: false });
  }

  loginModalToggleHandler = () => {
    this.setState((prevState) => {
      return { showLoginModal: !prevState.showLoginModal };
    });
  }

  render() {
    return (
      <>
        <NavBar toggleDrawer={this.sideDrawerToggleHandler} toggleLoginModal={this.loginModalToggleHandler} isOpen={this.state.showDrawer} closeDrawer={this.sideDrawerClosedHandler}/>
        <Drawer isOpen={this.state.showDrawer} closeDrawer={this.sideDrawerClosedHandler}  toggleLoginModal={this.loginModalToggleHandler}/>
        <Login isOpen={this.state.showLoginModal} closeLoginModal={this.loginModalClosedHandler}/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(Layout);