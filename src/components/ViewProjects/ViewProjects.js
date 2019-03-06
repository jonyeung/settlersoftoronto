import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ViewProjects.module.css';
import * as projectActions from '../../store/actions/projects';
import Project from '../Project/Project';

class ViewProjects extends Component {

  componentDidMount() {
    this.props.onInitProjects();
  }

  render() {
    return (
      <div className={styles.Background}>
        <div className={styles.OngoingProjects}>
          <h1>View Projects</h1>
          <section className={styles.Wrap}>
            {this.props.error ? <p>Error loading projects</p> : null}
            {this.props.projects.map((item) => {
              return <Project key={item.project.title} title={item.project.title} description={item.project.description} img={item.project.imgs[0]} projectInfo={item.project}/>
            })}
          </section>
        </div>
      </div>


    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projectsReducer.projects,
    error: state.projectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProjects: () => dispatch(projectActions.initProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ViewProjects);