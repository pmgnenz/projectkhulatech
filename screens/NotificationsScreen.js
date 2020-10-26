import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
import errorScreen from './notifications/errorScreen';
import infoScreen from './notifications/infoScreen';
import warningScreen from './notifications/warningScreen';
const MaterialTopTabs = createMaterialTopTabNavigator();



const NotificationsScreen = ({navigation}) => {
return (
  <MaterialTopTabs.Navigator>
  <MaterialTopTabs.Screen
    name="Errors"
    component={errorScreen}
    options={{ tabBarLabel: 'ERRORS' }}
  />
  <MaterialTopTabs.Screen
    name="Warnings"
    component={warningScreen}
    options={{ tabBarLabel: 'Warnings' }}
  />
  <MaterialTopTabs.Screen
    name="Infos"
    component={infoScreen}
    options={{ tabBarLabel: 'INFOS' }}
  />
</MaterialTopTabs.Navigator>   
  
    );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    infos: state.appReducer.infoList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotificationsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
