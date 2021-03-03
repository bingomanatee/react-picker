/* eslint-disable react/destructuring-assignment */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from './ChoiceContainer';
import Menu from './ChoiceMenu';
import Item from './ChoiceItem';
import ChoiceContext from './ChoiceContext';
import Empty from './EmptyMessage';
import storeFactory from './storeFactory';
import StopEvents from './StopEvents';
import Void from './Void';
import Closer from './Closer';
import asLabel from './defaultOptionToLabel';
import asChoice from './defaultOptionToChoice';

const defaultComponents = {
  ChoiceItem: Item,
  ChoiceMenu: Menu,
  EmptyMessage: Empty,
  ChoiceContainer: Container,
  Header: Void,
  Footer: Void,
};

const Picker = (props) => {
  const [store, setStore] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const newStore = storeFactory(props);
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

  const {
    display, options, comparator, filterOptions, optionDisabled,
  } = props;

  /**
   * These effects synchronize any updating of settings passed in from properties
   * into the store instasnce
   */
  useEffect(() => {
    if (!store) return;
    if ('display' in props) {
      if ((!!props.display) !== (!!store.my.display)) {
        store.do.setDisplay(!!props.display);
      }
    }
  }, [display, store]);

  /**
   * @TODO: reset custom functions to default if properties change
   * from a passed-in parameter to absent or invalid parameter
   */

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
    if (store && (typeof optionDisabled === 'function')) {
      store.do.setOptionDisabled(optionDisabled);
    }
  }, [optionDisabled, store]);

  useEffect(() => {
    if (store && (typeof filterOptions === 'function')) {
      store.do.setFilterOptions(filterOptions);
    }
  }, [filterOptions, store]);

  // get the fundamental rendering blocks --
  // or if not provided by props, the default stock tags provided by react-picker
  const {
    ChoiceContainer, ChoiceMenu, ChoiceItem, EmptyMessage, ChoiceItemIcon, ChoiceItemLabel,
    Header, Footer,
  } = {
    ...defaultComponents, ...props,
  };

  if (!(store && value)) {
    return '';
  }

  const inner = (store) => {
    if (!store.my.display) return '';
    return store.my.closeOnClick ? (
      <Closer store={store}>
        <ChoiceContainer
          ChoiceItemIcon={ChoiceItemIcon}
          ChoiceItemLabel={ChoiceItemLabel}
          ChoiceItem={ChoiceItem}
          ChoiceMenu={ChoiceMenu}
          EmptyMessage={EmptyMessage}
        />
      </Closer>
    )
      : (
        <ChoiceContainer
          ChoiceItemIcon={ChoiceItemIcon}
          ChoiceItemLabel={ChoiceItemLabel}
          ChoiceItem={ChoiceItem}
          ChoiceMenu={ChoiceMenu}
          EmptyMessage={EmptyMessage}
        />
      );
  };
  return (
    <ChoiceContext.Provider value={{ value, store }}>
      <StopEvents>
        {Header ? <Header store={store} value={value} /> : ''}
        {(typeof props.children === 'function') ? props.children({ value, store }) : props.children}
        {inner(store, value)}
        {Footer ? <Footer store={store} value={value} /> : ''}
      </StopEvents>
    </ChoiceContext.Provider>
  );
};

Picker.propTypes = {
  // injected components
  Header: PropTypes.any,
  Footer: PropTypes.any,
  ChoiceContainer: PropTypes.any,
  ChoiceItem: PropTypes.any,
  ChoiceItemLabel: PropTypes.any,
  ChoiceItemIcon: PropTypes.any,
  ChoiceMenu: PropTypes.any,
  EmptyMessage: PropTypes.any,

  // store values
  options: PropTypes.arrayOf(PropTypes.any),
  choices: PropTypes.arrayOf(PropTypes.any), // used (if present) in storeFactory
  display: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  chooseOne: PropTypes.bool,
  filterOptions: PropTypes.func,
  comparator: PropTypes.func,
  optionToLabel: PropTypes.func,
  optionToChoice: PropTypes.func,
  optionDisabled: PropTypes.func,

  // listeners
  onChoices: PropTypes.func,
  onStore: PropTypes.func,

  // content
  children: PropTypes.any,
};

Picker.defaultProps = {
  options: [],
  closeOnClick: true,
  display: false,
  chooseOne: false,
  onStore: null,
  onChoices: null,
  optionToLabel: asLabel,
  optionToChoice: asChoice,
};

export default Picker;
