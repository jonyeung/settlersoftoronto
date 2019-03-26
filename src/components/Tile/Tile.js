import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Tile.module.css';
import * as gameActions from '../../store/actions/game';


class Tile extends Component {

  constructor(props) {
    super(props)

    // this.state = {
    //   topLeftCornerStyle: [styles.CornerTopLeft],
    //   topMiddleCorner: [styles.CornerTopMiddle],
    //   topRightCorner: [styles.CornerTopRight],
    //   bottomLeftCorner: [styles.CornerBottomLeft],
    //   bottomMiddleCorner: [styles.CornerBottomMiddle],
    //   bottomRightCorner: [styles.CornerBottomRight],
    //   topLeftCorner: [styles.EdgeTopLeft],
    //   topRightEdge: [styles.EdgeTopRight],
    //   middleLeftEdge: [styles.EdgeMiddleLeft],
    //   middleRightEdge: [styles.EdgeMiddleRight],
    //   bottomLeftEdge: [styles.EdgeBottomLeft],
    //   bottomRightEdge: [styles.EdgeBottomRight],
    // }

    this.topLeftCorner = [styles.CornerTopLeft]
    this.topMiddleCorner = [styles.CornerTopMiddle]
    this.topRightCorner = [styles.CornerTopRight]
    this.bottomLeftCorner = [styles.CornerBottomLeft]
    this.bottomMiddleCorner = [styles.CornerBottomMiddle]
    this.bottomRightCorner = [styles.CornerBottomRight]

    this.topLeftEdge = [styles.EdgeTopLeft]
    this.topRightEdge = [styles.EdgeTopRight]
    this.middleLeftEdge = [styles.EdgeMiddleLeft]
    this.middleRightEdge = [styles.EdgeMiddleRight]
    this.bottomLeftEdge = [styles.EdgeBottomLeft]
    this.bottomRightEdge = [styles.EdgeBottomRight]

    this.hexCircleStyle = [styles.HexCircle]

    this.determineCornerStyles = () => {
      let playerHouseStyle = null;
      let playerCityStyle = null;

      if (this.props.ResourceType === 'Water') {
        return
      }
      this.topLeftCorner = [styles.CornerTopLeft]
      this.topMiddleCorner = [styles.CornerTopMiddle]
      this.topRightCorner = [styles.CornerTopRight]
      this.bottomLeftCorner = [styles.CornerBottomLeft]
      this.bottomMiddleCorner = [styles.CornerBottomMiddle]
      this.bottomRightCorner = [styles.CornerBottomRight]
      this.props.settlements.forEach((settlement) => {
        switch (settlement.player) {
          case 0:
            playerHouseStyle = styles.Player1HouseTile
            break;
          case 1:
            playerHouseStyle = styles.Player2HouseTile
            break;
          case 2:
            playerHouseStyle = styles.Player3HouseTile
            break;
          case 3:
            playerHouseStyle = styles.Player4HouseTile
            break;
          default:
            break;
        }

        switch (settlement.location) {
          case this.props.TopMiddleCornerId:
            this.topMiddleCorner.push(playerHouseStyle)
            break;
          case this.props.TopLeftCornerId:
            this.topLeftCorner.push(playerHouseStyle)
            break;
          case this.props.TopRightCornerId:
            this.topRightCorner.push(playerHouseStyle)
            break;
          case this.props.BottomLeftCornerId:
            this.bottomLeftCorner.push(playerHouseStyle)
            break;
          case this.props.BottomRightCornerId:
            this.bottomRightCorner.push(playerHouseStyle)
            break;
          case this.props.BottomMiddleCornerId:
            this.bottomMiddleCorner.push(playerHouseStyle)
            break;
          default:
            break;
        }
      })

      this.props.cities.forEach((city) => {
        switch (city.player) {
          case 0:
            playerCityStyle = styles.CityTile
            break;
          case 1:
            playerCityStyle = styles.CityTile
            break;
          case 2:
            playerCityStyle = styles.CityTile
            break;
          case 3:
            playerCityStyle = styles.CityTile
            break;
          default:
            break;
        }

        switch (city.location) {
          case this.props.TopMiddleCornerId:
            this.topMiddleCorner.push(playerCityStyle)
            break;
          case this.props.TopLeftCornerId:
            this.topLeftCorner.push(playerCityStyle)
            break;
          case this.props.TopRightCornerId:
            this.topRightCorner.push(playerCityStyle)
            break;
          case this.props.BottomLeftCornerId:
            this.bottomLeftCorner.push(playerCityStyle)
            break;
          case this.props.BottomRightCornerId:
            this.bottomRightCorner.push(playerCityStyle)
            break;
          case this.props.BottomMiddleCornerId:
            this.bottomMiddleCorner.push(playerCityStyle)
            break;
          default:
            break;
        }
    })
    }

    this.determineHexCircle = () => {
      this.hexCircleStyle = [styles.HexCircle]
      if (this.props.hasRobber === true) {
        this.hexCircleStyle.push(styles.Robber);
      }
    }
  }

  render() {
    this.determineHexCircle()
    this.determineCornerStyles()
    let corners = <>
      <div className={this.topMiddleCorner.join(' ')} onClick={() => {
        this.props.CornerTopMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopMiddleCornerId)
        this.props.selectCorner(this.props.TopMiddleCornerId)
      }}></div>

