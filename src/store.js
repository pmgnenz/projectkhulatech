import { createStore, combineReducers } from 'redux';
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({
  appReducer: appReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;