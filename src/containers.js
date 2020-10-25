import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

export const ChoiceContainer = ({ Item }) => {
  const { value, store } = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }
  if (!Item) {
    Item = ChoiceItem;
  }
  const filteredOptions = store.my.filterOptions(value.options);

  return (
    <section className="picker__container">
      {filteredOptions.map((option) => {
        const active = value.choices.some((choice) => store.my.comparator(choice, option));
        const label = (typeof option === 'string') ? option : option.label;
        return (
          <Item store={store} active={active} option={option} onClick={() => store.do.chooseOption(option)}>
            {label}
          </Item>
        );
      })}
    </section>
  );
};

ChoiceContainer.propTypes = {
  Item: PropTypes.elementType,
};
