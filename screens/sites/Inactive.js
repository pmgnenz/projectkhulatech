import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { Addsites } from '../../src/actions/infos';
import {Avatar} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
const Inactive = (props,{navigation}) => {

  const [data, setData] = React.useState({
      Token: '9fb192dc-423b-45c9-b55b-94166b66c9f0',  //props.infos.userToken || 0,
      loading: false,
      datas: props.allsites.filter( item => {
        return "inactive" == item.identification.status;}),
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      done: true,
      spinners: true
});


useEffect(() => {
    setsitedata();
    }, []);
setsitedata = () => 
{
    const foundsites = props.allsites.filter( item => {
        return "site" == item.identification.type;
} );
    setData({
        ...data,
        datas: foundsites,
        spinners: false
    })
}

makeRemoteRequest = () => {
  //const { page, seed } = this.state; 
 // console.log("useeffectffffssssssssssssssssssssssssssssssssssssssss")
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
     // console.log("res  hhhh", res.items);
     props.addsites(res)
      setData({
        ...data,
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

return (
  
    <FlatList
    data={data.datas}
    renderItem={({ item }) => (
     // console.log("errorScreen", item),
       //avatar={{ uri: item.picture.thumbnail }}
    <ListItem>
      <Avatar.Image size={24}
                
                source= {item.identification.type == "site" ? 
                 require('../../assets/greysite.png') 
              : 
                require('../../assets/greyhouse.png')
             
            } 
/>
        <ListItem.Content style={containerStyle={ borderBottomWidth: 0 }}>       
            <ListItem.Title  > {item.identification.name  }</ListItem.Title> 
            <ListItem.Subtitle > {item.description.address} </ListItem.Subtitle> 
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
        allsites: state.siteReducer.siteList
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      delete: () => dispatch(deleteInfo()),
      addsites: (datas) => dispatch(Addsites(datas))
     
  }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Inactive);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
