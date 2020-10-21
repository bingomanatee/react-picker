import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChoiceContext from './ChoiceContext';
import choiceState from './choiceState';

import * as defaultContainers from './containers';

const Picker = (props) => {
  const [store, setStore] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const newStore = choiceState(props);
    if (props.onStore) { // extend store
      props.onStore(newStore);
    }
    setStore(newStore);
    const sub = newStore.subscribe(setValue, (err) => console.log('error:', err));
    let cSub;
    if (props.onChoices) {
      cSub = newStore.watch('choices')
        .subscribe(({ choices }) => props.onChoices(choices));
    }

    return () => {
      sub.unsubscribe();
      if (cSub) cSub.unsubscribe();
    };
  },

  []);

  if (!(store && value)) {
    return '';
  }

  const { ChoiceContainer, ChoiceItem } = { ...defaultContainers, ...props };

  return (
    <ChoiceContext.Provider value={{ value, store }}>
      {props.children}
      <ChoiceContainer Item={ChoiceItem} />
    </ChoiceContext.Provider>
  );
};

Picker.propTypes = {
  ChoiceContainer: PropTypes.elementType,
  ChoiceItem: PropTypes.elementType,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    label: PropTypes.string,
  })])),
  onChoices: PropTypes.func,
  onStore: PropTypes.func,
};

Picker.defaultProps = {
  options: []
}

export default Picker;
