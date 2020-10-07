import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const DetailsScreen = (props,{navigation}) => {

  const [data, setData] = React.useState({
    Token: '9fb192dc-423b-45c9-b55b-94166b66c9f0',//props.infos.userToken || 0,
    loading: [false,false,false],
      dataerrors: [],
      datawarnings: [],
      datainfos: [],
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
  
  done= false;
  setData({
    ...data,
    loading: [true,true,true]
  });
  var categories = ["error","warning","info"];
  for(let i = 0; i < 3; i++){
  fetch(`https://khulatechsolutions.unmsapp.com/nms/api/v2.1/logs?count=40&page=1&level=${categories[i]}`,{
    method:'GET',
    headers:{
        accept:'application/json',
        'Content-Type': 'application/json',
         'x-auth-token': data.Token
    }})
    .then(res => res.json())
    .then(res => {
     // console.log("res  hhhh", res.items);
     if(categories[i] == "error")
     {
      setData({
        ...data,
        dataerrors: res.items,
        error: [res.error || null,error[1],error[2]],
        loading: [false,data.loading[1],data.loading[2]],
        refreshing: [false,data.refreshing[1],data.refreshing[2]]
      });}
      if(categories[i] == "warning")
     {
      setData({
        ...data,
        datawarnings: res.items,
        error:[error[0],res.error || null,error[2]] ,
        loading: [data.loading[0],false,data.loading[2]],
        refreshing:[data.refreshing[0], false,data.refreshing[2]]
      });}
      if(categories[i] == "info")
     {
      setData({
        ...data,
        datainfos: res.items,
        error: [error[0],error[1],res.error || null],
        loading: [data.loading[0],data.loading[1],false],
        refreshing:[data.refreshing[0],data.refreshing[1],false]
      });}
      
    })
    .catch(err => {
      if(i = 0)
      {
      setData({ ...data,error:[err,error[1],error[2]], loading:[false,loading[1],loading[2]] });
      console.log(error);
      }
      if(i = 1)
      {
      setData({ ...data,error:[error[0],err,error[2]], loading:[loading[0],false,loading[2]] });
      console.log(error);
      }
      if(i = 2)
      {
      setData({ ...data,error:[,error[0],error[1],err], loading:[loading[0],loading[1],false] });
      console.log(error);
      }
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
function errorScreen() {
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
          onRefresh={handleRefresh}
          refreshing={data.refreshing[0]}
        />
   
  );
}

function warningScreen() {
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
          refreshing={data.refreshing[0]}
        />
   
  );
}
function infoScreen() {
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
          refreshing={data.refreshing[0]}
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
  return <SearchBar placeholder="Type Here..." lightTheme round />;
};
//componentDidMount();
//console.log("ggggggggggggggggg", data.dataerrors);
return (
        
  <NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="error" component={errorScreen} />
    <Tab.Screen name="warnings" component={warningScreen} />
    <Tab.Screen name="infos" component={infoScreen} />
  </Tab.Navigator>
</NavigationContainer>
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
