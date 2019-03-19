import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GamePlayerToolBar.module.css';
import PlayerCard from './PlayerCard/PlayerCard';

class GamePlayerToolBar extends Component {

  constructor(props) {
    super(props)

    this.playerProps = (playerNum) => {
      if(this.props.players.length >= playerNum) {
        return {
          LongestRoadLength: this.props.players[playerNum - 1].LongestRoadLength,
          Owns3For1Port: this.props.players[playerNum - 1].Owns3For1Port,
          OwnsBrickPort: this.props.players[playerNum - 1].OwnsBrickPort,
          OwnsLargestArmy: this.props.players[playerNum - 1].OwnsLargestArmy,
          OwnsOrePort: this.props.players[playerNum - 1].OwnsOrePort,
          OwnsSheepPort: this.props.players[playerNum - 1].OwnsSheepPort,
          OwnsWheatPort: this.props.players[playerNum - 1].OwnsWheatPort,
          OwnsWoodPort: this.props.players[playerNum - 1].OwnsWoodPort,
          VictoryPoints: this.props.players[playerNum - 1].VictoryPoints,
          devCards: this.props.players[playerNum - 1].devCards,
          knightsPlayed: this.props.players[playerNum - 1].knightsPlayed,
          resources: this.props.players[playerNum - 1].resources,
          username: this.props.players[playerNum - 1].username
        }
      } else {
        return {
          notLoaded: true
        }
      }
    }
  }

  render() {
    console.log('gameReducer: ', this.props.gameReducer)

    return (
      <div className={styles.Content}>
        <PlayerCard {...this.playerProps(1)}></PlayerCard>
        {this.props.players[1] ? <PlayerCard {...this.playerProps(2)}></PlayerCard> : null}
        {this.props.players[2] ? <PlayerCard {...this.playerProps(3)}></PlayerCard> : null}
        {this.props.players[3] ? <PlayerCard {...this.playerProps(4)}></PlayerCard> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.gameReducer.players,
    gameReducer: state.gameReducer

  };
};

export default connect(mapStateToProps)(GamePlayerToolBar);