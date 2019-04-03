import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GameBuildOptions.module.css';
import * as gameActions from '../../store/actions/game';

class GameBuildOptions extends Component {

  BUILD_TYPES = {
    EDGE: 'EDGE',
    CORNER: 'CORNER',
    NONE: 'NONE'
  }

  render() {
    let cornerBuild =
      <>
        <div className={[styles.Settlement, styles.Option].join(' ')}
          onClick={() => {
            this.props.buildSettlement(
              this.props.socket,
              this.props.selectedCornerId,
              this.props.gameStateId,
              this.props.auth.username
            )
          }}>
          <div className={styles.Icon}>
          </div>
          <div className={styles.ResourceTitleCol}>
            <p className={styles.Label}>Settlement</p>

            <div className={styles.ResourcesNeeded}>
              <div className={[styles.ResourceIcon, styles.Wood].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Wheat].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Sheep].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Brick].join(' ')}></div>
            </div>
          </div>
        </div>

        <div className={[styles.City, styles.Option].join(' ')}
          onClick={() => {
            this.props.buildCity(
              this.props.socket,
              this.props.selectedCornerId,
              this.props.gameStateId,
              this.props.auth.username
            )
          }}>
          <div className={styles.Icon}>
          </div>
          <div className={styles.ResourceTitleCol}>
            <p className={styles.Label}>City</p>

            <div className={styles.ResourcesNeeded}>
              <div className={[styles.ResourceIcon, styles.Ore].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Ore].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Ore].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Wheat].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Wheat].join(' ')}></div>
            </div>
          </div>
        </div>
      </>

    let edgeBuild =
      <>
        <div className={[styles.Road, styles.Option].join(' ')}
          onClick={() => {
            console.log()
            this.props.buildRoad(
              this.props.socket,
              this.props.selectedEdgeId,
              this.props.gameStateId,
              this.props.auth.username
            )
          }}>
          <div className={styles.Icon}>
          </div>
          <div className={styles.ResourceTitleCol}>
            <p className={styles.Label}>Road</p>

            <div className={styles.ResourcesNeeded}>
              <div className={[styles.ResourceIcon, styles.Wood].join(' ')}></div>
              <div className={[styles.ResourceIcon, styles.Brick].join(' ')}></div>
            </div>
          </div>
        </div>
      </>

    let show = null;
    if (this.props.buildType === this.BUILD_TYPES.EDGE) {
      show = edgeBuild
    } else if (this.props.buildType === this.BUILD_TYPES.CORNER) {
      show = cornerBuild
    }
    return (
      <div className={styles.Content}>
        <div className={styles.Row}>
          <p className={styles.Title}>Build</p>
          <div className={styles.Exit} onClick={this.props.close}></div>
        </div>
        {show}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedCornerId: state.gameReducer.selectedCornerId,
    selectedEdgeId: state.gameReducer.selectedEdgeId,
    gameStateId: state.gameReducer._id,

    auth: state.authReducer,
    error: state.lobbyReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buildSettlement: (socket, selectedCornerId, gameStateId, username) => gameActions.buildSettlement(socket, selectedCornerId, gameStateId, username),
    buildCity: (socket, selectedCornerId, gameStateId, username) => gameActions.buildCity(socket, selectedCornerId, gameStateId, username),
    buildRoad: (socket, selectedEdgeId, gameStateId, username) => gameActions.buildRoad(socket, selectedEdgeId, gameStateId, username),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBuildOptions);