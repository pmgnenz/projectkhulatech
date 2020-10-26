import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
import sites from './sites/sites';
import inactive from './sites/Inactive';
import disconnected from './sites/Disconnected';
import { Addsites, Deletesites } from '../src/actions/infos';
const MaterialTopTabs = createMaterialTopTabNavigator();

const SitesScreen = (props,{navigation}) => {

  const [data, setData] = React.useState({
    Token: '9fb192dc-423b-45c9-b55b-94166b66c9f0',  //props.infos.userToken || 0,
    loading: false,
    error: null,
    refreshing: false,
    done: true
});

useEffect(() => {
makeRemoteRequest();
}, []);

makeRemoteRequest = () => {
//const { page, seed } = this.state; 
// console.log("useeffectffffssssssssssssssssssssssssssssssssssssssss")
props.delete()
setData({
  ...data,
  loading: true,
  done: false
});

fetch("https://khulatechsolutions.unmsapp.com/nms/api/v2.1/sites",{
  method:'GET',
  headers:{
      accept:'application/json',
      'Content-Type': 'application/json',
       'x-auth-token': data.Token
  }})
  .then(res => res.json())
  .then(res => {
    console.log("res  hhhh", res.items);
    props.addsites(res)
  })
  .catch(err => {
    
    setData({ 
        ...data,
        error:err, 
        loading:false
       });
    console.log(err);
   
  });
}


return (
  <MaterialTopTabs.Navigator>
  <MaterialTopTabs.Screen
    name="Sites"
    component={sites}
    options={{ tabBarLabel: 'SITES' }}
  />
  <MaterialTopTabs.Screen
    name="Disconnected"
    component={disconnected}
    options={{ tabBarLabel: 'Disconnected' }}
  />
  <MaterialTopTabs.Screen
    name="Inactive"
    component={inactive}
    options={{ tabBarLabel: 'INACTIVE' }}
  />
</MaterialTopTabs.Navigator>   
  /*
  <Tab.Navigator>
    <Tab.Screen name="error" component={errorScreen} />
    <Tab.Screen name="warnings" component={warningScreen} />
    <Tab.Screen name="infos" component={infoScreen} />
  </Tab.Navigator>
 */
        /*<FlatList
          data={data.dataerrors}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={item.message }
              subtitle={item.timestamp}
              //avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={renderHeader}
          onRefresh={handleRefresh}
          refreshing={data.refreshing[0]}
        />
   */
     /* <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
      */
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
    delete: () => dispatch(Deletesites()),
    addsites: (datas) => dispatch(Addsites(datas))
   
}
}
export default connect(mapStateToProps,mapDispatchToProps)(SitesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
