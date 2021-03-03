import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckOff, CheckOn, RadioOff, RadioOn,
} from './icons';

const ChoiceItemIcon = ({ active, chooseOne }) => {
  if (active) {
    if (chooseOne) {
      return <RadioOn />;
    }
    return <CheckOn />;
  }

  if (chooseOne) {
    return <RadioOff />;
  }

  return <CheckOff />;
};

ChoiceItemIcon.propTypes = {
  chooseOne: PropTypes.bool,
  active: PropTypes.bool,
};

ChoiceItemIcon.defaultProps = {
  active: false,
  chooseOne: false,
};

export default ChoiceItemIcon;
