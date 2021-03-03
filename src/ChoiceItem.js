import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import DefaultLabel from './DefaultLabel';
import DefaultChoiceItemIcon from './DefaultChoiceItemIcon';

const ChoiceItem = ({
  active,
  children,
  onClick,
  option,
  disabled,
  ChoiceItemIcon = DefaultChoiceItemIcon,
  ChoiceItemLabel,
}) => {
  const Icon = ChoiceItemIcon;
  const Label = ChoiceItemLabel || DefaultLabel;
  const { store } = useContext(ChoiceContext);
  const { chooseOne } = store.my;

  return (
    <div
      className="picker__item"
      active={active}
      disabled={disabled}
      onClick={(...args) => {
        if (!disabled) onClick(...args);
      }}
    >
      <Icon
        chooseOne={chooseOne}
        active={active}
        disabled={disabled}
        option={option}
      />
      <Label
        active={active}
        disabled={disabled}
        option={option}
      >
        {children}
      </Label>
    </div>
  );
};

ChoiceItem.propTypes = {
  DefaultLabel: PropTypes.any,
  DefaultIcon: PropTypes.any,
  active: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  iconOn: PropTypes.any,
  iconOff: PropTypes.any,
};

ChoiceItem.defaultProps = {
  active: false,
  disabled: false,
  iconOn: null,
  iconOff: null,
};

export default ChoiceItem;
