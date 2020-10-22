import { ValueStoreObject } from '@wonderlandlabs/looking-glass-engine';
import isEqual from 'lodash.isequal';

export default (props) => {
  const state = new ValueStoreObject({
    options: props.options || [], // entire population
    choices: props.choices || [], // chosen items
    display: !!props.display,
    chooseOne: !!props.chooseOne,
    comparator: { isEqual },
  }, {
    actions: {
      chooseOption(store, option) {
        if (store.my.chooseOne) {
          store.do.setChoices([option]);
          return;
        }
        store.do.toggleOption(option);
      },
      toggleOption(store, option) {
        const isActive = store.my.choices.some((choice) => store.my.comparator.isEqual(choice, option));
        if (isActive) {
          if (store.my.chooseOne) {
            store.do.setChoices([]);
          } else {
            store.do.setChoices(store.my.choices.filter((choice) => !store.my.comparator.isEqual(choice, option)));
          }
        } else if (store.my.chooseOne) {
          store.do.setChoices([option]);
        } else {
          store.do.setChoices([...store.my.choices, option]);
        }
      },
      toggleDisplay(store) {
        store.do.setDisplay(!store.my.display);
      },
      addAll(store) {
        store.do.setChoices([...store.my.options]);
      },
      remAll(store) {
        store.do.setChoices([]);
      },
    },
  });

  return state;
};
