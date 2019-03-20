import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ResourceCard.module.css';


class ResourceCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let resource = [styles.Content] 
    switch(this.props.resource){
      case ("Wood"):
        resource.push(styles.Wood)
        break;
      case("Sheep"):
        resource.push(styles.Sheep)
        break;
      case("Rock"):
        resource.push(styles.Rock)
        break;
      case("Brick"):
        resource.push(styles.Brick)
        break;
      case("Wheat"):
        resource.push(styles.Wheat)
        break;
      default:
        break;
    }
    return (
      <div className={resource.join(' ')}>

        <div className={styles.OfferAmount}>
          <p className={styles.Amount}>{this.props.offerAmount}</p>
        </div>

        {
          this.props.hideAvailableAmount ? null :
            <div className={styles.AvailableAmount}>
              <p className={styles.Amount}>{this.props.availableAmount}</p>
            </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(ResourceCard);