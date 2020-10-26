import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';
import SitesScreen from './SitesScreen';
import ProfileScreen from './ProfileScreen';
import BookmarkScreen from './BookmarkScreen';
import SettingScreen from './SettingsScreen';
import SupportScreen from './SupportScreen';

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SitesStack = createStackNavigator();
const BookmarkStack = createStackNavigator();
const SettingStack = createStackNavigator();
const SupportStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SitesScreen"
        component={SitesStackScreen}
        options={{
          tabBarLabel: 'SitesScreen',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="settings"
        component={SettingStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="support"
        component={SupportStackScreen}
        options={{
          tabBarLabel: 'support',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>   
  
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Overview',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const NotificationsStackScreen = ({navigation}) => (
<NotificationsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</NotificationsStack.Navigator>
);
  
const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#694fad" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </ProfileStack.Navigator>
  );
  const SitesStackScreen = ({navigation}) => (
    <SitesStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#d02860',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <SitesStack.Screen name="SitesScreen" component={SitesScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </SitesStack.Navigator>
    );
    const BookmarkStackScreen = ({navigation}) => (
      <BookmarkStack.Navigator name ="Bookmark" screenOptions={{
              headerStyle: {
              backgroundColor: '#d02860',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <BookmarkStack.Screen name="Bookmark" component={BookmarkScreen} options={{
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
              )
              }} />
      </BookmarkStack.Navigator>
    );
    const SettingStackScreen = ({navigation}) => (
      <SettingStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#d02860',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <SettingStack.Screen name="Settings" component={SettingScreen} options={{
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
              )
              }} />
      </SettingStack.Navigator>
    );
    const SupportStackScreen = ({navigation}) => (
      <SupportStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#d02860',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <SupportStack.Screen name="Support" component={SupportScreen} options={{
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
              )
              }} />
      </SupportStack.Navigator>);