import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPageContainer from './containers/LandingPageContainer';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Blinkster"/>
        <LandingPageContainer />
      </div>
    );
  }
}

export default App;
