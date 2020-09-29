/**
 * @format
 */
import React from 'react';
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import configureStore from './src/store';

const store = configureStore();

const Khulatechapp = () =>
  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent(appName, () => Khulatechapp);

