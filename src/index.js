import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import LandingPage from './components/landingPage/LandingPage';
import Header from './components/header/Header';
import CarDetails from './components/carDetails/CarDetails';

import './index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                <Header title="Blinkster"></Header>
                <Route exact path="/" component={ LandingPage } />
                <Route path="/cars/:year/:make/:model" component={ CarDetails } />
            </div>
        </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
