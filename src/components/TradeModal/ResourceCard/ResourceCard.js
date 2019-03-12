import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ResourceCard.module.css';


class ResourceCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className={styles.Content}>

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