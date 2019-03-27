import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './VictoryModal.module.css';


class VictoryModal extends Component {
  render() {
    let status = styles.Loss;
    if (this.props.win === false){
      status = styles.Loss
    }
    else{
      status = styles.Victory
    }
    return (
      <>
        <div className={styles.Content}>
          <div className={styles.Status}>
            <div className={status}>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(VictoryModal);