import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {applyMiddleware, compose, createStore} from "redux";
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import {Provider} from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
