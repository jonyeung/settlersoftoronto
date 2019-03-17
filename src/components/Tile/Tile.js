import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Tile.module.css';

class Tile extends Component {

  render() {
    let corners = <>
      <div className={styles.CornerTopMiddle} onClick={() => {
        this.props.CornerTopMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopMiddleCornerId)
      }}></div>

      <div className={styles.CornerTopRight} onClick={() => {
        this.props.CornerTopRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopRightCornerId)
      }}></div>

      <div className={styles.CornerTopLeft} onClick={() => {
        this.props.CornerTopLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.TopLeftCornerId)

      }}></div>

      <div className={styles.CornerBottomLeft} onClick={() => {
        this.props.CornerBottomLeftAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomLeftCornerId)

      }}></div>

      <div className={styles.CornerBottomRight} onClick={() => {
        this.props.CornerBottomRightAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomRightCornerId)
      }}></div>

      <div className={styles.CornerBottomMiddle} onClick={() => {
        this.props.CornerBottomMiddleAction()
        this.props.displayCornerBuildOptions()
        console.log(this.props.BottomMiddleCornerId)
      }}></div>
    </>

    let edgesTop =
      <>
        <div className={styles.EdgeTopLeft} onClick={() => {
          this.props.EdgeTopLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopLeftEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopLeftCornerId])
        }}>
        </div>
        <div className={styles.EdgeTopRight} onClick={() => {
          this.props.EdgeTopRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.TopRightEdgeId)
          console.log([this.props.TopMiddleCornerId, this.props.TopRightCornerId])
        }}></div>
        <div className={styles.EdgeMiddleLeft} onClick={() => {
          this.props.EdgeMiddleLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleLeftEdgeId)
          console.log([this.props.TopLeftCornerId, this.props.BottomLeftCornerId])
        }}></div>

        <div className={styles.EdgeMiddleRight} onClick={() => {
          this.props.EdgeMiddleRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.MiddleRightEdgeId)
          console.log([this.props.TopRightCornerId, this.props.BottomRightCornerId])
        }}></div>
      </>

    let edgesBottom =
      <>
        <div className={styles.EdgeBottomLeft} onClick={() => {
          this.props.EdgeBottomLeftAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomLeftEdgeId)
          console.log([this.props.BottomLeftCornerId, this.props.BottomMiddleCornerId])          
        }}></div>

        <div className={styles.EdgeBottomRight} onClick={() => {
          this.props.EdgeBottomRightAction()
          this.props.displayEdgeBuildOptions()
          console.log(this.props.BottomRightEdgeId)
          console.log([this.props.BottomMiddleCornerId, this.props.BottomRightCornerId])
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

        { edgesBottom }

    { this.props.ResourceType === 'Water' ? null : corners }
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

export default connect(mapStateToProps)(Tile);
