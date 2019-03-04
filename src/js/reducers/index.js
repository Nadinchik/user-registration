import {combineReducers} from 'redux';
import testReducer from './testReducer';

const rootReducers = combineReducers({
    test:testReducer
})

export default rootReducers