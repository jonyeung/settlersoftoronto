import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import styles from './ContactUsForm.module.css';

// const  { DOM: { textarea } } = React;

let ContactUsForm = props => {
  const { handleSubmit } = props;

  const submit = (values) => {
    let error = {};
    let isError = false;

    if(!('firstName' in values)) {
      error.firstName = 'Required';
      isError = true;
    }

    if(!('lastName' in values)) {
      error.lastName = 'Required';
      isError = true;
    }

    if(!('program' in values)) {
      error.program = 'Required';
      isError = true;
    }
    
    if(!('yearOfStudy' in values)) {
      error.yearOfStudy = 'Required';
      isError = true;
    }

    if(!('email' in values)) {
      error.email = 'Required';
      isError = true;
    }

    if(!('message' in values)) {
      error.message = 'Required';
      isError = true;
    }

    if(isError) {
      throw new SubmissionError(error);
    } else {
      console.log('Valid Submission');
      console.log(values);
    }
  }

  const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className={styles.Field}>
      <label>{label}</label>

      {
        label === 'Message' ?
        <textarea className={styles.Message} {...input} placeholder={label} type={type} />
        :
        <input className={styles.Regular} {...input} placeholder={label} type={type} />
      }

      {touched && error && <span>{error}</span>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.Form}>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <Field
        name="program"
        type="text"
        component={renderField}
        label="Program"
      />
      <Field
        name="yearOfStudy"
        type="text"
        component={renderField}
        label="Year Of Study"
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      <Field
        name="message"
        type="textarea"
        component={renderField}
        label="Message"
      />
      {props.error && <strong>{props.error}</strong>}
      <button className={styles.SubmitButton} type="submit" disabled={props.submitting}>
        Submit
      </button>
    </form>
  )
}

ContactUsForm = reduxForm({
  // a unique name for the form
  form: 'ContactUsForm'
})(ContactUsForm)


export default ContactUsForm;