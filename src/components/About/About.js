import React, { Component } from 'react';
import LongInfo from '../LongInfo/LongInfo';
import styles from './About.module.css';
import { connect } from 'react-redux';

class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const header = 'About Us'
    const info = `In exercitation id id ad. Tempor laborum exercitation do magna minim commodo dolor commodo qui velit adipisicing irure quis. Sit et dolor exercitation cupidatat ex incididunt in aliqua. Cupidatat cupidatat veniam anim tempor adipisicing enim ea pariatur commodo ea cupidatat excepteur exercitation officia. Quis exercitation sit minim reprehenderit commodo ad. Esse consectetur voluptate culpa culpa eiusmod qui ut deserunt. Laborum do adipisicing ex labore minim non sit laborum officia reprehenderit.Anim velit consectetur ullamco veniam. Exercitation irure sunt deserunt aute pariatur et commodo ea irure id ea velit commodo. Veniam consectetur ex excepteur fugiat officia exercitation id incididunt ullamco exercitation. Do nostrud quis ad sint pariatur consectetur dolore ad labore velit ullamco pariatur qui. Commodo culpa id deserunt commodo sunt. Ex mollit ex voluptate cillum.
    In exercitation id id ad. Tempor laborum exercitation do magna minim commodo dolor commodo qui velit adipisicing irure quis. Sit et dolor exercitation cupidatat ex incididunt in aliqua. Cupidatat cupidatat veniam anim tempor adipisicing enim ea pariatur commodo ea cupidatat excepteur exercitation officia. Quis exercitation sit minim reprehenderit commodo ad. Esse consectetur voluptate culpa culpa eiusmod qui ut deserunt. Laborum do adipisicing ex labore minim non sit laborum officia reprehenderit.Anim velit consectetur ullamco veniam. Exercitation irure sunt deserunt aute pariatur et commodo ea irure id ea velit commodo. Veniam consectetur ex excepteur fugiat officia exercitation id incididunt ullamco exercitation. Do nostrud quis ad sint pariatur consectetur dolore ad labore velit ullamco pariatur qui. Commodo culpa id deserunt commodo sunt. Ex mollit ex voluptate cillum.Tempor laborum exercitation do magna minim commodo dolor commodo qui velit adipisicing irure quis. Sit et dolor exercitation cupidatat ex incididunt in aliqua. Cupidatat cupidatat veniam anim tempor adipisicing enim ea pariatur commodo ea cupidatat excepteur exercitation officia.`
  
    return (
      <div className={styles.Content}>
        <LongInfo header={header} text={info}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(About);