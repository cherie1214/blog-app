import auth from './Auth';
import article from './Article';
import notification from './Notification'
import feed from './Feed'

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  article,
  notification,
  feed,
})