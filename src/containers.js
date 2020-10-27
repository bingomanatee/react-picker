import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import ChoiceContext from './ChoiceContext';
import {
  CheckOff, CheckOn, RadioOff, RadioOn,
} from './icons';

export const ChoiceItem = ({
  active, children, onClick,
}) => {
  let Icon;
  const { store } = useContext(ChoiceContext);
  if (active) {
    if (store.my.chooseOne) {
      Icon = RadioOn;
    } else {
      Icon = CheckOn;
    }
  } else if (store.my.chooseOne) {
    Icon = RadioOff;
  } else {
    Icon = CheckOff;
  }
  return (
    <div className="picker__item" active={active} onClick={onClick}>
      <Icon />
      <label>{children}</label>
    </div>
  );
};

ChoiceItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.elementType,
};

export const ChoiceMenu = ({ children }) => (
  <section className="picker__container">
    {children}
  </section>
);

export const ChoiceContainer = ({ Item, ChoiceMenu }) => {
  const { value, store } = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }
  if (!Item) {
    Item = ChoiceItem;
  }

  return (
    <ChoiceMenu>
      {store.my.optionsFilter(value.options, value, store).map((option, i) => {
        const active = value.choices.some((choice) => store.my.comparator(choice, option));
        const label = store.my.optionToLabel(option, i, store);
        return (
          <Item
            key={`${label}_${i}`}
            store={store}
            active={active}
            option={option}
            onClick={() => store.do.chooseOption(option)}
          >
            {label}
          </Item>
        );
      })}
    </ChoiceMenu>
  );
};

ChoiceContainer.propTypes = {
  Item: PropTypes.elementType,
};
