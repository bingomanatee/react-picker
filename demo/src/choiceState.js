import { ValueStoreMap, ValueStoreObject } from '@wonderlandlabs/looking-glass-engine';
import isEqual from 'lodash/isEqual'

export default (props) => {
  const state = new ValueStoreObject({
    options: props.options || [], // entire population
    choices: props.choices || [], // chosen items
    display: !!props.display,
  }, {
    actions: {
      toggleChoice(store, option) {
        const isActive = store.my.choices.some(choice => isEqual(choice, option));
        if (isActive) {
          store.do.setChoices(store.my.choices.filter(choice => !isEqual(choice, option)));
        }
        else store.do.setChoices([...store.my.choices, option])
      },
      toggleDisplay(store) {
        store.do.setDisplay(!store.my.display);
      },
      addAll(store) {
        store.do.setChoices([...store.my.options])
      },
      remAll(store) {
        store.do.setChoices([])
      }
    }
  });

  return state;
};
