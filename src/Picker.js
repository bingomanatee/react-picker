/* eslint-disable react/destructuring-assignment */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChoiceContext from './ChoiceContext';
import choiceState from './choiceState';
import StopEvents from './StopEvents';

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

  const {
    display, options, comparator, filterOptions,
  } = props;

  useEffect(() => {
    if (!store) return;
    if ('display' in props) {
      if ((!!props.display) !== (!!store.my.display)) {
        store.do.setDisplay(!!props.display);
      }
    }
  }, [display, store]);

  useEffect(() => {
    if (store && Array.isArray(props.options)) {
      store.do.setOptions(props.options);
    }
  }, [options, store]);

  useEffect(() => {
    if (store && (typeof comparator === 'function')) {
      store.do.setComparator(comparator);
    }
  }, [comparator, store]);

  useEffect(() => {
    if (store && (typeof filterOptions === 'function')) {
      store.do.setFilterOptions(filterOptions);
    }
  }, [filterOptions, store]);

  const { ChoiceContainer, ChoiceMenu, ChoiceItem } = { ...defaultContainers, ...props };

  if (!(store && value)) {
    return '';
  }
  return (
    <ChoiceContext.Provider value={{ value, store }}>
      <StopEvents>
        {props.children}
        <ChoiceContainer Item={ChoiceItem} ChoiceMenu={ChoiceMenu} />
      </StopEvents>
    </ChoiceContext.Provider>
  );
};

Picker.propTypes = {
  ChoiceContainer: PropTypes.elementType,
  ChoiceItem: PropTypes.elementType,
  ChoiceMenu: PropTypes.elementType,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    label: PropTypes.string,
  })])),
  onChoices: PropTypes.func,
  onStore: PropTypes.func,
  display: PropTypes.bool,
  chooseOne: PropTypes.bool,
  filterOptions: PropTypes.func,
  comparator: PropTypes.func,
  optionToLabel: PropTypes.func,
  optionToChoice: PropTypes.func,
  children: PropTypes.any,
};

Picker.defaultProps = {
  options: [],
};

export default Picker;
