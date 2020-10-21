import { ValueStoreObject } from '@wonderlandlabs/looking-glass-engine';
import isEqual from 'lodash.isequal';

export default (props) => {
  const state = new ValueStoreObject({
    options: props.options || [], // entire population
    choices: props.choices || [], // chosen items
    display: !!props.display,
    comparator: { isEqual },
  }, {
    actions: {
      toggleChoice(store, option) {
        const isActive = store.my.choices.some((choice) => {
          return store.my.comparator.isEqual(choice, option);
        });
        if (isActive) {
          store.do.setChoices(store.my.choices.filter((choice) => {
            return !store.my.comparator.isEqual(choice, option);
          }));
        } else store.do.setChoices([...store.my.choices, option]);
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
