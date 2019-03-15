import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Tile.module.css';

class Tile extends Component {

  render() {
    let corners = <>
      <div className={styles.CornerTopMiddle} onClick={console.log()}></div>

      <div className={styles.CornerTopRight} onClick={()=>{
        this.props.CornerTopRightAction()
        this.props.displayCornerBuildOptions()
        }}></div>

      <div className={styles.CornerTopLeft} onClick={()=>{
        this.props.CornerTopLeftAction()
        this.props.displayCornerBuildOptions()
        }}></div>

      <div className={styles.CornerBottomLeft} onClick={()=>{
        this.props.CornerBottomLeftAction()
        this.props.displayCornerBuildOptions()
        }}></div>

      <div className={styles.CornerBottomRight} onClick={()=>{
        this.props.CornerBottomRightAction()
        this.props.displayCornerBuildOptions()
        }}></div>

      <div className={styles.CornerBottomMiddle} onClick={()=>{
        this.props.CornerBottomMiddleAction()
        this.props.displayCornerBuildOptions()
        }}></div>
    </>

    let edgesTop =
      <>
        <div className={styles.EdgeTopLeft} onClick={() => {
          this.props.EdgeTopLeftAction()
          this.props.displayEdgeBuildOptions()
        }}>
        </div>
        <div className={styles.EdgeTopRight} onClick={() => {
          this.props.EdgeTopRightAction()
          console.log(this.props)
          this.props.displayEdgeBuildOptions()
        }}></div>
        <div className={styles.EdgeMiddleLeft} onClick={() => {

          this.props.EdgeMiddleLeftAction()
          this.props.displayEdgeBuildOptions()
        }}></div>

        <div className={styles.EdgeMiddleRight} onClick={() => {
          this.props.EdgeMiddleRightAction()
          this.props.displayEdgeBuildOptions()
        }}></div>
      </>

    let edgesBottom =
      <>
        <div className={styles.EdgeBottomLeft} onClick={() => {
          this.props.EdgeBottomLeftAction()
          this.props.displayEdgeBuildOptions()
        }}></div>

        <div className={styles.EdgeBottomRight} onClick={() => {
          this.props.EdgeBottomRightAction()
          this.props.displayEdgeBuildOptions()
        }}></div>
      </>


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
            <div className={[styles.HexIn2, styles.ForestTile].join(' ')}>
            </div>
          </div>
        </div>

        {edgesBottom}

        {this.props.ResourceType === 'Water' ? null : corners}
        {this.props.ResourceType === 'Water' ?
          <div className={styles.Port}>
          </div>
          :
          <div className={styles.HexCircle} onClick={this.props.HexCircleAction}>
            <p>5</p>
          </div>}
      </div>
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
