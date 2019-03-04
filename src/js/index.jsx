import ReactDom from 'react-dom';
import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import rootReducers from './reducers';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import App from './components/App';


const store = createStore(rootReducers,applyMiddleware(reduxThunk,logger))


ReactDom.render(<Router><Provider store={store}><App /></Provider></Router>,document.querySelector('#app'))
