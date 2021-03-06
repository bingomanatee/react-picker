import { ValueObjectStream, addActions, ValueStream } from '@wonderlandlabs/looking-glass-engine';
import isEqual from 'lodash.isequal';

const defaultOptionToLabel = (option) => {
  if (typeof option === 'string' || typeof option === 'number') return option;
  if (typeof option === 'object') {
    if ('label' in option) return option.label;
    if (typeof option.toString === 'function') return option.toString();
  }
  return `${option}`;
};

const defaultOptionToChoice = (option) => option;
const defaultOptionsFilter = (list) => ([...list]);
const defaultOptionDisabled = () => false;

const f = (target, name, defaultValue) => {
  if (target && (typeof target[name] === 'function')) {
    return target[name];
  }
  return defaultValue;
};

export default (props = {}) => {
  const optionsFilter = f(props, 'optionsFilter', defaultOptionsFilter);
  const optionToChoice = f(props, 'optionToChoice', defaultOptionToChoice);
  const comparator = f(props, 'comparator', isEqual);
  const optionToLabel = f(props, 'optionToLabel', defaultOptionToLabel);
  const optionDisabled = f(props, 'optionDisabled', defaultOptionDisabled);
  const options = props.options || [];
  const choices = props.choices || [];

  const state = addActions(new ValueObjectStream({
    options, // entire population
    choices, // chosen items
    display: !!props.display,
    chooseOne: !!props.chooseOne,
    comparator,
    optionsFilter,
    optionToChoice,
    optionToLabel,
    optionDisabled,
    closeOnClick: !!props.closeOnClick,
  }), {
    /**
       * adds (or removes) a choice into the choices based on an option
       *  note - there is no filtering/consequence for adding an option that
       * is not in the options.
       */
    chooseOption(store, option) {
      if (store.my.chooseOne) {
        const choice = store.my.optionToChoice(option);
        store.do.setChoices([choice]);
        return;
      }
      store.do.toggleOption(option);
    },
    /**
       * adds an option - but unlike chooseOption, doesn't remove it if its already present
       */
    addOption(store, option) {
      const newChoice = store.my.optionToChoice(option);
      if (store.my.chooseOne) {
        store.do.setChoices([newChoice]);
        return;
      }
      const isActive = store.my.choices.some((choice) => store.my.comparator(choice, newChoice));
      if (!isActive) {
        store.do.setChoices([...store.my.choices, newChoice]);
      }
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
  });

  state.addFieldSubject('options', new ValueStream(options));
  state.addFieldSubject('choices', new ValueStream(choices));

  return state;
};
