import React from 'react';
import Title from '../../ATOMS/Shared-A/Title-A/Title';
import Button from '../../ATOMS/UI-A/Button-A/Button';
import Filters from '../../MOLECULES/Discover-M/Filters-M/Filters';

import * as u from '../../../shared/Utility';
import c from './Header.module.scss';

const header = (props) => {
  const { context, headerTitle } = props;
  let classNames = [c.Header];

  let filters = null;
  if(context === 'discover') {
    classNames.push(c.Header__Discover);
    filters = (
      <Filters 
        stateKey={props.stateKey}
        applyFilters={props.applyFilters}
        inputChanged={props.updateInputValue}
        filters={props.filters} />
    );
  }

  let buttons = null;
  let fineprint = null;
  if(context === 'login') {
    classNames.push(c.Header__Login);

    if(u.isObjNotEmpty(props.buttons)) {
      buttons = [];
      Object.entries(props.buttons).forEach(([key, button]) => {
        if(button.inputConfig.type === 'link') {
          buttons.push(
            <Button 
              key={key}
              href={button.inputConfig.href}
              target='_blank'
              isLink
              context={context}
              text={button.value} />
          )
        } else {
          buttons.push(
            <Button
              key={key}
              btnClicked={props.btnClicked}
              text={button.value}
              context={context}
              buttonArgs={button.inputConfig} />
          );
        }
      });
      
      if(props.fineprint) {
        fineprint = (
          <p className={c.Header__Fineprint}>{props.fineprint.value}</p>
        );
      }

      buttons = (
        <div className={c.Header__Login_Buttons}>
          {buttons}
        </div>
      )
    }
  }

  return (
    <header className={classNames.join(' ')}>
      <Title title={headerTitle} context={context} />
      {filters}
      {buttons}
      {fineprint}
    </header>
  );
}
 
export default header;