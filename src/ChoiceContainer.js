/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import ChoiceItem from './ChoiceItem';
import EmptyMessage from './EmptyMessage';
import ChoiceMenu from './ChoiceMenu';

const ChoiceContainer = ({
  ChoiceItem = ChoiceItem,
  ChoiceMenu = ChoiceMenu,
  EmptyMessage = EmptyMessage,
  ChoiceItemIcon,
  ChoiceItemLabel,
}) => {
  const { value, store } = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }

  const displayedOptions = store.my.optionsFilter(value.options, value, store);

  if (!(displayedOptions && displayedOptions.length)) {
    return (
      <ChoiceMenu>
        <EmptyMessage onClick={() => store.do.setDisplay(false)}>No Choices</EmptyMessage>
      </ChoiceMenu>
    );
  }

  return (
    <ChoiceMenu displayedOptions={displayedOptions}>
      {displayedOptions.map((option, i) => {
        const active = value.choices.some((choice) => store.my.comparator(choice, option));
        const label = store.my.optionToLabel(option, i, store);
        return (
          <ChoiceItem
            key={`${label}_${i}`}
            store={store}
            active={active}
            option={option}
            ChoiceItemIcon={ChoiceItemIcon}
            ChoiceItemLabel={ChoiceItemLabel}
            disabled={store.my.optionDisabled(option, i, store)}
            onClick={() => store.do.chooseOption(option)}
          >
            {store.my.optionToLabel(option, i, store)}
          </ChoiceItem>
        );
      })}
    </ChoiceMenu>
  );
};

ChoiceContainer.propTypes = {
  ChoiceItem: PropTypes.any,
  ChoiceMenu: PropTypes.any,
  EmptyMessage: PropTypes.any,
};

ChoiceContainer.defaultProps = {
  ChoiceItem,
  EmptyMessage,
  ChoiceMenu,
};

export default ChoiceContainer;
