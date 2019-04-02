import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CreateNewRoom.module.css';
import CreateNewRoomForm from '../CreateNewRoomForm/CreateNewRoomForm';
import * as createNewRoomActions from '../../store/actions/createNewRoom';

import history from '../../history';

const views = {
  CREATE_ROOM: 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS: 'SIGN_UP_SUCCESS'
};

class CreateNewRoom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view: views.CREATE_ROOM
    }

    this.changeView = (view) => {
      if (view in views) {
        this.setState({ view: view });
      }
    }
  }

  componentDidMount() {
    if (this.props.createNewRoomError === false && this.state.view !== views.CREATE_ROOM_SUCCESS) {
      this.changeView(views.CREATE_ROOM_SUCCESS);

    } else if (this.props.createNewRoomError === null && this.state.view !== views.CREATE_ROOM_SUCCESS) {
      console.log('checking createNewRoomError')
      console.log(this.props.createNewRoomError)
      this.changeView(views.CREATE_ROOM);
    }
  }

  componentDidUpdate() {
    if (this.props.createNewRoomError === false && this.state.view !== views.CREATE_ROOM_SUCCESS) {
      this.changeView(views.SIGN_UP_SUCCESS);

    } else if (this.props.createNewRoomError === null && this.state.view === views.CREATE_ROOM_SUCCESS) {
      console.log('checking createNewRoomError')
      console.log(this.props.createNewRoomError)
      this.changeView(views.CREATE_ROOM);
    }

    if (this.props.createNewRoomError === false && this.props.createNewRoomLoading === false) {
      this.props.closeModal();
      this.props.resetCreateNewRoomReducer();
      // history.push('/Console');
    } else if (this.props.createNewRoomError === true && this.props.isOpen !== true) {
      this.props.openModal();
    }
  }

  render() {
    console.log('this.props.createNewRoomError: ', this.props.createNewRoomError)
    console.log('this.props.createNewRoomLoading: ', this.props.createNewRoomLoading)

    let attachedClasses = styles.Close;
    if (this.props.isOpen) {
      attachedClasses = styles.Open;
    }

    let errorMessage = <span className={styles.errorMessage}>{this.props.createNewRoomErrorMessage}</span>;

    if (this.props.createNewRoomError === true && this.state.view === views.CREATE_ROOM) {
      errorMessage = <span className={styles.errorMessage}>{this.props.createNewRoomErrorMessage}</span>;
    }

    let header = 'Create New Room';
    let span = <span>Not a member? Sign Up!</span>;
    
    let form = <CreateNewRoomForm onInitCreateNewRoom={this.props.onInitCreateNewRoom} />;

    if (this.state.view === views.CREATE_ROOM) {
      form = <CreateNewRoomForm onInitCreateNewRoom={this.props.onInitCreateNewRoom} loading={this.props.createNewRoomLoading} />;

    } else if (this.state.view === views.CREATE_ROOM_SUCCESS) {
      form =
        <div className={styles.SignUpSuccess}>
          <p>Successfully Created Room!</p>
          <button onClick={() => {
            this.props.closeModal();
            this.props.resetCreateNewRoomReducer();
          }}>Got it!</button>
        </div>
      span = null;
      header = 'Create New Room Success';
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
    createNewRoomErrorMessage: state.createNewRoomReducer.errorMessage,
    createNewRoomError: state.createNewRoomReducer.error,
    createNewRoomLoading: state.createNewRoomReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitCreateNewRoom: (roomName) => dispatch(createNewRoomActions.initCreateNewRoom(roomName)),
    resetCreateNewRoomReducer: () => dispatch(createNewRoomActions.createNewRoomReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(CreateNewRoom);
