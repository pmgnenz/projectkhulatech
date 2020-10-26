import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';


const errorScreen = (props,{navigation}) => {

  const [data, setData] = React.useState({
      Token: '9fb192dc-423b-45c9-b55b-94166b66c9f0',  //props.infos.userToken || 0,
      loading: false,
      datas: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      done: true
});


makeRemoteRequest = () => {
  //const { page, seed } = this.state; 
 // console.log("useeffectffffssssssssssssssssssssssssssssssssssssssss")
  setData({
    ...data,
    loading: true,
    done: false
  });
 
  fetch("https://khulatechsolutions.unmsapp.com/nms/api/v2.1/logs?count=20&page=1&level=error",{
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
        datas: res.items,
        error: res.error || null,
        loading: false,
        refreshing: false
      });       
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

handleRefresh = () => {
  setData(
    {
      //page: 1,
      //seed: this.state.seed + 1,
      ...data,
      refreshing: true
    }),
    () => {
      makeRemoteRequest();
    }
  
};

useEffect(() => {
  makeRemoteRequest();
}, []);


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
    <FlatList
    data={data.datas}
    renderItem={({ item }) => (
     // console.log("errorScreen", item),
       //avatar={{ uri: item.picture.thumbnail }}
      <ListItem>
          <ListItem.Content style={containerStyle={ borderBottomWidth: 0 }}>
        
        
        <ListItem.Title  > {item.message  }</ListItem.Title> 
        <ListItem.Subtitle > {item.timestamp} </ListItem.Subtitle>
      
        </ListItem.Content>
    </ListItem>
      
     
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={renderSeparator}
    //ListHeaderComponent={renderHeader}
    onRefresh= {handleRefresh}
    refreshing={data.refreshing}
  />
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
export default connect(mapStateToProps,mapDispatchToProps)(errorScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
