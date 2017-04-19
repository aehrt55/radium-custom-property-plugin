import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import TestComponent from './TestComponent';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <StyleRoot className={styles.app}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button id="button">click me</button>
        <TestComponent id="testComponent" />
      </StyleRoot>
    );
  }
}

export default App;
