import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './TradeModal.module.css';
import ResourceCard from './ResourceCard/ResourceCard';

const RESOURCES = {
  WOOD: 'WOOD',
  BRICK: 'BRICK',
  SHEEP: 'SHEEP',
  WHEAT: 'WHEAT',
  ORE: 'ORE'
};

class TradeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestAmountWood: 0,
      requestAmountBrick: 0,
      requestAmountSheep: 0,
      requestAmountWheat: 0,
      requestAmountOre: 0,

      availableAmount: 4,

      offerAmountWood: 0,
      offerAmountBrick: 0,
      offerAmountSheep: 0,
      offerAmountWheat: 0,
      offerAmountOre: 0,

      bankTrade: false,
      playerSelected: null,
      playersAccepted: []
    }

    this.determinePlayersAcceptedStyle = () => {
      this.player1Accepted = [styles.Player1, styles.PlayerDisplay];
      this.player2Accepted = [styles.Player2, styles.PlayerDisplay];
      this.player3Accepted = [styles.Player3, styles.PlayerDisplay];
      this.player4Accepted = [styles.Player4, styles.PlayerDisplay];

      this.state.playersAccepted.forEach(() => {
        if (this.state.playerSelected == 1) {
          this.player1Accepted[0] = styles.Player1Accepted;
        }
        if (this.state.playerSelected == 2) {
          this.player2Accepted[0] = styles.Player2Accepted;
        }
        if (this.state.playerSelected == 3) {
          this.player3Accepted[0] = styles.Player3Accepted;
        }
        if (this.state.playerSelected == 4) {
          this.player4Accepted[0] = styles.Player4Accepted;
        }
      })

      this.player1Accepted = this.player1Accepted.join(' ')
      this.player2Accepted = this.player2Accepted.join(' ')
      this.player3Accepted = this.player3Accepted.join(' ')
      this.player4Accepted = this.player4Accepted.join(' ')
    }

    this.selectPlayer = (player) => {
      this.setState({
        ...this.state,
        playerSelected: player,
        bankTrade: false
      })
    }

    this.determinePlayerSelectedStyle = () => {
      this.player1Selected = [];
      this.player2Selected = [];
      this.player3Selected = [];
      this.player4Selected = [];

      switch (this.state.playerSelected) {
        case 1:
          this.player1Selected[0] = styles.Player1Selected;
          break;
        case 2:
          this.player2Selected[0] = styles.Player2Selected;
          break;
        case 3:
          this.player3Selected[0] = styles.Player3Selected;
          break;
        case 4:
          this.player4Selected[0] = styles.Player4Selected;
          break;
        default:
          break;
      }
      this.player1Selected = this.player1Selected.join(' ')
      this.player2Selected = this.player2Selected.join(' ')
      this.player3Selected = this.player3Selected.join(' ')
      this.player4Selected = this.player4Selected.join(' ')
    }

    this.toggleBankTrade = () => {
      this.setState(
        {
          ...this.state,
          bankTrade: !this.state.bankTrade,
          playerSelected: null
        }
      )
    }

    this.determineBankTradeStyle = () => {
      this.bankTrade = [styles.BankTrade];
      this.state.bankTrade ?
        this.bankTrade.push(styles.BankTradeOn) :
        this.bankTrade.push(styles.BankTradeOff);
      this.bankTrade = this.bankTrade.join(' ')
    }

    this.increaseRequest = (resource) => {
      switch (resource) {
        case RESOURCES.WOOD:
          this.setState({
            ...this.state,
            requestAmountWood: this.state.requestAmountWood + 1
          });
          break;
        case RESOURCES.BRICK:
          this.setState({
            ...this.state,
            requestAmountBrick: this.state.requestAmountBrick + 1
          });
          break;
        case RESOURCES.SHEEP:
          this.setState({
            ...this.state,
            requestAmountSheep: this.state.requestAmountSheep + 1
          });
          break;
        case RESOURCES.WHEAT:
          this.setState({
            ...this.state,
            requestAmountWheat: this.state.requestAmountWheat + 1
          });
          break;
        case RESOURCES.ORE:
          this.setState({
            ...this.state,
            requestAmountOre: this.state.requestAmountOre + 1
          });
          break;
        default:
          break;
      }

    }

    this.decreaseRequest = (resource) => {
      switch (resource) {
        case RESOURCES.WOOD:
          if (this.state.requestAmountWood > 0) {
            this.setState({
              ...this.state,
              requestAmountWood: this.state.requestAmountWood - 1
            });
          }
          break;
        case RESOURCES.BRICK:
          if (this.state.requestAmountBrick > 0) {
            this.setState({
              ...this.state,
              requestAmountBrick: this.state.requestAmountBrick - 1
            });
          }
          break;
        case RESOURCES.SHEEP:
          if (this.state.requestAmountSheep > 0) {
            this.setState({
              ...this.state,
              requestAmountSheep: this.state.requestAmountSheep - 1
            });
          }
          break;
        case RESOURCES.WHEAT:
          if (this.state.requestAmountWheat > 0) {
            this.setState({
              ...this.state,
              requestAmountWheat: this.state.requestAmountWheat - 1
            });
          }
          break;
        case RESOURCES.ORE:
          if (this.state.requestAmountOre > 0) {
            this.setState({
              ...this.state,
              requestAmountOre: this.state.requestAmountOre - 1
            });
          }
          break;
        default:
          break;
      }
    }

    this.increaseOffer = (resource) => {
      switch (resource) {
        case RESOURCES.WOOD:
          this.setState({
            ...this.state,
            offerAmountWood: this.state.offerAmountWood + 1
          });
          break;
        case RESOURCES.BRICK:
          this.setState({
            ...this.state,
            offerAmountBrick: this.state.offerAmountBrick + 1
          });
          break;
        case RESOURCES.SHEEP:
          this.setState({
            ...this.state,
            offerAmountSheep: this.state.offerAmountSheep + 1
          });
          break;
        case RESOURCES.WHEAT:
          this.setState({
            ...this.state,
            offerAmountWheat: this.state.offerAmountWheat + 1
          });
          break;
        case RESOURCES.ORE:
          this.setState({
            ...this.state,
            offerAmountOre: this.state.offerAmountOre + 1
          });
          break;
        default:
          break;
      }
    }

    this.decreaseOffer = (resource) => {
      switch (resource) {
        case RESOURCES.WOOD:
          if (this.state.offerAmountWood > 0) {
            this.setState({
              ...this.state,
              offerAmountWood: this.state.offerAmountWood - 1
            });
          }
          break;
        case RESOURCES.BRICK:
          if (this.state.offerAmountBrick > 0) {
            this.setState({
              ...this.state,
              offerAmountBrick: this.state.offerAmountBrick - 1
            });
          }
          break;
        case RESOURCES.SHEEP:
          if (this.state.offerAmountSheep > 0) {
            this.setState({
              ...this.state,
              offerAmountSheep: this.state.offerAmountSheep - 1
            });
          }
          break;
        case RESOURCES.WHEAT:
          if (this.state.offerAmountWheat > 0) {
            this.setState({
              ...this.state,
              offerAmountWheat: this.state.offerAmountWheat - 1
            });
          }
          break;
        case RESOURCES.ORE:
          if (this.state.offerAmountOre > 0) {
            this.setState({
              ...this.state,
              offerAmountOre: this.state.offerAmountOre - 1
            });
          }
          break;
        default:
          break;
      }
    }
  }

  componentDidUpdate() {
  }

  render() {
    this.determineBankTradeStyle();
    this.determinePlayersAcceptedStyle();
    this.determinePlayerSelectedStyle();

    return (
      <>
        <div className={styles.Content}>
          <h1 className={styles.Title}>TRADE</h1>
          <div className={styles.Request}>
            <p className={styles.Title}>Request</p>
            <div className={styles.ResourceCards}>

              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseRequest(RESOURCES.WOOD) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseRequest(RESOURCES.WOOD) }}></div>
                </div>
                <ResourceCard hideAvailableAmount offerAmount={this.state.requestAmountWood} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseRequest(RESOURCES.BRICK) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseRequest(RESOURCES.BRICK) }}></div>
                </div>
                <ResourceCard hideAvailableAmount offerAmount={this.state.requestAmountBrick} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseRequest(RESOURCES.SHEEP) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseRequest(RESOURCES.SHEEP) }}></div>
                </div>
                <ResourceCard hideAvailableAmount offerAmount={this.state.requestAmountSheep} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseRequest(RESOURCES.WHEAT) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseRequest(RESOURCES.WHEAT) }}></div>
                </div>
                <ResourceCard hideAvailableAmount offerAmount={this.state.requestAmountWheat} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseRequest(RESOURCES.ORE) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseRequest(RESOURCES.ORE) }}></div>
                </div>
                <ResourceCard hideAvailableAmount offerAmount={this.state.requestAmountOre} />
              </div>

            </div>
          </div>

          <div className={styles.Offer}>
            <p className={styles.Title}>Offer</p>
            <div className={styles.ResourceCards}>

              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseOffer(RESOURCES.WOOD) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseOffer(RESOURCES.WOOD) }}></div>
                </div>
                <ResourceCard availableAmount={this.state.availableAmount}
                  offerAmount={this.state.offerAmountWood} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseOffer(RESOURCES.BRICK) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseOffer(RESOURCES.BRICK) }}></div>
                </div>
                <ResourceCard availableAmount={this.state.availableAmount}
                  offerAmount={this.state.offerAmountBrick} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseOffer(RESOURCES.SHEEP) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseOffer(RESOURCES.SHEEP) }}></div>
                </div>
                <ResourceCard availableAmount={this.state.availableAmount}
                  offerAmount={this.state.offerAmountSheep} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseOffer(RESOURCES.WHEAT) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseOffer(RESOURCES.WHEAT) }}></div>
                </div>
                <ResourceCard availableAmount={this.state.availableAmount}
                  offerAmount={this.state.offerAmountWheat} />
              </div>
              <div className={styles.CardGroup}>
                <div className={styles.AmountAdjust}>
                  <div className={styles.Add} onClick={() => { this.increaseOffer(RESOURCES.ORE) }}></div>
                  <div className={styles.Minus} onClick={() => { this.decreaseOffer(RESOURCES.ORE) }}></div>
                </div>
                <ResourceCard availableAmount={this.state.availableAmount}
                  offerAmount={this.state.offerAmountOre} />
              </div>
            </div>
          </div>

          <div className={styles.Status}>
            <div className={styles.PlayersResponse}>
              <div className={this.player1Accepted + ' ' + this.player1Selected} onClick={() => {
                this.selectPlayer(1)
              }}></div>
              <div className={this.player2Accepted + ' ' + this.player2Selected} onClick={() => { this.selectPlayer(2) }}></div>
              <div className={this.player3Accepted + ' ' + this.player3Selected} onClick={() => { this.selectPlayer(3) }}></div>
              <div className={this.player4Accepted + ' ' + this.player4Selected} onClick={() => { this.selectPlayer(4) }}></div>
            </div>

            <button className={this.bankTrade} onClick={() => { this.toggleBankTrade()}}>Bank Trade</button>

            <div className={styles.ConfirmTrade} onClick={() => console.log(this.state)}>
              <div className={styles.Accept}></div>
              <div className={styles.Cancel} onClick={this.props.closeTradeModal}></div>
            </div>

          </div>
        </div>

        <div className={styles.Backdrop} onClick={this.props.closeTradeModal}></div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(TradeModal);