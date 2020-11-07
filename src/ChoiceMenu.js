import React from 'react';
import PropTypes from 'prop-types';

const ChoiceMenu = ({ children }) => (
  <section className="picker__container">
    {children}
  </section>
);

ChoiceMenu.propTypes = {
  children: PropTypes.any,
};

export default ChoiceMenu;
