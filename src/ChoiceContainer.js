import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChoiceContext from './ChoiceContext';
import ChoiceItem from './ChoiceItem';
import EmptyMessage from './EmptyMessage';
import ChoiceMenu from './ChoiceMenu';

const ChoiceContainer = ({ Item = ChoiceItem, Menu = ChoiceMenu, Empty = EmptyMessage() }) => {
  const { value, store } = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }

  const displayedOptions = store.my.optionsFilter(value.options, value, store);

  if (!(displayedOptions && displayedOptions.length)) {
    return (
      <Menu>
        <Empty onClick={() => store.do.setDisplay(false)}>No Choices</Empty>
      </Menu>
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
            {store.my.optionToLabel(option, i, store)}
          </Item>
        );
      })}
    </ChoiceMenu>
  );
};

ChoiceContainer.propTypes = {
  Item: PropTypes.elementType,
  Empty: PropTypes.elementType,
  Menu: PropTypes.elementType,
};

ChoiceContainer.defaultProps = {
  Item: ChoiceItem,
  Empty: EmptyMessage,
  Menu: ChoiceMenu,
};

export default ChoiceContainer;
