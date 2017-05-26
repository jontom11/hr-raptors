import { combineReducers } from 'redux';

import code from './codeReducer';
import user from './userReducer';

export default combineReducers({
  code,
  user
});
