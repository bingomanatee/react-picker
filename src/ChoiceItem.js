import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import {
  CheckOff, CheckOn, RadioOff, RadioOn,
} from './icons';

const ChoiceItem = ({
  active, children, onClick, disabled,
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
    <div
      className="picker__item"
      active={active}
      onClick={(...args) => {
        if (!disabled) onClick(...args);
      }}
    >
      <Icon />
      <label>{children}</label>
    </div>
  );
};

ChoiceItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ChoiceItem.defaultProps = {
  active: false,
  disabled: false,
};

export default ChoiceItem;
