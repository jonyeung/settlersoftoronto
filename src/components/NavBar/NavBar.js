import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

class NavBar extends Component {
  render() {
    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <NavLink to={'/'} exact><h1>Settlers of Toronto</h1></NavLink>
          <div className={styles.NavItemsGroup}>

            <a onClick={this.props.toggleLoginModal}>
              <div className={styles.NavItem}>Choose Name</div>
            </a>
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
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(NavBar);