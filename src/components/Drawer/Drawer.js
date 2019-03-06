import React from 'react';
import styles from './Drawer.module.css';
import { NavLink } from 'react-router-dom';

const Drawer = (props) => {
  let attachedClasses = [styles.Drawer, styles.Close];
  if (props.isOpen) {
      attachedClasses = [styles.Drawer, styles.Open];
  }

  const loginOnClick = () => {
    props.closeDrawer();
    props.toggleLoginModal();
  }
  return (
    <>
      {props.isOpen ? <div className={styles.Background} onClick={props.closeDrawer}></div> : null}
      <div className={attachedClasses.join(' ')}>
        <div className={styles.ItemsGroup}>
          <a onClick={loginOnClick}>Login</a>      
        </div>
      </div>
    </>
  )
}

export default Drawer;