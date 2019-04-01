import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Login.module.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import * as signUpActions from '../../store/actions/signUp';
import * as signInActions from '../../store/actions/signIn';

import history from '../../history';

const views = {
  LOGIN: 'LOGIN',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS'
};

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view: views.LOGIN
    }

    this.changeView = (view) => {
      if (view in views) {
        this.setState({ view: view });
      }
    }
  }

  componentDidMount() {
    if (this.props.signUpError === false && this.state.view !== views.SIGN_UP_SUCCESS) {
      this.changeView(views.SIGN_UP_SUCCESS);

    } else if (this.props.signUpError === null && this.state.view !== views.SIGN_UP_SUCCESS) {
      console.log('checking signUpError')
      console.log(this.props.signUpError)
      this.changeView(views.LOGIN);
    }
  }

  componentDidUpdate() {
    if (this.props.signUpError === false && this.state.view !== views.SIGN_UP_SUCCESS) {
      this.changeView(views.SIGN_UP_SUCCESS);

    } else if (this.props.signUpError === null && this.state.view === views.SIGN_UP_SUCCESS) {
      console.log('checking signUpError')
      console.log(this.props.signUpError)
      this.changeView(views.LOGIN);
    }

    if (this.props.signInError === false && this.props.signInLoading === false) {
      this.props.closeLoginModal();
      this.props.resetSignInReducer();
      // history.push('/Console');
    } else if (this.props.signInError === true && this.props.isOpen !== true) {
      this.props.openLoginModal();
    }
  }

  render() {
    console.log('this.props.signInError: ', this.props.signInError)
    console.log('this.props.signInLoading: ', this.props.signInLoading)

    let attachedClasses = styles.Close;
    if (this.props.isOpen) {
      attachedClasses = styles.Open;
    }

    let errorMessage = <span className={styles.errorMessage}>{this.props.signUpErrorMessage}</span>;

    if (this.props.signInError === true && this.state.view === views.LOGIN) {
      errorMessage = <span className={styles.errorMessage}>{this.props.signInErrorMessage}</span>;
    }

    let header = 'Sign In';
    let span = <span>Not a member? Sign Up!</span>;
    let form = <LoginForm onInitSignIn={this.props.onInitSignIn} />;

    if (this.state.view === views.LOGIN) {
      form = <LoginForm onInitSignIn={this.props.onInitSignIn} loading={this.props.signInLoading} />;
      span = <span onClick={() => this.changeView(views.SIGN_UP)}>Not a member? Sign Up!</span>;
      header = 'Sign In'

    } else if (this.state.view === views.SIGN_UP) {
      form = <SignUpForm onInitSignUp={this.props.onInitSignUp} loading={this.props.signUpLoading} />
      span = <span onClick={() => this.changeView(views.LOGIN)}>Already a member? Login!</span>;
      header = 'Sign Up';

    } else if (this.state.view === views.SIGN_UP_SUCCESS) {
      form =
        <div className={styles.SignUpSuccess}>
          <p>Successfully Signed Up!</p>
          <p>Please check your email to verify your email address.</p>
          <button onClick={() => {
            this.props.closeLoginModal();
            this.props.resetSignUpReducer();
          }}>Got it!</button>
        </div>
      span = null;
      header = 'Sign Up Success';
    }

    return (
      <div className={attachedClasses}>
        <div className={styles.darkOverlay} onClick={this.props.closeLoginModal}></div>
        <div className={styles.Content}>
          <h1>{header} {span} {errorMessage}</h1>
          {form}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signUpErrorMessage: state.signUpReducer.errorMessage,
    signUpError: state.signUpReducer.error,
    signUpLoading: state.signUpReducer.loading,

    signInErrorMessage: state.signInReducer.errorMessage,
    signInError: state.signInReducer.error,
    signInLoading: state.signInReducer.loading,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitSignUp: (email, password) => dispatch(signUpActions.initSignUp(email, password)),
    onInitSignIn: (email, password) => dispatch(signInActions.initSignIn(email, password)),
    resetSignUpReducer: () => dispatch(signUpActions.signUpReset()),
    resetSignInReducer: () => dispatch(signInActions.signInReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Login);
