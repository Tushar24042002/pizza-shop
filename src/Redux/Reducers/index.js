// reducers/index.js
import { combineReducers } from 'redux';
import formReducer from '../../Modules/Form/FormSlice';

const rootReducer = combineReducers({
  order: formReducer,
});

export default rootReducer;
