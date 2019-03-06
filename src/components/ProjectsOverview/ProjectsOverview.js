import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectsOverview.module.css';
import Project from '../Project/Project';
import Project1Img from '../../assests/images/tempLogo.png';
import * as featuredProjectsActions from '../../store/actions/featuredProjects';

class ProjectsOverview extends Component {

  componentDidMount() {
    this.props.onInitFeaturedProjects();
  }

  render() {

    return (
      <div className={styles.Background} >
        <div className={styles.OngoingProjects}>
          <h1>Featured Projects</h1>
          <section className={styles.Wrap}>
            {this.props.featuredProjects.map((featuredProject) => {
              return <Project key={featuredProject.title} title={featuredProject.title} description={featuredProject.description} img={featuredProject.imgs[0]} projectInfo={featuredProject} />
            }) }
        </section>
        </div>
      </div>


    )
  }
}

const mapStateToProps = state => {
  return {
    featuredProjects: state.featuredProjectsReducer.projects,
    error: state.featuredProjectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFeaturedProjects: () => dispatch(featuredProjectsActions.initFeaturedProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ProjectsOverview);