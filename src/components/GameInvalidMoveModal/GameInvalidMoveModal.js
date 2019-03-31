import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameInvalidMoveModal.module.css';


class GameInvalidMoveModal extends Component {
  render() {
    let visibility = styles.Hide

    if(this.props.show === true) {
      visibility = styles.Show
    }

    return (
      <div className={visibility}>
        <div className={styles.Backdrop} onClick={this.props.close}></div>
        <div className={styles.Content}>
          <div className={styles.Status}>
            <p>{this.props.message}</p>
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

export default connect(mapStateToProps)(GameInvalidMoveModal);