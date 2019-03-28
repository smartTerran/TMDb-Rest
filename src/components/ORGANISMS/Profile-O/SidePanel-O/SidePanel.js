import React from 'react';

import User from '../../../MOLECULES/Profile-M/User-M/User';
import Button from '../../../ATOMS/UI-A/Button-A/Button';
import c from './SidePanel.module.scss';

const sidePanel = (props) => {  
  return (
    <div className={c.SidePanel}>
      <div className={c.SidePanel__Group}>
        <User
          userName={props.userName}
          name={props.name}
          isGuest={props.isGuest} />
        <Button
          context='logout'
          btnClicked={props.logout}
          text='Logout' />
      </div>
    </div>
  );
}
 
export default sidePanel;