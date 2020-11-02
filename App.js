/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import { connect } from 'react-redux';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import StockScreen from './screens/InventoryScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { AuthContext } from './components/context';
import BackgroundTimer from 'react-native-background-timer';
import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import { deleteInfo } from './src/actions/infos';

const Drawer = createDrawerNavigator();

const App = (props) => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    firstname: null,
    secondname: null,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
 // const name = props.infos["firstname"];
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(UserT,UserTid,UserN,id,email,firstn,lastn) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      console.log("USERRRRRRR", UserT)
      console.log("USERRRRRRR2", UserN)
      console.log(UserTid)
      console.log(props.infos)
      const userToken = String(UserT)
      const userTokenid = UserTid
      const userName = UserN
      const userid = id
      const useremail = email
      const firstname = firstn
      const lastname  = lastn
      
      try {
        await AsyncStorage.setItem('userToken',userToken );
        await AsyncStorage.setItem('userTokenid', userTokenid);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userid', userid);
        await AsyncStorage.setItem('useremail', useremail);
        await AsyncStorage.setItem('firstname', firstname);
        await AsyncStorage.setItem('lastname', lastname);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
      
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      const xauth = await AsyncStorage.getItem('userToken')
      BackgroundTimer.stopBackgroundTimer();
      const authtokenid = await AsyncStorage.getItem('userTokenid')
      console.log("logout ",props.infos);
      try {
        await fetch(`https://khulatechsolutions.unmsapp.com/nms/api/v2.1/token/${authtokenid}`,{
                    method:'DELETE',
                    headers:{
                        accept:'application/json',
                        'x-auth-token': xauth
                    }
                    })
                    .then(res => res.json())
                    .then(res => {
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        await AsyncStorage.clear();
        console.log("logout ",props.infos);
       // props.delete();
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
   // <Provider store={store}>
     // <PersistGate loading={null} persistor={persistor}>

    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => < DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="StockScreen" component={StockScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
   // </PersistGate>
   // </Provider>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    infos: state.appReducer.infoList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: () => dispatch(deleteInfo())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
//connect(mapStateToProps)(DrawerContent);