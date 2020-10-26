/**
 * @format
 */
import { PersistGate } from 'redux-persist/es/integration/react'
import React from 'react';
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import { store, persistor } from './src/store';


const Khulatechapp = () => 

  <Provider store={store}>
    <PersistGate loading ={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>

AppRegistry.registerComponent(appName, () => Khulatechapp);

