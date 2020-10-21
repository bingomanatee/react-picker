import React, { useState, useEffect } from 'react';

import ChoiceContext from './ChoiceContext';
import choiceState from './choiceState';

import * as defaultContainers from './containers';

export default (props) => {
  const [store, setStore] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const newStore = choiceState(props);
    setStore(newStore);
    const sub = newStore.subscribe(setValue, (err) => console.log('error:', err));
    let cSub;
    if (props.onChoices) {
      cSub = newStore.watch('choices')
        .subscribe(({choices}) => props.onChoices(choices))
    }

    return () => {
      sub.unsubscribe();
      if (cSub) cSub.unsubscribe();
    }
  },

  []);

  if (!(store && value)) {
    return '';
  }

  const { ChoiceContainer, ChoiceItem } = { ...defaultContainers, ...props };

  return (
    <ChoiceContext.Provider value={{
      value, store
    }}>
      {props.children}
      <ChoiceContainer>
        {value.options.map((option) => (<ChoiceItem store={store} option={option}>
        </ChoiceItem>))}
      </ChoiceContainer>
    </ChoiceContext.Provider>
  );
};
