import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyDashboard.module.css';


class MyDashboard extends Component {
  constructor(props) {
    super(props)
    this.resources = {
      wood: 0,
      sheep: 0,
      ore: 0,
      brick: 0,
      wheat: 0
    };

    this.renderResources = () => {
      this.resources = {
        wood: 0,
        sheep: 0,
        ore: 0,
        brick: 0,
        wheat: 0
      };
      if (this.props.playerInfo) {
        this.resources.wood = this.props.playerInfo.resources.Wood
        this.resources.sheep = this.props.playerInfo.resources.Sheep
        this.resources.ore = this.props.playerInfo.resources.Ore
        this.resources.brick = this.props.playerInfo.resources.Brick
        this.resources.wheat = this.props.playerInfo.resources.Wheat
      }
    }
  }

  render() {
    this.renderResources();
    return (
      <div className={styles.Content}>
        <p>My Resources</p>
        <div className={styles.Row1}>
          <div className={[styles.Wood, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>{this.resources.wood}</p>
          <div className={[styles.Brick, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>{this.resources.brick}</p>
          <div className={[styles.Sheep, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>{this.resources.sheep}</p>
        </div>
        <div className={styles.Row2}>
          <div className={[styles.Wheat, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>{this.resources.wheat}</p>
          <div className={[styles.Ore, styles.ResourceIcon].join(' ')}></div>
          <p className={styles.ResourceAmount}>{this.resources.ore}</p>
        </div>

        <div className={styles.BuyDevCard}>
          <div className={styles.Icon}></div>
          <div className={styles.Col}>
            <p>Buy Dev Card</p>
            <div className={styles.Row}>
              <div className={[styles.Sheep, styles.ResourceIconMini].join(' ')}></div>
              <div className={[styles.Wheat, styles.ResourceIconMini].join(' ')}></div>
              <div className={[styles.Ore, styles.ResourceIconMini].join(' ')}></div></div>
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

export default connect(mapStateToProps)(MyDashboard);