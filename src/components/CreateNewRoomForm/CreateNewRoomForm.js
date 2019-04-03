import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import styles from './CreateNewRoomForm.module.css';

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

let CreateNewRoomForm = props => {
  const { handleSubmit } = props;

  const submit = (values) => {
    let error = {};
    let isError = false;

    if (!('roomName' in values)) {
      error.roomName = 'Required';
      isError = true;
    }

    if (values.roomName !== undefined && values.roomName.length < 6) {
      error.roomName = 'Must be at least 6 characters';
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      console.log('Valid Submission');
      console.log(values);
      props.onInitCreateNewRoom(values.roomName, props.username, props.uid);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.Form}>
      <Field
        name="roomName"
        type="text"
        component={renderField}
        label="Room Name"
      />
      {props.error && <strong>{props.error}</strong>}
      <button className={props.loading ? [styles.SubmitButton, styles.SubmitButtonLoading].join(' ') : styles.SubmitButton} type="submit" disabled={props.loading}>
        {props.loading ? 'Loading' : 'Create'}
      </button>
    </form>
  )
}

CreateNewRoomForm = reduxForm({
  // a unique name for the form
  form: 'CreateNewRoomForm'
})(CreateNewRoomForm)


export default CreateNewRoomForm;