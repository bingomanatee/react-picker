import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import ChoiceItem from './ChoiceItem';
import EmptyMessage from './EmptyMessage';

const ChoiceContainer = ({ Item, ChoiceMenu, EmptyMessage: Empty }) => {
  const { value, store } = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }
  if (!Item) {
    Item = ChoiceItem;
  }

  const displayedOptions = store.my.optionsFilter(value.options, value, store);

  if (!(displayedOptions && displayedOptions.length)) {
    return (
      <ChoiceMenu>
        { Empty ? <Empty onClick={() => store.do.setDisplay(false)}>No Choices</Empty>
          : <EmptyMessage>--- no choices ---</EmptyMessage>}
      </ChoiceMenu>
    );
  }

  return (
    <ChoiceMenu>
      {displayedOptions.map((option, i) => {
        const active = value.choices.some((choice) => store.my.comparator(choice, option));
        const label = store.my.optionToLabel(option, i, store);
        return (
          <Item
            key={`${label}_${i}`}
            store={store}
            active={active}
            option={option}
            onClick={() => store.do.chooseOption(option)}
          >
            {label}
          </Item>
        );
      })}
    </ChoiceMenu>
  );
};

ChoiceContainer.propTypes = {
  Item: PropTypes.elementType,
};

export default ChoiceContainer;
