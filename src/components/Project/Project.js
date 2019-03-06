import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';

import styles from './Project.module.css';

class Project extends Component {

  routeProjectFullDetail = () => {
    history.push('/ProjectFullDetail?projectTitle=' + this.props.projectInfo.title);
  }

  render() {

    return (
      <div className={styles.Box}>
        <div>
          <img onClick={this.routeProjectFullDetail} src={this.props.img} alt="Project Logo"></img>
        </div>
        <div className={styles.Content}>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <button className={styles.ViewProject} onClick={this.routeProjectFullDetail}>View Project</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(Project);
