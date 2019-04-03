import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './VictoryModal.module.css';


class VictoryModal extends Component {
  render() {
    let visibility = styles.Hide
    let status = null;
    if (this.props.win === false){
      status = styles.Loss
    }
    else{
      status = styles.Victory
    }

    if(this.props.show === true) {
      visibility = styles.Show
    }

    return (
      <div className={visibility}>
        <div className={styles.Backdrop} onClick={this.props.quit}></div>
        <div className={styles.Content}>
          <div className={styles.Status}>
            <div className={status}>
            </div>
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

export default connect(mapStateToProps)(VictoryModal);