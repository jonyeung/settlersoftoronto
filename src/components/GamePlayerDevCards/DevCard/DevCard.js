import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './DevCard.module.css';

class DevCard extends Component {
  render() {
    return (
      <div className={styles.Content}>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(DevCard);