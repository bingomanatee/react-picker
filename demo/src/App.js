import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MyTrigger from './MyTrigger';

import Picker from "./Picker";

function App() {
  const [choices, setChoices] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a basic demo of Picker, an open mulit-select
          UI. In the spirit of React-table it is a control system
          with an inventory of choices taken from options; how you
          lay out the display is up to you.
        </p>
        <a
          className="App-link"
          href="#"
          rel="noopener noreferrer"
        >
          Picker
        </a>
        <div>
          Choices: {choices.join(', ')}
        </div>
        <Picker onChoices={setChoices} prompt={"choose your favorite greek letter"}
          options={[
          'able',
          'baker',
          'gamma'
        ]}>
          <MyTrigger />
        </Picker>
      </header>
    </div>
  );
}

export default App;
