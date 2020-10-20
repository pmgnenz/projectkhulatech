import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
const DetailsScreen = (props,{navigation}) => {

  const [data, setData] = React.useState({
      Token: '9fb192dc-423b-45c9-b55b-94166b66c9f0',  //props.infos.userToken || 0,
      loading: [false,false,false],
      sites: [],
      disconnected: [],
      inactive: [],
      page: 1,
      seed: 1,
      error: [null,null,null],
      refreshing: [false,false,false],
      done: true,
});

useEffect(() => {
  makeRemoteRequest();
}, []);

makeRemoteRequest = () => {
  //const { page, seed } = this.state;
  
  
  setData({
    ...data,
    loading: [true,true,true],
    done: false
  });
  var categories = ["sites","warning","info"];
  for(let i = 0; i < 3; i++){
  fetch("https://khulatechsolutions.unmsapp.com/nms/api/v2.1/sites",{
    method:'GET',
    headers:{
        accept:'application/json',
        'Content-Type': 'application/json',
         'x-auth-token': data.Token
    }})
    .then(res => res.json())
    .then(res => {
     // console.log("res  hhhh", res.items);
    
      setData({
        ...data,
        sites: res.items,
        error: [res.error || null,res.error || null,res.error || null],
        loading: [false,false,false],
        refreshing: [false,false,false]
      });
    })
    .catch(err => {
      
      setData({ ...data,error:[err,err,err], loading:[false,false,false] });
      console.log(error);
     
    });
  }
};
handleRefresh = () => {
  setData(
    {
      //page: 1,
      //seed: this.state.seed + 1,
      ...data,
      refreshing: [true,true,true]
    }),
    () => {
      makeRemoteRequest();
    }
  
};
function sitescreen() {
  return (
    <FlatList
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
          onRefresh= {handleRefresh}
          refreshing={data.refreshing[0]}
        />
   
  );
}

function disconnectedScreen() {
  return (
    <FlatList
          data={data.datawarnings}
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
          refreshing={data.refreshing[1]}
        />
   
  );
}
function inactiveScreen() {
  return (
    <FlatList
          data={data.datainfos}
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
          refreshing={data.refreshing[2]}
        />
   
  );
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );
};

renderHeader = () => {
  return <SearchBar placeholder="Network" lightTheme round />;
};
//componentDidMount();
//console.log("ggggggggggggggggg", data.dataerrors);
return (
        
  
  <Tab.Navigator>
    <Tab.Screen name="sites" component={sitescreen} />
    <Tab.Screen name="disconnected" component={disconnectedScreen} />
    <Tab.Screen name="inactive" component={inactiveScreen} />
  </Tab.Navigator>
 
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

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
