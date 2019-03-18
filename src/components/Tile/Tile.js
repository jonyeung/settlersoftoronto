import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Tile.module.css';
import * as gameActions from '../../store/actions/game';


class Tile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      topLeftCornerStyle: [styles.CornerTopLeft],
      topMiddleCorner: [styles.CornerTopMiddle],
      topRightCorner: [styles.CornerTopRight],
      bottomLeftCorner: [styles.CornerBottomLeft],
      bottomMiddleCorner: [styles.CornerBottomMiddle],
      bottomRightCorner: [styles.CornerBottomRight],
      topLeftCorner: [styles.EdgeTopLeft],
      topRightEdge: [styles.EdgeTopRight],
      middleLeftEdge: [styles.EdgeMiddleLeft],
      middleRightEdge: [styles.EdgeMiddleRight],
      bottomLeftEdge: [styles.EdgeBottomLeft],
      bottomRightEdge: [styles.EdgeBottomRight]
    }


    this.determineCornerStyles = () => {

    }
  }

  render() {
    let corners = <>
      <div className={this.state.topMiddleCorner.join(' ')} onClick={() => {
        this.props.CornerTopMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopMiddleCornerId)
        this.props.selectCorner(this.props.TopMiddleCornerId)
      }}></div>

      <div className={this.state.topRightCorner.join(' ')} onClick={() => {
        this.props.CornerTopRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopRightCornerId)
        this.props.selectCorner(this.props.TopRightCornerId)

      }}></div>

      <div className={this.state.topLeftCornerStyle.join(' ')} onClick={() => {
        this.props.CornerTopLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopLeftCornerId)
        this.props.selectCorner(this.props.TopLeftCornerId)
      }}></div>

      <div className={this.state.bottomLeftCorner.join(' ')} onClick={() => {
        this.props.CornerBottomLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomLeftCornerId)
        this.props.selectCorner(this.props.BottomLeftCornerId)
      }}></div>

      <div className={this.state.bottomRightCorner.join(' ')} onClick={() => {
        this.props.CornerBottomRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomRightCornerId)
        this.props.selectCorner(this.props.BottomRightCornerId)
      }}></div>

      <div className={this.state.bottomMiddleCorner.join(' ')} onClick={() => {
        this.props.CornerBottomMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomMiddleCornerId)
        this.props.selectCorner(this.props.BottomMiddleCornerId)
      }}></div>
    </>

    let edgesTop =
      <>
        <div className={this.state.topLeftCorner.join(' ')} onClick={() => {
          this.props.EdgeTopLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopLeftEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopLeftCornerId])
          this.props.selectEdge([this.props.TopMiddleCornerId, this.props.TopLeftCornerId])
        }}>
        </div>
        <div className={this.state.topRightEdge.join(' ')} onClick={() => {
          this.props.EdgeTopRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopRightEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopRightCornerId])
          this.props.selectEdge([this.props.TopMiddleCornerId, this.props.TopRightCornerId])

        }}></div>
        <div className={this.state.middleLeftEdge.join(' ')} onClick={() => {
          this.props.EdgeMiddleLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleLeftEdgeId)
          console.log([this.props.TopLeftCornerId, this.props.BottomLeftCornerId])
          this.props.selectEdge([this.props.TopLeftCornerId, this.props.BottomLeftCornerId])

        }}></div>

        <div className={this.state.middleRightEdge.join(' ')} onClick={() => {
          this.props.EdgeMiddleRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleRightEdgeId)
          console.log([this.props.TopRightCornerId, this.props.BottomRightCornerId])
          this.props.selectEdge([this.props.TopRightCornerId, this.props.BottomRightCornerId])
        }}></div>
      </>

    let edgesBottom =
      <>
        <div className={this.state.bottomLeftEdge.join(' ')} onClick={() => {
          this.props.EdgeBottomLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomLeftEdgeId)
          console.log([this.props.BottomLeftCornerId, this.props.BottomMiddleCornerId])
          this.props.selectEdge([this.props.BottomLeftCornerId, this.props.BottomMiddleCornerId])

        }}></div>

        <div className={this.state.bottomRightEdge.join(' ')} onClick={() => {
          this.props.EdgeBottomRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomRightEdgeId)
          console.log([this.props.BottomMiddleCornerId, this.props.BottomRightCornerId])
          this.props.selectEdge([this.props.BottomMiddleCornerId, this.props.BottomRightCornerId])

        }}></div>
      </>

    let resourceTypeStyle = [styles.HexIn2]
    switch (this.props.ResourceType) {
      case ('FOREST'):
        resourceTypeStyle.push(styles.ForestTile)
        break;
      case ('BRICK'):
        resourceTypeStyle.push(styles.BrickTile)
        break;
      case ('WHEAT'):
        resourceTypeStyle.push(styles.WheatTile)
        break;
      case ('ORE'):
        resourceTypeStyle.push(styles.RockTile)
        break;
      case ('SHEEP'):
        resourceTypeStyle.push(styles.SheepTile)
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
            <div className={styles.HexCircle} onClick={this.props.HexCircleAction}>
              <p>5</p>
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
