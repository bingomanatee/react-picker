import React, { useContext, useState } from 'react';
import ChoiceContext from "./ChoiceContext";


export default (props) => {
  const {value, store} = useContext(ChoiceContext);
  return (
    <div>
      <button onClick={store.do.toggleDisplay}>
        {store.my.display ? 'Hide' : 'Show'} Options
      </button>
      {store.my.display ? (
        <>
          <button onClick={store.do.addAll}>All</button>
          <button onClick={store.do.remAll}>None</button>
        </>
      ) : ''}
    </div>
  );
}
