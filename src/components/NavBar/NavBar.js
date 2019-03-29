import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

class NavBar extends Component {
  render() {
    let rightDisplay =
      <a onClick={this.props.toggleLoginModal}>
        <div className={styles.NavItem}>Sign In</div>
      </a>

    if (this.props.authState.signedIn === true) {
      rightDisplay =
        <>
          <p className={styles.LoggedInAs}>Logged in as: {this.props.authState.username}</p>
          <a onClick={()=>{}}>
            <div className={styles.NavItem}>Sign Out</div>
          </a>
        </>
    }

    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <NavLink to={'/'} exact><h1>Settlers of Toronto</h1></NavLink>
          <div className={styles.NavItemsGroup}>
            {rightDisplay}
          </div>

          <div className={styles.Burger} onClick={this.props.toggleDrawer}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authReducer
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(NavBar);