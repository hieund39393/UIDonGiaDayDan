import currentUser from './currentUser';
import module from './module';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    currentUser,
    module,
});

export default rootReducer;
