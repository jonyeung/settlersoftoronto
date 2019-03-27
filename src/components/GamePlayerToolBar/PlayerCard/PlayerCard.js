import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayerCard.module.css';

class PlayerCard extends Component {

  constructor(props) {
    super(props)

    this.numResources = 0
    this.numDevCards = 0
    this.profilePicStyles = [styles.Profile]
    this.phasePic = styles.WaitPhase

    this.calculateNumResources = () => {
      this.numResources = 0;
      Object.values(this.props.resources).forEach((val) => {
        this.numResources += val
      })
    }

    this.calculateNumDevCards = () => {
      this.numDevCards = 0
      Object.values(this.props.devCards).forEach((val) => {
        this.numDevCards += val
      })
    }

    this.renderProfilePic = () => {
      this.profilePicStyles = [styles.Profile]
      switch (this.props.playerNum) {
        case 1:
          this.profilePicStyles.push(styles.Player1)
          break;
        case 2:
          this.profilePicStyles.push(styles.Player2)
          break;
        case 3:
          this.profilePicStyles.push(styles.Player3)
          break;
        case 4:
          this.profilePicStyles.push(styles.Player4)
          break;
        default:
          break;
      }
    }

    this.renderPhasePic = () => {
      this.phasePic = styles.WaitPhase
      if (this.props.currentPlayerNum === this.props.playerNum - 1) {
        switch (this.props.currentPhase) {
          case ('setup_placement'):
            this.phasePic = styles.SetupPlacementPhase
            break;
          case ('roll_phase'):
            this.phasePic = styles.RollPhase
            break;
          case ('move_robber'):
            this.phasePic = styles.MoveRobberPhase
            break;
          case ('build/trade/devcard_phase'):
            this.phasePic = styles.BuildTradeDevCardPhase
            break;
          default:
            break;
        }
      }
    }
  }
  render() {
    if (!this.props.notLoaded) {
      this.calculateNumResources()
      this.calculateNumDevCards()
      this.renderProfilePic()
      this.renderPhasePic()
    }
    return (
      <div className={styles.Content}>
        <div className={this.profilePicStyles.join(' ')}>
          <div className={this.phasePic}></div>
        </div>

        <div className={styles.Info}>
          <div className={styles.Item1}>
            <div className={styles.Icon}></div>
            <p>{this.numResources}</p>
          </div>
          <div className={styles.Item2}>
            <div className={styles.Icon}></div>
            <p>{this.numDevCards}</p>
          </div>
          <div className={styles.Item3}>
            <div className={styles.Icon}></div>
            <p>{this.props.knightsPlayed}</p>
          </div>
          <div className={styles.Item4}>
            <div className={styles.Icon}></div>
            <p>{this.props.LongestRoadLength}</p>
          </div>

          <div className={styles.VictoryPoints}>
            <div className={styles.BigIcon}></div>
            <p>{this.props.VictoryPoints}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPhase: state.gameReducer.turnPhase,
    currentPlayerNum: state.gameReducer.currentPlayerNum
  };
};

export default connect(mapStateToProps)(PlayerCard);