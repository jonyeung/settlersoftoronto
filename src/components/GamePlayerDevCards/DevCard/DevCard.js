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
      case 'VICTORYPOINT':
        cardStyle.push(styles.VictoryPoint)
        break;
      case 'ROADBUILDER':
        cardStyle.push(styles.RoadBuilder)
        break;
      case 'YEAROFPLENTY':
        cardStyle.push(styles.YearOfPlenty)
        break;
      case 'MONOPOLY':
        cardStyle.push(styles.Monopoly)
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