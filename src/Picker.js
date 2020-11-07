/* eslint-disable react/destructuring-assignment */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChoiceContainer from './ChoiceContainer';
import ChoiceMenu from './ChoiceMenu';
import ChoiceItem from './ChoiceItem';
import ChoiceContext from './ChoiceContext';
import EmptyMessage from './EmptyMessage';
import choiceState from './choiceState';
import StopEvents from './StopEvents';

import Closer from './Closer';

const Picker = (props) => {
  const [store, setStore] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const newStore = choiceState(props);
    if (props.onStore) { // extend store
      props.onStore(newStore);
    }
    setStore(newStore);
    const sub = newStore.subscribe(setValue, (err) => console.log('picker store error:', err));
    let cSub;

    // broadcast choices to the onChoices callbback if it exists
    if (props.onChoices) {
      cSub = newStore.watch('choices')
        .subscribe(({ choices }) => props.onChoices(choices));
    }

    return () => {
      sub.unsubscribe();
      if (cSub) cSub.unsubscribe();
      newStore.complete();
    };
  },
  []);

  // inject properties into store
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

  // get the fundamental rendering blocks --
  // or if not provided by props, the default stock tags provided by react-picker
  const {
    ChoiceContainer: Container, ChoiceMenu: Menu, ChoiceItem: Item, EmptyMessage: Empty,
  } = {
    ChoiceItem, ChoiceMenu, ChoiceContainer, EmptyMessage, ...props,
  };

  if (!(store && value)) {
    return '';
  }

  const inner = (store) => {
    if (!store.my.display) return '';
    return store.my.closeOnClick ? (
      <Closer store={store}>
        <Container Item={Item} ChoiceMenu={Menu} EmptyMessage={Empty} />
      </Closer>
    )
      : (
        <Container Item={Item} ChoiceMenu={Menu} EmptyMessage={Empty} />
      );
  };
  return (
    <ChoiceContext.Provider value={{ value, store }}>
      <StopEvents>
        {(typeof props.children === 'function') ? props.children({ value, store }) : props.children}
        {inner(store, value)}
      </StopEvents>
    </ChoiceContext.Provider>
  );
};

Picker.propTypes = {
  ChoiceContainer: PropTypes.elementType,
  ChoiceItem: PropTypes.elementType,
  ChoiceMenu: PropTypes.elementType,
  EmptyMessage: PropTypes.elementType,
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
  closeOnClick: PropTypes.bool,
};

const NOOP = (prop) => prop;

Picker.defaultProps = {
  options: [],
  closeOnClick: false,
  display: false,
  chooseOne: false,
  onStore: null,
  onChoices: null,
};

export default Picker;
