import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './DevCard.module.css';
import ReactTooltip from 'react-tooltip';
import { KNIGHT, VICTORYPOINT, ROADBUILDER, MONOPOLY, YEAROFPLENTY } from './CardDescriptions.js';

class DevCard extends Component {


  render() {
    let cardStyle = [styles.Content]
    let cardInfo = <p>cannot find card</p>;
    switch (this.props.cardType) {
      case 'KNIGHT':
        cardStyle.push(styles.Knight)
        cardInfo = KNIGHT;
        break;
      case 'VICTORYPOINT':
        cardStyle.push(styles.VictoryPoint)
        cardInfo = VICTORYPOINT;
        break;
      case 'ROADBUILDER':
        cardStyle.push(styles.RoadBuilder)
        cardInfo = ROADBUILDER;
        break;
      case 'YEAROFPLENTY':
        cardStyle.push(styles.YearOfPlenty)
        cardInfo = YEAROFPLENTY;
        break;
      case 'MONOPOLY':
        cardStyle.push(styles.Monopoly)
        cardInfo = MONOPOLY;
        break;
      default:
        break;
    }
    return (
      <div data-tip="React-tooltip" data-for={this.props.cardType} className={cardStyle.join(' ')}>
        <ReactTooltip place="left" type="dark" effect="float" id={this.props.cardType}>
          <p>{this.props.cardType}</p>
          { cardInfo }
          {/* <p>The player playing this card may choose to move the robber to any tile. Knight cards will remain face up </p>
          <p>when played. The first player to have 3 Knight cards will gain access to the Largest Army card, granting two </p> 
          <p>Victory Points. If another player has more Knight cards then the current holder then he/she can take away </p>
          <p>the Largest Army card, along with the two Victory Points. </p> */}
        </ReactTooltip>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(DevCard);