import AsyncStorage from '@react-native-community/async-storage';
import React,{ useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, ActivityIndicator} from 'react-native';
import { ListItem, Icon,List, SearchBar } from 'react-native-elements'
import BackgroundTimer from 'react-native-background-timer';
import { connect } from 'react-redux';
import { changet,deleteInfo } from '../src/actions/infos';
const TicketScreen = (props,{navigation}) => {
  const [data, setData] = React.useState({
    token: '' ,
    expiration: '',
    refreshtoken: '',
    tickets: [] ,
    error: null,
    refreshing: false,
    done: true,
    loaded: false
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
    useEffect(() => {
      settoken()
    }, [])
 
  
    var request = new XMLHttpRequest();

    request.open('GET', 'https://radius.khulatechsolutions.co.za/api/2.0/admin/support/tickets');
    console.log("heeeeeerrrr uuuu", data.token)
  
  
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        console.log('Status:', request.status);
        console.log('Headers:', request.getAllResponseHeaders());
        var obj = JSON.parse(request.responseText);
        var count = 0;
        var tmp = []
        for(let i = 0; i < obj.length; i++){

          if(obj[i].assign_to == 6)
          {
            tmp.push(obj[i])
          }
        }

        setData({
          ...data,
          tickets: tmp
      });

      }
    };
    useEffect(() => {
      request.setRequestHeader('Authorization', 'Splynx-EA (access_token='+ data.token +')');
      request.send()
    }, [data.loaded])
    
    Refreshtoken = () => {
      var request2 = new XMLHttpRequest();

      request2.open('GET', 'https://radius.khulatechsolutions.co.za/api/2.0/admin/auth/tokens/'+ data.refreshtoken);
      
      request2.onreadystatechange = async () => {
        if (this.readyState === 4) {
          console.log('Status:', request2.status);
          console.log('Headers:', request2.getAllResponseHeaders());
          console.log('Body:', request2.responseText);
          var obj = JSON.parse(request2.responseText);
          //console.log('Body   hhhh:', obj["access_token"]);
          if(request.status ==200)
          {
              try {
                
                await AsyncStorage.setItem('splynxtoken', obj["access_token"]);
                await AsyncStorage.setItem('refresh_token', obj["refresh_token"]);
                await AsyncStorage.setItem('expiration', obj["access_token_expiration"]);
                settoken()
                props.tokenchng(true)
                  
                } catch(e) {
                  console.log(e);
                }  
                
          }
        }
        //request2.setRequestHeader('Authorization', 'Splynx-EA (access_token='+ data.refreshtoken +')');
        request2.send();
      };
      
     
    }
    BackgroundTimer.runBackgroundTimer(() => { 
      refresh_token()
      console.log("hhhhhhhhhhhhhhhhhhhhh")
      }, 
      300000);
     
      
     // BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run
  
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
      data={data.tickets}
      renderItem={({ item }) => (
       // console.log("errorScreen", item),
         //avatar={{ uri: item.picture.thumbnail }}
        <ListItem>
            <ListItem.Content style={{borderBottomWidth: 0} }>
          
          <ListItem.Title  > {item.subject  }</ListItem.Title> 
          <ListItem.Subtitle > {item.created_at} </ListItem.Subtitle>
        
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
  /*  add: (id1,email1,username1,firstname1,secondname1,
      password1, userToken1,userToken1id) => dispatch(addInfo(id1,email1,username1,firstname1,secondname1,
          password1, userToken1,userToken1id))
  */

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
