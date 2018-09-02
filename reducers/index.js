import auth from './Auth';
import article from './Article';
import notification from './Notification'

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  article,
  notification,
})