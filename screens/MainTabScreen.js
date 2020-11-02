import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';
import SitesScreen from './SitesScreen';
import TicketScreen from './TicketScreen';
import InventoryScreen from './InventoryScreen';

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const TicketStack = createStackNavigator();
const SitesStack = createStackNavigator();
const InventoryStack = createStackNavigator();

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
          tabBarColor: '#129ed9',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarColor: '#129ed9',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Sites"
        component={SitesStackScreen}
        options={{
          tabBarLabel: 'SitesScreen',
          tabBarColor: '#129ed9',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketStackScreen}
        options={{
          tabBarLabel: 'Ticket',
          tabBarColor: '#129ed9',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
     
      
      <Tab.Screen
        name="Inventory"
        component={InventoryStackScreen}
        options={{
          tabBarLabel: 'Inventory',
          tabBarColor: '#129ed9',
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
        backgroundColor: '#129ed9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#129ed9" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const NotificationsStackScreen = ({navigation}) => (
<NotificationsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#129ed9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#129ed9" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</NotificationsStack.Navigator>
);
  
const TicketStackScreen = ({navigation}) => (
  <TicketStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#129ed9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <TicketStack.Screen name="Ticket" component={TicketScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#129ed9" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </TicketStack.Navigator>
  );
  const SitesStackScreen = ({navigation}) => (
    <SitesStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#129ed9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <SitesStack.Screen name="SitesScreen" component={SitesScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#129ed9" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </SitesStack.Navigator>
    );
    
    const InventoryStackScreen = ({navigation}) => (
      <InventoryStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#129ed9',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <InventoryStack.Screen name="Inventory" component={InventoryScreen} options={{
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#129ed9" onPress={() => navigation.openDrawer()}></Icon.Button>
              )
              }} />
      </InventoryStack.Navigator>
    );
   