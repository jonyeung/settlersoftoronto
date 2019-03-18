import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './DevCard.module.css';

class DevCard extends Component {
  render() {
    let cardStyle = [styles.Content]
    switch (this.props.cardType) {
      case 'KNIGHT':
        cardStyle.push(styles.Knight)
        break;
      default:
        break;
    }
    return (
      <div className={cardStyle.join(' ')}>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(DevCard);