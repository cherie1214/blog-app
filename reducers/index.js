import auth from './Auth'
import like from './Like'

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  like
})