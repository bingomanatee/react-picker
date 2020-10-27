import { ValueStoreObject, ValueStream } from '@wonderlandlabs/looking-glass-engine';
import isEqual from 'lodash.isequal';
import listenForPointers from './listenForPointers';

const f = (target, name, defaultValue) => {
  if (target && typeof target[name] === 'function') {
    return target[name];
  }
  return defaultValue;
};

export default (props = {}) => {
  const state = new ValueStoreObject({
    options: props.options || [], // entire population
    choices: props.choices || [], // chosen items
    display: !!props.display,
    chooseOne: !!props.chooseOne,
    comparator: f(props, 'comparator', isEqual), // will be superseded by stream
    optionsFilter: f(props, 'optionsFilter', (list) => ([...list])), // will be superseded by stream
    optionToChoice: f(props, 'optionsToChoice', (option) => option), // if you want the choice to be different than the options

    // these are touch trackers; used only if listenToTouch is true:
    listeningForPointers: false,
  }, {
    actions: {
      chooseOption(store, option) {
        /**
         * adds a choice into the choices based on an option
         *  note - there is no filtering/consequence for adding an option that
         * is not in the options.
         */
        if (store.my.chooseOne) {
          const choice = store.my.optionToChoice(option);
          store.do.setChoices([choice]);
          return;
        }
        store.do.toggleOption(option);
      },
      toggleOption(store, option) {
        const newChoice = store.my.optionToChoice(option);

        const isActive = store.my.choices.some((choice) => store.my.comparator(choice, newChoice));
        if (isActive) {
          if (store.my.chooseOne) {
            store.do.setChoices([]);
          } else {
            // remove choices that equate to how we would store the option
            store.do.setChoices(store.my.choices.filter((choice) => !store.my.comparator(choice, newChoice)));
          }
        } else if (store.my.chooseOne) {
          store.do.setChoices([newChoice]);
        } else {
          store.do.setChoices([...store.my.choices, newChoice]);
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

  /**
   * create streams that reject bad values in which to store selected columns
   */

  const compStream = new ValueStream(isEqual);
  compStream.preprocess((value) => {
    if (typeof value !== 'function') throw new Error('comparator only accepts functions');
    return value;
  });
  state.addStream('comparator', compStream);

  const optionsFilterStream = new ValueStream((list) => ([...list]));
  optionsFilterStream.preprocess((value) => {
    if (typeof value !== 'function') throw new Error('comparator only accepts functions');
    return value;
  });
  state.addStream('optionsFilter', optionsFilterStream);

  const optionToChoice = new ValueStream((option) => option);
  optionToChoice.preprocess((value) => {
    if (typeof value !== 'function') throw new Error('comparator only accepts functions');
    return value;
  });
  state.addStream('optionToChoice', optionToChoice);

  if (props.listenForPointers) {
    listenForPointers(state);
    state.do.setListeningForTouch(true);
  }

  return state;
};
