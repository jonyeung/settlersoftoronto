import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ContactUs.module.css';
import ContactUsForm from '../ContactUsForm/ContactUsForm';

class ContactUs extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.ContactUs}>
          <ContactUsForm /> 
          <div className={styles.ContactUsFormDecorator}>
            <p>Hey! Do you have an interesting idea to share with the world? Let us know all about it!</p>
            <p>We will respond as soon as possible!</p>
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

export default connect(mapStateToProps)(ContactUs);