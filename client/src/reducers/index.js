import { combineReducers } from 'redux';

import code from './codeReducer';
import user from './userReducer';
import component from './componentReducer';

export default combineReducers({
  code,
  user,
  component
});
