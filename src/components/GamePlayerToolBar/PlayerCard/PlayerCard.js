import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayerCard.module.css';

class PlayerCard extends Component {

  constructor(props) {
    super(props)

    this.numResources = 0
    this.numDevCards = 0

    this.calculateNumResources = () => {
      Object.values(this.props.resources).forEach((val) => {
        this.numResources += val
      })
    }

    this.calculateNumDevCards = () => {
      Object.values(this.props.devCards).forEach((val) => {
        this.numDevCards += val
      })
    }
  }
  render() {
    if (!this.props.notLoaded) {
      this.calculateNumResources()
      this.calculateNumDevCards()
    }
    return (
      <div className={styles.Content}>
        <div className={styles.Profile}>
          <div className={styles.Phase}></div>
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
  };
};

export default connect(mapStateToProps)(PlayerCard);