      <div className={this.topRightCorner.join(' ')} onClick={() => {
        this.props.CornerTopRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopRightCornerId)
        this.props.selectCorner(this.props.TopRightCornerId)

      }}></div>

      <div className={this.topLeftCorner.join(' ')} onClick={() => {
        this.props.CornerTopLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopLeftCornerId)
        this.props.selectCorner(this.props.TopLeftCornerId)
      }}></div>

      <div className={this.bottomLeftCorner.join(' ')} onClick={() => {
        this.props.CornerBottomLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomLeftCornerId)
        this.props.selectCorner(this.props.BottomLeftCornerId)
      }}></div>

      <div className={this.bottomRightCorner.join(' ')} onClick={() => {
        this.props.CornerBottomRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomRightCornerId)
        this.props.selectCorner(this.props.BottomRightCornerId)
      }}></div>

      <div className={this.bottomMiddleCorner.join(' ')} onClick={() => {
        this.props.CornerBottomMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomMiddleCornerId)
        this.props.selectCorner(this.props.BottomMiddleCornerId)
      }}></div>
    </>

    let edgesTop =
      <>
        <div className={this.topLeftEdge.join(' ')} onClick={() => {
          this.props.EdgeTopLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopLeftEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopLeftCornerId])
          this.props.selectEdge([this.props.TopMiddleCornerId, this.props.TopLeftCornerId])
        }}>
        </div>
        <div className={this.topRightEdge.join(' ')} onClick={() => {
          this.props.EdgeTopRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopRightEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopRightCornerId])
          this.props.selectEdge([this.props.TopMiddleCornerId, this.props.TopRightCornerId])

        }}></div>
        <div className={this.middleLeftEdge.join(' ')} onClick={() => {
          this.props.EdgeMiddleLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleLeftEdgeId)
          console.log([this.props.TopLeftCornerId, this.props.BottomLeftCornerId])
          this.props.selectEdge([this.props.TopLeftCornerId, this.props.BottomLeftCornerId])

        }}></div>

        <div className={this.middleRightEdge.join(' ')} onClick={() => {
          this.props.EdgeMiddleRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleRightEdgeId)
          console.log([this.props.TopRightCornerId, this.props.BottomRightCornerId])
          this.props.selectEdge([this.props.TopRightCornerId, this.props.BottomRightCornerId])
        }}></div>
      </>

    let edgesBottom =
      <>
        <div className={this.bottomLeftEdge.join(' ')} onClick={() => {
          this.props.EdgeBottomLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomLeftEdgeId)
          console.log([this.props.BottomLeftCornerId, this.props.BottomMiddleCornerId])
          this.props.selectEdge([this.props.BottomLeftCornerId, this.props.BottomMiddleCornerId])

        }}></div>

        <div className={this.bottomRightEdge.join(' ')} onClick={() => {
          this.props.EdgeBottomRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomRightEdgeId)
          console.log([this.props.BottomMiddleCornerId, this.props.BottomRightCornerId])
          this.props.selectEdge([this.props.BottomMiddleCornerId, this.props.BottomRightCornerId])

        }}></div>
      </>

    let resourceTypeStyle = [styles.HexIn2]
    switch (this.props.ResourceType) {
      case ('Wood'):
        resourceTypeStyle.push(styles.ForestTile)
        break;
      case ('Brick'):
        resourceTypeStyle.push(styles.BrickTile)
        break;
      case ('Wheat'):
        resourceTypeStyle.push(styles.WheatTile)
        break;
      case ('Ore'):
        resourceTypeStyle.push(styles.RockTile)
        break;
      case ('Sheep'):
        resourceTypeStyle.push(styles.SheepTile)
        break;
      case ('Desert'):
        resourceTypeStyle.push(styles.DesertTile)
        break;
      default:
        break;
    }
    return (
      <div className={this.props.ResourceType === 'Water' ? styles.WaterHex : styles.Hex}>
        {/*
      Edge is roads
      Corner is Houses
      HexInner is the Hex inside
       */}

        {edgesTop}

        <div className={styles.HexInner}>
          <div className={styles.HexIn1}>
            <div className={resourceTypeStyle.join(' ')} onClick={() => {
              console.log(this.props.HexId)
            }}>
            </div>
          </div>
        </div>

        {edgesBottom}

        {this.props.ResourceType === 'Water' ? null : corners}

        {
          this.props.ResourceType === 'Water' ?
            <div className={styles.Port}>
            </div>
            :
            <div className={this.hexCircleStyle.join(' ')} onClick={this.props.HexCircleAction}>
              <p>{this.props.diceNumber}</p>
            </div>
        }
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.lobbyReducer.rooms,
    error: state.lobbyReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectEdge: (selectedEdgeId) => dispatch(gameActions.selectEdge(selectedEdgeId)),
    unselectEdge: () => dispatch(gameActions.unselectEdge()),
    selectCorner: (selectCorner) => dispatch(gameActions.selectCorner(selectCorner)),
    unselectCorner: () => dispatch(gameActions.unselectCorner()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
