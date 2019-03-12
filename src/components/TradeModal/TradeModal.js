import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './TradeModal.module.css';

class TradeModal extends Component {
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

export default connect(mapStateToProps)(TradeModal);