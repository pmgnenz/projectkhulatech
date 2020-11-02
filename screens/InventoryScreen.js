import AsyncStorage from '@react-native-community/async-storage';
import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator} from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import BackgroundTimer from 'react-native-background-timer';
import { changet,deleteInfo } from '../src/actions/infos';
import { connect } from 'react-redux';
const InventoryScreen = (props,{navigation}) => {
  const [data, setData] = React.useState({
    token: '' ,
    expiration: '',
    refreshtoken: '',
    inventory: [] ,
    error: null,
    refreshing: false,
    done: true,
    loaded: false,
    countloaded: false
});
  const settoken = async () => 
    {
      try {
        const tokens =  await AsyncStorage.getItem('splynxtoken')
        const exp = await AsyncStorage.getItem('expiration')
        const refresh =  await AsyncStorage.getItem('refresh_token');
        console.log("heeeeeerrrr", tokens)
        if (tokens !== null) {
            setData({
                ...data,
                token: tokens, 
                expiration: exp,
                refreshtoken: refresh,
                loaded: true  
            });

        }
      } catch (e) {
        alert('Failed to fetch the data from storage')
      }
    }
  
       
     // BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run
    var request = new XMLHttpRequest();

    request.open('GET', 'https://radius.khulatechsolutions.co.za/api/2.0/admin/inventory/products');
    console.log("heeeeeerrrr uuuu", data.token)
  
  
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        console.log('Status:', request.status);
        console.log('Headers:', request.getAllResponseHeaders());
        var obj = JSON.parse(request.responseText);  
        console.log(obj)
        if(request.status == 200)
        {
        setData({
          ...data,
          inventory: obj,
          countloaded: true
        
      });}

      }
    };
    
  stockcount = () => 
    {
      var request2 = new XMLHttpRequest();

      request2.open('GET', 'https://radius.khulatechsolutions.co.za/api/2.0/admin/inventory/items');
      console.log("heeeeeerrrr uuuu", data.token)
    
    
      request2.onreadystatechange = function () {
        if (request2.readyState === 4) {
          console.log('Status:', request2.status);
          console.log('Headers:', request2.getAllResponseHeaders());
          var obj = JSON.parse(request2.responseText);  
         // console.log(obj)
         tmp = []
         temp = []
         count =0;
        if(request2.status == 200){
          for(let i = 0; i < data.inventory.length; i++){
            for(let j = 0; j < obj.length; j++){
              temp= data.inventory[i]
            if(data.inventory[i].name ==  obj[j].name && obj[j].status == "stock")
            {

              count = count+1                  
            }
          }
          temp["count"] = count
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh  " , temp)
          tmp.push(temp)
          count = 0
        }
        setData({
          ...data,
          inventory: tmp
      });
    }
           console.log("dddddddddddddddd",data.inventory[0])
        }
      };
      request2.setRequestHeader('Authorization', 'Splynx-EA (access_token='+ data.token +')');
      request2.send()
    }
    
  useEffect(() => {
      settoken()
     
    }, [])
  useEffect(() => {
      stockcount()
     
     
    }, [data.countloaded])

  useEffect(() => {
      request.setRequestHeader('Authorization', 'Splynx-EA (access_token='+ data.token +')');
      request.send()
     
    }, [data.loaded])
    
  useEffect(() => {
      settoken()
      console.log("inventorrrrrrrrrrry")
      props.tokenchng(false)
      
    }, [props.infos])

  
  handleRefresh = () => {
    setData(
      {
        ...data,
        refreshing: true
      }),
      () => {
       // request.send()
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

    return (
      <FlatList
      data={data.inventory}
      renderItem={({ item }) => (
       // console.log("errorScreen", item),
         //avatar={{ uri: item.picture.thumbnail }}
        <ListItem>
            <ListItem.Content style={{borderBottomWidth: 0} }>
          
          <ListItem.Title  > {item.name  }</ListItem.Title> 
          <ListItem.Subtitle > {item.count} </ListItem.Subtitle>
        
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
    infos: state.appReducer.changedtoken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   tokenchng: (changestate) => dispatch(changet(changestate)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
