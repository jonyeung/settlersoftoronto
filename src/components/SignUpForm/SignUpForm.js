import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import styles from './SignUpForm.module.css';
import axios from '../../axios-projects';

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

let SignUpForm = props => {

  const { handleSubmit } = props;

  const submit = (values) => {
    let error = {};
    let isError = false;

    if (!('email' in values)) {
      error.email = 'Required';
      isError = true;
    }

    if (!('password' in values)) {
      error.password = 'Required';
      isError = true;
    }

    if (!('confirmPassword' in values)) {
      error.confirmPassword = 'Required';
      isError = true;
    }

    if ('password' in values && 'confirmPassword' in values && values.password !== values.confirmPassword) {
      error.password = 'Does not match confirm password';
      error.confirmPassword = 'Does not match password';
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      props.onInitSignUp(values.email, values.password);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.Form}>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <Field
        name="confirmPassword"
        type="password"
        component={renderField}
        label="Confirm Password"
      />
      {props.error && <strong>{props.error}</strong>}
      <button className={props.loading ? [styles.SubmitButton, styles.SubmitButtonLoading].join(' ') : styles.SubmitButton} type="submit" disabled={props.loading}>
        {props.loading ? 'Loading' : 'Submit'}
      </button>
    </form>
  )
}

SignUpForm = reduxForm({
  // a unique name for the form
  form: 'SignUpForm'
})(SignUpForm)

export default SignUpForm;