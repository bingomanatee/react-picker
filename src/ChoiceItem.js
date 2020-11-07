import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import {
  CheckOff, CheckOn, RadioOff, RadioOn,
} from './icons';

const ChoiceItem = ({
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
  children: PropTypes.any,
  onClick: PropTypes.func,
};

ChoiceItem.defaultProps = {
  active: false,
};

export default ChoiceItem;
