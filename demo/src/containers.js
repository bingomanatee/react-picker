import React, { useContext } from 'react';
import ChoiceContext from './ChoiceContext';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { CheckOff, CheckOn } from "./icons";

const ContainerFrame = styled.section`
text-align: left;
padding: 0.5rem;
max-height: 20rem;
overflow-y: auto;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: stretch;

background: white;
border: 1px solid black;
min-width: 10rem;
`

const ItemRow = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
font-size: 1.25rem;
line-height: max(130%, 35px);
label {
  margin-left: 0.5rem;
  flex: 1;
  padding: 2px 0;
  font-weight: bold;
  color: black;
  font-family: Helvetica Neue, Helvetica, sans-serif;
}
`

export const ChoiceContainer = ({children}) => {
  const {value, store} = useContext(ChoiceContext);

  if (!value) return '';

  const { display } = value;
  if (!display) {
    return '';
  }
  return (
    <ContainerFrame className="picker__choice-container">
      {children}
    </ContainerFrame>
  );
};

export const ChoiceItem = ({option, store}) => {

  return (<ChoiceContext.Consumer>
    {({value, store}) => {
      const {choices} = value;
      const active = choices.some((choice) => {
        return isEqual(choice, option);
      })

      const label = (typeof option === 'string') ? option: option.label;
      const Icon = active ? CheckOn : CheckOff;

      return <ItemRow key={label} onClick={() => store.do.toggleChoice(option)}><Icon /><label>{label}</label></ItemRow>
    }}
  </ChoiceContext.Consumer>)

}
